import fs from 'fs';
import path from 'path';

// 解析 Markdown 文件中的 systemPrompt（提取除温度设置外的所有内容）
function extractSystemPromptFromMarkdown(markdownContent) {
  // 移除温度设置行和空行
  const lines = markdownContent.split('\n');
  const promptLines = [];
  
  for (const line of lines) {
    // 跳过温度设置行和空行（可选）
    if (line.trim().startsWith('temperature:') || line.trim() === '') {
      continue;
    }
    promptLines.push(line);
  }
  
  // 将 Markdown 内容转换为纯文本提示
  let promptText = promptLines.join('\n');
  
  // 移除 Markdown 标题符号，但保留标题文字
  promptText = promptText.replace(/^#+\s+/gm, '');
  
  // 清理多余的空白行
  promptText = promptText.replace(/\n{3,}/g, '\n\n').trim();
  
  return promptText;
}

// 从 Markdown 文件中提取 temperature 值
function extractTemperatureFromMarkdown(markdownContent) {
  const temperatureMatch = markdownContent.match(/temperature:\s*([0-9.]+)/i);
  if (temperatureMatch) {
    return parseFloat(temperatureMatch[1]);
  }
  return 0.2; // 默认值
}

async function callDashScopeAPI(prompt, apiKey, model = "qwen-plus", temperature = 0.2) {
  const baseURL = process.env.OPENAI_BASE_URL || "https://dashscope.aliyuncs.com/compatible-mode/v1";
  const response = await fetch(`${baseURL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "``",
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
      temperature: temperature
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

  // 从请求体中获取必要的参数
  const { prompt, messages, schema, mode = "default" } = req.body;

  // 参数验证
  if (!prompt && (!Array.isArray(messages) || messages.length === 0)) {
    return res.status(400).json({ 
      error: "必须提供 prompt 字符串或非空的 messages 数组" 
    });
  }

  // 优先尝试读取 Markdown 格式的系统指令文件
  const markdownPromptPath = path.join(process.cwd(), 'config', 'system-prompts', `${mode}.md`);
  const markdownPromptData = fs.readFileSync(markdownPromptPath, 'utf8');
  
  // 解析 Markdown 文件中的 systemPrompt 和 temperature
  const systemPromptConfig = {
    systemPrompt:extractSystemPromptFromMarkdown(markdownPromptData),
    temperature:extractTemperatureFromMarkdown(markdownPromptData)
  };
  

  // 获取选定的 prompt 模式（优先：system-prompts 文件 > 内置默认）
  const selectedPrompt = systemPromptConfig
    || {
      systemPrompt: `你是一个低代码页面 Schema 生成助手。要求：根据用户对话需求输出严格的 AMIS schema JSON。\n\n规则：\n1) 只返回 JSON，不要返回任何额外文字、Markdown 或解释。\n2) 如果入参包含 base schema（schema 字段），请在其基础上进行"更新/增补"，最终仍输出完整的 AMIS schema 对象。\n3) JSON 必须可以被 JSON.parse 解析。\n4) 你输出的对象必须是 AMIS schema（例如 type: "page" 等）。`,
      temperature: 0.2
    };

  const systemPrompt = selectedPrompt.systemPrompt;
  const model = "qwen-plus"; // 固定使用 qwen-plus 模型
  const temperature = selectedPrompt.temperature !== undefined ? selectedPrompt.temperature : 0.2;

  // 构建用户输入文本
  let userText = "";
  if (prompt) {
    userText = prompt;
  } else if (Array.isArray(messages)) {
    userText = messages.map(m => String(m?.content ?? "")).filter(Boolean).join("\n\n");
  }

  const baseSchemaText = schema ? JSON.stringify(schema) : null;

  // 读取组件配置信息
  let componentHint = "";
  try {
    // 直接读取 Markdown 格式的组件配置文件
    const componentConfigPath = path.join(process.cwd(), 'config', 'components', 'index.md');
    const componentConfigData = fs.readFileSync(componentConfigPath, 'utf8');
    
    // 处理 Markdown 格式的组件配置
    // 从 Markdown 中提取组件信息
    const lines = componentConfigData.split('\n');
    const components = [];
    let currentComponent = null;
    let inComponentsSection = false;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // 检测是否进入内置组件列表部分
      if (trimmedLine === '## 内置组件列表') {
        inComponentsSection = true;
        continue;
      }
      
      // 跳过非组件列表部分
      if (!inComponentsSection) continue;
      
      // 检测组件标题行（以####开头）
      if (trimmedLine.startsWith('#### ')) {
        if (currentComponent) {
          components.push(currentComponent);
        }
        const componentNameMatch = trimmedLine.match(/#### (.+) \((.+)\)/);
        if (componentNameMatch) {
          currentComponent = {
            name: componentNameMatch[1],
            id: componentNameMatch[2],
            category: '',
            props: {},
            events: []
          };
        }
        continue;
      }
      
      // 提取分类信息
      if (currentComponent && trimmedLine.startsWith('- **分类**: ')) {
        currentComponent.category = trimmedLine.replace('- **分类**: ', '').trim();
        continue;
      }
      
      // 提取属性信息
      if (currentComponent && trimmedLine.startsWith('- **属性**:') && line.includes(':')) {
        // 属性信息在后续行中
        continue;
      }
      
      // 处理属性行（以- `开头）
      if (currentComponent && trimmedLine.startsWith('- `') && trimmedLine.includes(':')) {
        const propMatch = trimmedLine.match(/- `([^`]+)`: (.+) \(([^,)]+), 默认值: ([^)]+)\)/);
        if (propMatch) {
          const propName = propMatch[1];
          const propLabel = propMatch[2];
          const propType = propMatch[3].trim();
          const propDefault = propMatch[4];
          
          // 转换类型字符串为标准类型
          let standardType = 'string';
          if (propType.includes('boolean')) standardType = 'boolean';
          else if (propType.includes('array')) standardType = 'array';
          else if (propType.includes('number')) standardType = 'number';
          
          currentComponent.props[propName] = {
            type: standardType,
            label: propLabel,
            default: propDefault === 'false' ? false : 
                    propDefault === 'true' ? true : 
                    propDefault === '""' ? '' : propDefault
          };
        } else {
          // 简单属性匹配
          const simplePropMatch = trimmedLine.match(/- `([^`]+)`: (.+)/);
          if (simplePropMatch) {
            const propName = simplePropMatch[1];
            const propDesc = simplePropMatch[2];
            currentComponent.props[propName] = {
              type: 'string',
              label: propDesc,
              default: ''
            };
          }
        }
        continue;
      }
      
      // 处理事件行
      if (currentComponent && trimmedLine.startsWith('- **事件**:') && !trimmedLine.includes('无')) {
        // 事件信息在后续行中
        continue;
      }
      
      // 处理事件详情行（以- `开头）
      if (currentComponent && trimmedLine.startsWith('- `') && trimmedLine.includes('`:') && !trimmedLine.includes('默认值')) {
        const eventMatch = trimmedLine.match(/- `([^`]+)`: (.+)/);
        if (eventMatch) {
          currentComponent.events.push({
            name: eventMatch[1],
            description: eventMatch[2]
          });
        }
      }
    }
    
    // 添加最后一个组件
    if (currentComponent) {
      components.push(currentComponent);
    }
    
    if (components.length > 0) {
      // 创建详细的组件使用说明
      const componentDescriptions = components.map(c => {
        const propList = c.props ? Object.entries(c.props).map(([propKey, propDef]) => 
          `${propKey} (${propDef.type}${propDef.required ? ', 必填' : ''}): ${propDef.label || ''}`
        ).join('; ') : '';
        return `- ${c.id} (${c.name}): ${c.category} 类别组件${propList ? `\n  可配置属性: ${propList}` : ''}`;
      }).join('\n');
      
      componentHint = `【重要】可用组件清单（必须严格使用以下组件ID）：
${componentDescriptions}

组件使用规则：
1. 在AMIS schema中，组件的"type"字段必须使用上述组件ID（如 "fh_input-text", "fh_select" 等）
2. 组件的属性必须来自上述列出的可配置属性
3. 不要使用未在清单中列出的组件或属性
4. 所有生成的schema必须基于以上组件定义

`;
    }
  } catch (error) {
    console.warn('无法读取组件配置文件:', error.message);
    // 如果读取失败，继续执行但不包含组件信息
  }

  // 构建完整的prompt，包含组件信息
  const fullPrompt = `${systemPrompt}\n\n${componentHint}${baseSchemaText ? `当前已有的 AMIS schema（用于参考/更新）：\n${baseSchemaText}\n\n` : ''}用户对话需求如下：\n${userText}\n\n请输出"更新后的完整 AMIS schema JSON"。`;

  // 调试：输出拼装的完整prompt内容（仅在开发环境）
  if (process.env.NODE_ENV !== 'production') {
    console.log('=== 拼装的完整 System Prompt ===');
    console.log(fullPrompt);
    console.log('=== End of System Prompt ===');
  }

  try {
    const result = await callDashScopeAPI(fullPrompt, apiKey, model, temperature);

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

