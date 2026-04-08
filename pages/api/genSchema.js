import fs from 'fs';
import path from 'path';
import { loadTemplateIndex, loadTemplatesByCategory, loadTemplateContents, buildPageTemplatesText, findBestMatchingTemplate, loadComponentDefinitions } from '../../scripts/loader.js';

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
  
  // 将Markdown 内容转换为纯文本提示
  let promptText = promptLines.join('\n');
  
  // 移除 Markdown 标题符号，但保留标题文字
  promptText = promptText.replace(/^#+\s+/gm, '');
  
  // 清理多余的空白行
  promptText = promptText.replace(/\n{3,}/g, '\n\n').trim();
  
  return promptText;
}

// 从Markdown 文件中提取temperature 值
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
  // 调试：记录API 密钥是否存在（不记录实际值以保护安全）
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
      systemPrompt: `你是一个低代码页面 Schema 生成助手。要求：根据用户对话需求输出严格的 AMIS schema JSON。\n\n规则：\n1) 只返回JSON，不要返回任何额外文字、Markdown 或解释。\n2) 如果入参包含 base schema（schema 字段），请在其基础上进行"更新/增补"，最终仍输出完整的 AMIS schema 对象。\n3) JSON 必须可以被 JSON.parse 解析。\n4) 你输出的对象必须是 AMIS schema（例如 type: "page" 等）。`,
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

  // 读取组件配置信息与页面模板
  let componentHint = "";
  let pageTemplates = "";
  let pageTemplateContents = {};
  let templateIndex = [];
  let matchedTemplateInfo = null;

  try {
    templateIndex = loadTemplateIndex(process.cwd());
    pageTemplateContents = loadTemplateContents(templateIndex, process.cwd());
    pageTemplates = buildPageTemplatesText(templateIndex, pageTemplateContents);

    const components = loadComponentDefinitions(process.cwd());

    // 尝试匹配最佳模板，支持分类加载
    let templatesToMatch = templateIndex;
    const normalizedUserText = userText.toLowerCase();

    // 检测用户文本中的类别关键词
    const categoryKeywords = {
      'form': ['表单', 'form', '输入', '新建', '编辑'],
      'list': ['列表', '数据', '表格', 'table', 'list'],
      'dashboard': ['仪表盘', 'dashboard', '概览', '统计', '图表']，
      'detail': ['详情', 'detail', '查看', '展示', '信息']
    };

    let detectedCategory;
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => normalizedUserText.includes(keyword))) {
        detectedCategory = category;
        break;
      }
    }

    // 如果检测到类别，使用分类加载
    if (detectedCategory) {
      templatesToMatch = loadTemplatesByCategory(detectedCategory, process.cwd());
    }

    matchedTemplateInfo = findBestMatchingTemplate(userText, templatesToMatch, pageTemplateContents, detectedCategory);

    let filteredComponents = components;
    if (matchedTemplateInfo && matchedTemplateInfo.templateId) {
      const matchedTemplate = templateIndex.find(t => t.id === matchedTemplateInfo.templateId);
      if (matchedTemplate && Array.isArray(matchedTemplate.components) && matchedTemplate.components.length > 0) {
        filteredComponents = components.filter(c => matchedTemplate.components.includes(c.id));
      }
    }

    if (filteredComponents.length > 0) {
      const componentDescriptions = filteredComponents.map(c => {
        const propList = c.props ? Object.entries(c.props).map(([propKey, propDef]) =>
          `${propKey} (${propDef.type}${propDef.required ? ', 必填' : ''}): ${propDef.label || ''}`
        ).join('; ') : '';
        return `- ${c.id} (${c.name} v${c.version}): ${c.category} 类别组件${propList ? `\n  可配置属性 ${propList}` : ''}`;
      }).join('\n');

      componentHint = `【重要】可用组件清单（必须严格使用以下组件ID）：\n${componentDescriptions}\n\n`;
    }
  } catch (error) {
    console.warn('无法读取组件配置或页面模板:', error.message);
  }

  // 读取组件规则文件（规范部分）
  let componentRules = "";
  try {
    const componentRulesPath = path.join(process.cwd(), 'config', 'rules', 'component-rules.md');
    const componentRulesData = fs.readFileSync(componentRulesPath, 'utf8');
    
    // 提取组件规则内容（移除温度设置行）
    const rulesLines = componentRulesData.split('\n');
    const rulesContent = [];
    for (const line of rulesLines) {
      if (!line.trim().startsWith('temperature:')) {
        rulesContent.push(line);
      }
    }
    
    componentRules = `【组件配置规范】
${rulesContent.join('\n')}

`;
  } catch (error) {
    console.warn('无法读取组件规则文件:', error.message);
    // 如果读取失败，继续执行但不包含组件规则
  }

  // 读取结构规则文件
  let structureRules = "";
  let structureRulesWithoutExample = ""; // 新增：不含示例的结构规则
  try {
    const structureRulesPath = path.join(process.cwd(), 'config', 'rules', 'schema-structure.md');
    const structureRulesData = fs.readFileSync(structureRulesPath, 'utf8');
    
    // 提取结构规则内容（移除温度设置行）
    const rulesLines = structureRulesData.split('\n');
    const rulesContent = [];
    const rulesContentWithoutExample = [];
    let inExampleBlock = false;
    
    for (const line of rulesLines) {
      if (!line.trim().startsWith('temperature:')) {
        rulesContent.push(line);
      }
      
      // 处理不含示例的版本
      if (line.trim().startsWith('``json')) {
        inExampleBlock = true;
        continue;
      }
      if (inExampleBlock && line.trim().startsWith('```')) {
        inExampleBlock = false;
        continue;
      }
      if (!inExampleBlock && !line.trim().startsWith('temperature:')) {
        rulesContentWithoutExample.push(line);
      }
    }
    
    structureRules = `【Schema结构规则】
${rulesContent.join('\n')}

`;
    structureRulesWithoutExample = `【Schema结构规则】
${rulesContentWithoutExample.join('\n')}

`;
  } catch (error) {
    console.warn('无法读取结构规则文件:', error.message);
    // 如果读取失败，继续执行但不包含结构规则
  }

  // 页面模板已由 loader 加载到 pageTemplates、pageTemplateContents 和 templateIndex 中

  // 构建完整的prompt，包含结构规则、组件规则、模板库和组件信息
  const fullPrompt = `${systemPrompt}\n\n${structureRules}${componentRules}${pageTemplates}${componentHint}${baseSchemaText ? `当前已有 Schema（用于参考更新）：\n${baseSchemaText}\n\n` : ''}用户对话需求如下：\n${userText}\n\n【通用事件配置约束】\n- 所有组件的events配置必须包含完整的 "id"（函数名称）、"name"（中文描述）字段\n- 严禁省略或修改这些字段，它们是系统正常运行的必需字段\n- 函数名称必须符合命名规范（如handleSubmit, handleReset等）\n\n请输出更新后的完整 JSON Schema。`;

  // 调试：输出拼装的完整prompt内容（仅在开发环境）
  if (process.env.NODE_ENV !== 'production') {
    console.log('=== 拼装的完整 System Prompt ===');
    console.log(fullPrompt);
    console.log('=== End of System Prompt ===');
  }

  // 读取完模板和组件后，matchedTemplateInfo 已由 loader 进行预匹配
  
  // 如果检测到匹配的模板，则在提示中加入模板内容，并使用不含示例的结构规则
  let finalPrompt = fullPrompt;
  if (matchedTemplateInfo) {
    console.log('检测到匹配的模板', matchedTemplateInfo.templateId, '匹配分数:', matchedTemplateInfo.score);
    finalPrompt = `${systemPrompt}\n\n${structureRulesWithoutExample}${componentRules}${pageTemplates}${componentHint}${baseSchemaText ? `当前已有 Schema（用于参考更新）：\n${baseSchemaText}\n\n` : ''}用户对话需求如下：\n${userText}\n\n由于用户请求 "${matchedTemplateInfo.templateId}"模板高度匹配（匹配分数 ${matchedTemplateInfo.score}），请直接使用该模板内容作为基础进行构建，具体模板内容如下：\n\n${matchedTemplateInfo.content}\n\n【重要约束指令】\n1. 必须严格保留模板中的所有事件配置，包括events对象中的每个事件处理函数的 "id"、"name"字段\n2. 禁止修改、删除或重新生成事件的id和name字段，必须原样保留模板中的配置\n3. 只允许根据用户需求调整组件的props属性值、页面标题等业务相关字段\n4. 事件函数的实现代码必须在actions.module.source中对应生成，函数名必须与事件id完全一致\n5. 请严格仅使用提供的专用模板，忽略其他示例，输出更新后的完整 JSON Schema。\n`;
  } else {
    console.log('未找到匹配的模板，使用通用生成逻辑');
  }

  try {
    const result = await callDashScopeAPI(finalPrompt, apiKey, model, temperature);

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
        error: "模型返回的内容不是有效的JSON（无法解析）",
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
      // 一些实现会把原始原因塞入 cause
      cause: e?.cause ? String(e.cause) : undefined,
    });
  }
}

