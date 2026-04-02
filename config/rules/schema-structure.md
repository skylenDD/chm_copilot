# 通用低代码 Schema 结构规则

## 核心结构规范

### Schema 根节点
- **必须字段**：
  - `schemaType` - Schema类型标识，固定值为 "superform"
  - `superVersion` - SuperForm版本号，字符串类型（如 "1.0.0"）
  - `pages` - 页面数组，包含一个或多个页面对象
  - `actions` - 全局动作配置对象，用于定义页面逻辑和事件处理函数
- **禁止字段**：
  - 不得包含其他根级别字段

### 页面节点
- **必须字段**：
  - `id` - 页面唯一标识，字符串或数字类型
  - `params` - 页面参数对象，包含以下必需字段：
    - `enTitle` - 页面英文标题，字符串类型
    - `title` - 页面中文标题，字符串类型
    - `groupId` - 组ID，数字类型，固定值为 -1
    - `theme` - 页面风格主题，字符串类型，必须为以下值之一：
      - "default" (清新版)
      - "light" (清新版2.0)  
      - "dark" (酷炫版)
      - "afour" (A4版)
      - "palantirV4" (帕兰提尔版)
      - "compact" (紧凑型)
  - `layout` - **页面根组件对象**，直接作为页面结构Schema的起始点，必须是一个完整的组件对象，componentName必须为"root"
- **可选字段**：
  - `dataSource` - 数据源配置对象，用于定义页面变量或接口请求
    - `online` - 页面变量或接口请求定义数组

### 组件节点
- **必须字段**：
  - `componentName` - 组件类型标识，必须使用预定义组件清单中的组件ID（如 "fh_input-text", "fh_select" 等）
  - `type` - 组件分类标识，必须使用组件清单中对应的分类（如 "form", "basic", "container" 等）
  - `version` - 组件版本号，必须使用组件清单中对应的版本号（如 "1.0.0"）
  - `style` - 组件样式配置，默认值为 `{":root": {}}`
  - `props` - 组件自身属性对象，必须包含组件清单中定义的所有必填属性
  - `id` - 组件唯一标识（字符串或数字类型）
  - `name` - 组件名称（字符串类型）
  - `category` - 组件分类标识（字符串类型）
  - `events` - 组件事件配置对象，以事件名作为key，value为事件处理函数数组
- **可选字段**：
  - `children` - 子组件数组，仅当组件支持嵌套时使用

### 嵌套结构
- 支持嵌套的组件通过 `children` 字段包含子组件
- `children` 字段值必须为数组类型，包含有效的组件对象
- 不支持嵌套的组件不得包含 `children` 字段

## 字段验证规则

### schemaType 字段
- 必须严格等于 "superform"
- 值必须为字符串类型

### superVersion 字段
- 必须为字符串类型（如 "1.0.0"）
- 表示整个SuperForm Schema的版本号

### pages 字段
- 必须为数组类型
- 数组元素必须为有效的页面对象
- 至少包含一个页面 object

### actions 字段
- 必须为对象类型
- 结构格式：`{ "module": { "source": "页面JS代码字符串" } }`
- `module` 对象必须包含 `source` 字段
- `source` 字段为字符串类型，包含完整的页面 JavaScript 代码
- 页面 JS 代码中会自动生成与 `events` 事件对象 `id` 对应的完整函数（export 形式）
- 当 `events` 中的 `callback` 为空字符串时，系统会默认在页面 JS 中生成对应函数，函数签名包含 `ctx` 参数，内容为打印传参
- 当 `events` 中的 `callback` 指定了内置方法时，页面 JS 中不会重复生成该函数

### id 字段（页面级别）
- 必须为字符串或数字类型
- 作为页面的唯一标识符

### params 字段（页面级别）
- 必须为对象类型
- 包含页面的详细参数配置

#### enTitle 字段
- 必须为字符串类型
- 表示页面的英文标题

#### groupId 字段
- 必须为数字类型
- 固定值为 -1

#### title 字段
- 必须字符串类型
- 表示页面的中文标题

#### theme 字段
- 必须为字符串类型
- 必须严格使用以下预定义值之一：
  - "default" - 清新版
  - "light" - 清新版2.0
  - "dark" - 酷炫版
  - "afour" - A4版
  - "palantirV4" - 帕兰提尔版
  - "compact" - 紧凑型
- 禁止使用其他自定义主题值

### dataSource 字段（页面级别）
- **可选字段**：可以不提供
- 必须为对象类型
- 必须包含 `online` 字段
- `online` 字段必须为数组类型
- `online` 数组中的每个元素表示一个数据源定义，支持两种类型：
  - **普通变量 (VALUE)**：
    - `name`: 变量名称（字符串类型）
    - `protocol`: 协议类型，固定值为 "VALUE"
    - `initialData`: 变量初始值（任意类型）
  - **接口请求 (REMOTE)**：
    - `name`: 数据名称（字符串类型）
    - `protocol`: 协议类型，固定值为 "REMOTE"  
    - `url`: 请求地址（字符串类型）
    - `method`: 请求方法（字符串类型，如 "GET", "POST" 等）

