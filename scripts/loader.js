import fs from 'fs';
import path from 'path';

export function loadTemplateIndex(baseDir = process.cwd()) {
  const templateIndexPath = path.join(baseDir, 'config', 'templates', 'template-index.json');
  if (!fs.existsSync(templateIndexPath)) {
    return [];
  }

  const content = fs.readFileSync(templateIndexPath, 'utf8');
  try {
    const parsed = JSON.parse(content);
    return Array.isArray(parsed.templates) ? parsed.templates : [];
  } catch (error) {
    throw new Error(`无法解析 template-index.json: ${error?.message || error}`);
  }
}

export function loadTemplatesByCategory(category, baseDir = process.cwd()) {
  const allTemplates = loadTemplateIndex(baseDir);
  return allTemplates.filter(template => template.category === category);
}

export function loadTemplateContents(templates, baseDir = process.cwd()) {
  const contents = {};
  for (const template of templates) {
    const templatePath = path.join(baseDir, 'config', 'templates', `${template.id}.md`);
    if (fs.existsSync(templatePath)) {
      contents[template.id] = fs.readFileSync(templatePath, 'utf8');
    }
  }
  return contents;
}

export function buildPageTemplatesText(templates) {
  if (!templates || templates.length === 0) {
    return '';
  }

  const descriptions = templates.map(template => `- ${template.id}: ${template.name} (${template.description})`);
  return `【页面模板库】\n可用页面模板：\n${descriptions.join('\n')}\n\n注意：当用户明确要求使用特定模板或提到模板相关功能时，应使用对应的预定义事件处理函数。\n特别地，如果用户请求"列表"、"数据列表"、"表格页面"、"数据展示页面"等相关内容时，应优先考虑使用 data-list 模板。\n其他模板也类似：表单页面使用 basic-form 模板，详情页面使用 detail 模板，仪表盘页面使用 dashboard 模板。\n\n`;
}

export function normalizeText(text) {
  return String(text || '').toLowerCase();
}

export function findBestMatchingTemplate(userText, templates, templateContents, category) {
  const normalizedText = normalizeText(userText);
  if (!normalizedText || !templates || templates.length === 0) {
    return null;
  }

  // 如果指定了类别，则只在该类别的模板中匹配
  const filteredTemplates = category ? templates.filter(template => template.category === category) : templates;

  if (filteredTemplates.length === 0) {
    return null;
  }

  let bestMatch = null;
  let bestScore = 0;

  for (const template of filteredTemplates) {
    let score = 0;
    const nameLower = normalizeText(template.name);
    const descriptionLower = normalizeText(template.description);

    if (normalizedText.includes(template.id)) {
      score += 10;
    }
    if (nameLower && normalizedText.includes(nameLower)) {
      score += 10;
    }
    if (descriptionLower && normalizedText.includes(descriptionLower)) {
      score += 5;
    }
    if (template.category && normalizedText.includes(normalizeText(template.category))) {
      score += 8;
    }
    if (template.tags) {
      for (const tag of template.tags) {
        if (tag && normalizedText.includes(normalizeText(tag))) {
          score += 3;
        }
      }
    }

    const keywordGroups = {
      'data-list': ['列表', '数据', '表格', 'table', 'list', '数据列表', '数据展示', '搜索列表', '数据检查', '记录', '行数'],
      'basic-form': ['表单', 'form', '输入', '新建', '创建', '编辑', '注册', '登录', '填写', '字段'],
      detail: ['详情', 'detail', '查看', '展示', '信息', 'profile', '详情页', '详细信息'],
      dashboard: ['仪表盘', 'dashboard', '概览', '统计', '图表', 'kpi', '指标', '监控', '总览']
    };

    const groupKeywords = keywordGroups[template.id] || [];
    for (const keyword of groupKeywords) {
      if (keyword && normalizedText.includes(keyword)) {
        score += 7;
        break;
      }
    }

    if (score > bestScore && score >= 5) {
      bestScore = score;
      bestMatch = template.id;
    }
  }

  if (!bestMatch) {
    return null;
  }

  return {
    templateId: bestMatch,
    content: templateContents[bestMatch] || '',
    score: bestScore
  };
}

export function loadComponentDefinitions(baseDir = process.cwd()) {
  const componentDir = path.join(baseDir, 'config', 'components');
  if (!fs.existsSync(componentDir)) {
    return [];
  }

  const componentFiles = fs.readdirSync(componentDir).filter(file => file.endsWith('.md'));
  const components = [];
  for (const file of componentFiles) {
    const filePath = path.join(componentDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    components.push(...parseComponentMarkdown(content));
  }

  return components;
}

function parseComponentMarkdown(content) {
  const lines = content.split('\n');
  const components = [];
  let currentComponent = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('#### ')) {
      if (currentComponent) {
        components.push(currentComponent);
      }
      const componentNameMatch = trimmedLine.match(/#### (.+) \((.+)\)/);
      if (componentNameMatch) {
        currentComponent = {
          name: componentNameMatch[1],
          id: componentNameMatch[2],
          version: '',
          category: '',
          props: {},
          events: []
        };
      }
      continue;
    }

    if (!currentComponent) {
      continue;
    }

    if (trimmedLine.startsWith('- **版本**: ')) {
      currentComponent.version = trimmedLine.replace('- **版本**: ', '').trim();
      continue;
    }

    if (trimmedLine.startsWith('- **分类**: ')) {
      currentComponent.category = trimmedLine.replace('- **分类**: ', '').trim();
      continue;
    }

    if (trimmedLine.startsWith('- **属性**:')) {
      continue;
    }

    if (trimmedLine.startsWith('- `') && trimmedLine.includes(':')) {
      const propMatch = trimmedLine.match(/- `([^`]+)`: (.+) \(([^,)]+), 默认值 ([^)]+)\)/);
      if (propMatch) {
        const propName = propMatch[1];
        const propLabel = propMatch[2];
        const propType = propMatch[3].trim();
        const propDefault = propMatch[4];

        let standardType = 'string';
        if (propType.includes('boolean')) standardType = 'boolean';
        else if (propType.includes('array')) standardType = 'array';
        else if (propType.includes('number')) standardType = 'number';

        currentComponent.props[propName] = {
          type: standardType,
          label: propLabel,
          default: propDefault === 'false' ? false : propDefault === 'true' ? true : propDefault === '""' ? '' : propDefault
        };
      } else {
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

    if (trimmedLine.startsWith('- **事件**:')) {
      continue;
    }

    if (trimmedLine.startsWith('- `') && trimmedLine.includes('`:') && !trimmedLine.includes('默认值')) {
      const eventMatch = trimmedLine.match(/- `([^`]+)`: (.+)/);
      if (eventMatch) {
        currentComponent.events.push({
          name: eventMatch[1],
          description: eventMatch[2]
        });
      }
    }
  }

  if (currentComponent) {
    components.push(currentComponent);
  }

  return components;
}
