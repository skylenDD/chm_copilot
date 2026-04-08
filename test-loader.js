import { loadTemplateIndex, loadTemplatesByCategory, findBestMatchingTemplate, loadTemplateContents } from '../scripts/loader.js';

console.log('=== 测试模板索引加载 ===');
const templates = loadTemplateIndex();
console.log('加载的模板数量:', templates.length);
console.log('模板列表:', templates.map(t => `${t.id} (${t.category})`));

console.log('\n=== 测试按类别加载 ===');
const formTemplates = loadTemplatesByCategory('form');
console.log('表单模板:', formTemplates.map(t => t.id));

const listTemplates = loadTemplatesByCategory('list');
console.log('列表模板:', listTemplates.map(t => t.id));

console.log('\n=== 测试模板内容加载 ===');
const templateContents = loadTemplateContents(templates);
console.log('加载的模板内容数量:', Object.keys(templateContents).length);

console.log('\n=== 测试模板匹配 ===');
const testTexts = ['创建一个表单页面', '显示数据列表', '查看详情页面', '仪表盘统计'];
for (const text of testTexts) {
  const match = findBestMatchingTemplate(text, templates, templateContents);
  console.log(`"${text}" -> ${match ? match.templateId : '无匹配'}`);
}