### layout 字段（页面级别）
- **必须为组件对象类型**
- **直接作为页面结构Schema的根容器**
- **componentName必须为"root"**
- **必须包含完整的组件字段：componentName, type, version, style, props, id, name, category, events**
- **页面的其他组件结构必须放在layout组件的children字段下**
- **严禁在layout对象中使用root属性或其他嵌套结构**

### componentName 字段
- 必须严格使用组件清单中的组件ID作为值
- 对于layout组件，componentName必须为"root"
- 禁止使用未在清单中定义的组件ID
- 值必须为字符串类型

### type 字段（组件级别）
- 必须严格使用组件清单中对应的分类标识
- 值必须为字符串类型（如 "form", "basic", "data", "feedback", "container"）
- 禁止使用未在清单中定义的分类

### version 字段
- 必须严格使用组件清单中对应的版本号
- 值必须为字符串类型（如 "1.0.0"）
- 禁止使用未在清单中定义的版本号

### props 字段
- 必须为对象类型
- 所有属性必须在对应组件的props定义中存在
- 属性值类型必须与props定义中的type字段匹配
- 必填属性（required: true）必须提供有效值
- 组件自身的所有配置属性必须放在props对象下，不得直接作为组件根字段

### style 字段
- 必须为对象类型
- 默认值为 `{":root": {}}`
- 样式对象必须符合CSS-in-JS格式

### children 字段
- 仅容器类组件可以包含此字段
- 必须为数组类型
- 数组元素必须为有效的组件对象

### id 字段（组件级别）
- 必须为字符串或数字类型
- 作为组件的唯一标识符

### name 字段（组件级别）
- 必须为字符串类型
- 表示组件的显示名称

### category 字段（组件级别）
- 必须为字符串类型
- 表示组件的分类标识

### events 字段（组件级别）
- 必须为对象类型
- 以事件名作为key，value为数组类型
- 数组中的每个元素必须包含以下字段：
  - `id`: 具体执行的函数名称（字符串类型）
  - `name`: 方法中文名称（字符串类型）
  - `params`: 参数配置对象，必须包含以下字段：
    - `callback`: 内置方法的字符串形式（字符串类型），可以是完整的函数定义或为空字符串。当提供完整函数定义时，函数名称必须与该事件对象的 `id` 字段相同（如 `id` 为 "setValue"，则函数定义应为 `"function setValue(ctx) { console.log('setValue', ctx); }"`）。当没有给定执行内容时，`callback` 应为空字符串。
- **联动机制**：当 `callback` 为空字符串时，系统会在 `actions.module.source` 的页面 JS 中自动生成对应的完整函数（export 形式），函数签名包含 `ctx` 参数，内容为打印传参，函数名称与 `id` 相同。当 `callback` 指定了内置方法时，页面 JS 中不会重复生成该函数，而是直接使用指定的实现。

## 禁止使用的字段

以下字段在任何情况下都不得使用：
- 直接在组件根级别放置组件自身属性（所有属性必须放在props下）
- 使用除 `children` 以外的其他嵌套字段名
- 在根节点使用除 `schemaType`, `superVersion`, `pages`, `actions` 以外的字段
- 在页面节点使用除 `id`, `type`, `title`, `params`, `layout`, `dataSource` 以外的字段
- **页面节点不得包含 `children` 字段**（组件结构必须放在 `layout.children` 下）
- **layout对象不得包含 `root` 属性**（layout本身就是root组件）
- 任何未在组件清单中明确定义的自定义字段

## 样式规范

- 单个组件的样式必须通过 `style` 字段配置
- `style` 字段的默认值为 `{":root": {}}`
- 样式对象必须符合CSS-in-JS格式

## 示例结构

```json
{
  "schemaType": "superform",
  "superVersion": "1.0.0",
  "pages": [
    {
      "id": "user-info-page",
      "type": "page",
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
            "componentName": "fh_form",
            "type": "container",
            "version": "1.0.1",
            "style": {":root": {}},
            "props": {
              "submitText": "提交表单"
            },
            "id": "main-form",
            "name": "主表单",
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
                  "label": "用户名",
                  "placeholder": "请输入用户名"
                },
                "id": "username-input",
                "name": "用户名输入框",
                "category": "form",
                "events": {
                  "onChange": [
                    {
                      "id": "setValue",
                      "name": "设置值",
                      "params": {
                        "callback": "function setValue(ctx) { console.log('setValue', ctx); }"
                      }
                    },
                    {
                      "id": "showTip",
                      "name": "显示提示",
                      "params": {
                        "callback": ""
                      }
                    }
                  ],
                  "onFocus": [
                    {
                      "id": "focusHandler",
                      "name": "获取焦点处理",
                      "params": {
                        "callback": "function focusHandler(ctx) { console.log('focusHandler', ctx); }"
                      }
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
                  "text": "提交按钮",
                  "type": "primary"
                },
                "id": "submit-button",
                "name": "提交按钮",
                "category": "basic",
                "events": {
                  "onClick": [
                    {
                      "id": "submitForm",
                      "name": "提交表单",
                      "params": {
                        "callback": ""
                      }
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    }
  ],
  "actions": {
    "module": {
      "source": "export function showTip(ctx) {\\n  console.log('showTip', ctx);\\n}\\n\\nexport function submitForm(ctx) {\\n  console.log('submitForm', ctx);\\n}"
    }
  }
}
```

temperature: 0.3