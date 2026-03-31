async function callDashScopeAPI(prompt, apiKey, model = "qwen-plus") {
  const baseURL = process.env.OPENAI_BASE_URL || "https://dashscope.aliyuncs.com/compatible-mode/v1";
  const response = await fetch(`${baseURL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2
    })
  });

  if (!response.ok) {
    // 调试：记录响应状态和错误信息
    console.log('API request failed with status:', response.status);
    const errorText = await response.text();
    console.log('Error response:', errorText);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

function tryParseJson(text) {
  if (typeof text !== "string") return null;
  const raw = text.trim();
  if (!raw) return null;

  // 兼容 ```json ... ``` 包裹
  const codeBlock = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = codeBlock ? codeBlock[1].trim() : raw;

  try {
    return JSON.parse(candidate);
  } catch (e) {
    // 兜底：尽量从第一个 { 或 [ 截取到最后一个 } 或 ]
    const idxObj = candidate.indexOf("{");
    const idxArr = candidate.indexOf("[");
    const start =
      idxObj === -1 ? idxArr : idxArr === -1 ? idxObj : Math.min(idxObj, idxArr);
    const endObj = candidate.lastIndexOf("}");
    const endArr = candidate.lastIndexOf("]");
    const end = endObj === -1 ? endArr : endArr === -1 ? endObj : Math.max(endObj, endArr);
    if (start === -1 || end === -1 || end <= start) return null;

    const sliced = candidate.slice(start, end + 1);
    try {
      return JSON.parse(sliced);
    } catch (e2) {
      return null;
    }
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = process.env.DASHSCOPE_API_KEY;
  // 调试：记录 API 密钥是否存在（不记录实际值以保护安全）
  console.log('DASHSCOPE_API_KEY loaded:', !!apiKey);
  
  if (!apiKey) {
    return res.status(500).json({ error: "缺少环境变量 `DASHSCOPE_API_KEY`" });
  }

  const body = req.body || {};

  // 向后兼容：旧版请求只传 prompt
  const { prompt, messages, schema } = body;
  const userMessages = Array.isArray(messages)
    ? messages
    : prompt
      ? [{ role: "user", content: prompt }]
      : [];

  const systemPrompt = `
你是一个低代码页面 Schema 生成助手。要求：根据用户对话需求输出严格的 AMIS schema JSON。

规则：
1) 只返回 JSON，不要返回任何额外文字、Markdown 或解释。
2) 如果入参包含 base schema（schema 字段），请在其基础上进行"更新/增补"，最终仍输出完整的 AMIS schema 对象。
3) JSON 必须可以被 JSON.parse 解析。
4) 你输出的对象必须是 AMIS schema（例如 type: "page" 等）。
`.trim();

  const userText = userMessages.map(m => String(m?.content ?? "")).filter(Boolean).join("\n\n");
  const baseSchemaText = schema ? JSON.stringify(schema) : null;

  const fullPrompt = `${systemPrompt}\n\n${baseSchemaText ? `当前已有的 AMIS schema（用于参考/更新）：\n${baseSchemaText}\n\n` : ''}用户对话需求如下（按时间顺序）：\n${userText}\n\n请输出"更新后的完整 AMIS schema JSON"。`;

  try {
    const model = process.env.MODEL_NAME || "qwen-plus";
    const result = await callDashScopeAPI(fullPrompt, apiKey, model);

    // OpenAI 兼容接口标准响应格式：{ choices: [{ message: { content: string, role?: string } }], usage?: {...} }
    // 增强防御性检查，确保数据结构完整
    const hasValidChoices = Array.isArray(result?.choices) && result.choices.length > 0;
    const hasValidMessage = hasValidChoices && result.choices[0]?.message;
    
    const out = hasValidMessage 
      ? (result.choices[0].message.content ?? '') 
      : '';
    
    if (!out || typeof out !== 'string') {
      return res.status(200).json({
        schema: null,
        error: "模型返回内容为空或格式不正确",
        raw: out,
        debug: {
          hasChoices: hasValidChoices,
          hasMessage: hasValidMessage,
          resultKeys: result ? Object.keys(result) : []
        }
      });
    }
    
    const parsed = tryParseJson(out);

    if (!parsed) {
      return res.status(200).json({
        schema: null,
        error: "模型返回的内容不是有效 JSON（无法解析）",
        raw: out,
      });
    }

    return res.status(200).json({ 
      schema: parsed,
      usage: result.usage || undefined
    });
  } catch (e) {
    // 尽量返回可用于定位的问题字段；不要泄露密钥
    console.error("DashScope API 请求异常:", e);
    return res.status(500).json({
      error: e?.message || "DashScope API 请求失败",
      name: e?.name,
      code: e?.code,
      status: e?.status ?? e?.response?.status,
      // 一些实现会把原始原因塞进 cause
      cause: e?.cause ? String(e.cause) : undefined,
    });
  }
}

