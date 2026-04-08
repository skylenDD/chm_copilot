# 低代码 Schema 结构规范

## 核心结构

### Schema 根节点
- **必需字段**：
  - `schemaType`: "superform"
  - `superVersion`: 版本号（如 "1.0.0"）
  - `pages`: 页面数组
  - `actions`: 全局动作配置

### 页面节点
- **必需字段**：
  - `id`: 页面唯一标识
  - `params`: 页面参数对象
    - `enTitle`: 英文标题
    - `title`: 中文标题  
    - `groupId`: 固定值 -1
    - `theme`: 风格主题（"default"-清新|"light"-默认|"dark"-暗黑|"afour"|"palantirV4"|"compact-紧凑"）
  - `layout`: 页面根组件（componentName 必须为 "root"）
- **可选字段**：
  - `dataSource`: 数据源配置
    - `online`: 数据源定义数组

### 组件节点
- **必需字段**：
  - `componentName`: 组件ID（来自组件清单）
  - `type`: 组件分类
  - `version`: 组件版本
  - `style`: 样式配置（默认 `{":root": {}}`）
  - `props`: 组件属性
  - `id`: 组件唯一标识
  - `name`: 组件名称
  - `category`: 组件分类标识
  - `events`: 事件配置对象

## 字段规则

### actions 字段
- 结构：`{ "module": { "source": "页面JS代码字符串" } }`
- `source` 包含页面 JavaScript 代码

### dataSource 字段
- `online` 数组元素类型：
  - **VALUE**（普通变量）：`name`, `protocol: "VALUE"`, `initialData`
  - **REMOTE**（接口请求）：`name`, `protocol: "REMOTE"`, `url`, `method`

### events 字段
- 结构：`{ "事件名": [处理函数数组] }`
- 处理函数包含：
  - `id`: 函数名称
  - `name`: 中文描述

## 组件事件生成规则

当组件定义了事件(events字段)时，必须遵循以下规则：

1. **函数生成要求**：每个事件处理函数(id)必须在 `actions.module.source` 中生成对应的导出函数
2. **参数签名准确性**：**函数参数必须严格匹配组件配置文件中定义的实际参数签名**
   - **严禁预设参数数量**（如假设只有1个或2个参数）
   - **必须以实际使用到的组件方法配置信息为准**
   - 不同组件的同一事件可能有不同的参数签名，必须逐个核对组件配置文件
3. **命名一致性**：生成的函数名必须与事件配置中的 `id` 严格一致
4. **完整性保证**：确保 `events` 配置中的每个事件都在 `actions.module.source` 中有对应的函数定义
5. **参数命名规范**：参数名称必须与组件配置文件中定义的完全一致

## 禁止规则

- 组件属性必须放在 `props` 内，不得作为根字段
- 页面节点不得包含 `children` 字段
- `layout` 对象不得包含 `root` 属性
- 不得使用未定义的自定义字段

## 示例

```json
{
  "schemaType": "superform",
  "superVersion": "1.0.0",
  "pages": [
    {
      "id": "user-info-page",
      "title": "用户信息页",
      "params": {
        "enTitle": "User Information",
        "groupId": -1,
        "theme": "default"
      },
      "dataSource": {
        "online": [
          {
            "name": "userData",
            "protocol": "VALUE",
            "initialData": {}
          },
          {
            "name": "userList",
            "protocol": "REMOTE",
            "url": "/api/users",
            "method": "GET"
          }
        ]
      },
      "layout": {
        "componentName": "root",
        "type": "container",
        "version": "1.0.0",
        "style": {":root": {}},
        "props": {},
        "id": "page-root",
        "name": "页面根容器",
        "category": "container",
        "events": {},
        "children": [
          {
            "componentName": "fh_input-text",
            "type": "form",
            "version": "1.0.0",
            "style": {":root": {}},
            "props": {
              "name": "username",
              "label": "用户名"
            },
            "id": "username-input",
            "name": "用户名输入框",
            "category": "form",
            "events": {
              "onChange": [
                {
                  "id": "handleUsernameChange",
                  "name": "处理用户名变化"
                }
              ],
              "onFocus": [
                {
                  "id": "handleUsernameFocus", 
                  "name": "处理用户名聚焦"
                }
              ]
            }
          },
          {
            "componentName": "fh_button",
            "type": "basic",
            "version": "1.0.0",
            "style": {":root": {}},
            "props": {
              "text": "提交"
            },
            "id": "submit-button",
            "name": "提交按钮",
            "category": "basic",
            "events": {
              "onClick": [
                {
                  "id": "handleSubmit",
                  "name": "处理提交"
                }
              ]
            }
          }
        ]
      }
    }
  ],
  "actions": {
    "module": {
      "source": "export function handleUsernameChange(ctx, a) {\\n  console.log('handleUsernameChange', ctx, a);\\n}\\n\\nexport function handleUsernameFocus(ctx, b) {\\n  console.log('handleUsernameFocus', ctx, b);\\n}\\n\\nexport function handleSubmit(ctx) {\\n  console.log('handleSubmit', ctx);\\n}"
    }
  }
}
```

temperature: 0.3