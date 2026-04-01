# 低代码平台内置组件配置规则

## 组件配置规范

所有组件必须遵循以下配置规范：

- **id**: 组件唯一标识 (字符串，必填)
- **version**: 组件当前版本 (字符串，必填)
- **title**: 组件名称 (字符串，必填)  
- **category**: 组件分类，如表单、布局、图表 (字符串，必填)
- **icon**: 组件图标（可选）(字符串，可选)
- **props**: 组件可配置属性 (对象)
- **events**: 组件事件列表 (数组)

### 属性配置规范

每个属性配置必须包含：
- **type**: 属性类型 (string, number, boolean, select, object, array)
- **label**: 属性标签 (字符串)
- **default**: 默认值 (任意类型)
- **required**: 是否必填 (布尔值，可选)
- **options**: 选项列表 (数组，仅适用于select类型)

### 事件配置规范

每个事件配置必须包含：
- **name**: 事件名称 (字符串，必填)
- **description**: 事件描述 (字符串)

## 内置组件列表

### 表单类组件

#### 文本输入框 (fh_input-text)
- **分类**: form
- **图标**: icon-text
- **属性**:
  - `label`: 标签 (string, 默认值: "请输入")
  - `placeholder`: 占位符 (string, 默认值: "请输入内容")  
  - `required`: 是否必填 (boolean, 默认值: false)
- **事件**:
  - `onChange`: 内容变化事件
  - `onFocus`: 获取焦点事件

#### 下拉框 (fh_select)
- **分类**: form
- **图标**: icon-select
- **属性**:
  - `label`: 标签 (string, 默认值: "选择项")
  - `options`: 选项列表 (array, 每项包含 label 和 value)
  - `required`: 是否必选 (boolean, 默认值: false)
  - `defaultValue`: 默认值 (string, 默认值: "")
- **事件**:
  - `onChange`: 选择变化事件

#### 日期选择器 (fh_date-picker)
- **分类**: form
- **图标**: icon-calendar
- **属性**:
  - `label`: 标签 (string, 默认值: "选择日期")
  - `format`: 日期格式 (string, 默认值: "YYYY-MM-DD")
- **事件**:
  - `onChange`: 日期变化事件

#### 单选 (fh_radio)
- **分类**: form
- **图标**: icon-radio
- **属性**:
  - `label`: 标签 (string, 默认值: "单选")
  - `options`: 选项列表 (array, 每项包含 label 和 value)
- **事件**:
  - `onChange`: 选项变化

#### 复选 (fh_checkbox)
- **分类**: form
- **图标**: icon-checkbox
- **属性**:
  - `label`: 标签 (string, 默认值: "复选")
  - `options`: 选项列表 (array, 每项包含 label 和 value)
- **事件**:
  - `onChange`: 选择变化

### 数据展示类组件

#### 表格 (fh_table)
- **分类**: data
- **图标**: icon-table
- **属性**:
  - `columns`: 列配置 (array)
  - `data`: 数据源 (array)
- **事件**:
  - `onRowClick`: 行点击事件

### 反馈类组件

#### 弹窗 (fh_modal)
- **分类**: feedback
- **图标**: icon-modal
- **属性**:
  - `title`: 标题 (string, 默认值: "弹窗标题")
  - `visible`: 显示状态 (boolean, 默认值: false)
- **事件**:
  - `onClose`: 关闭事件
  - `onOpen`: 打开事件

### 基础类组件

#### 文本 (fh_text)
- **分类**: basic
- **图标**: icon-text
- **属性**:
  - `content`: 文本内容 (string, 默认值: "示例文本")
- **事件**: 无

#### 按钮 (fh_button)
- **分类**: basic
- **图标**: icon-button
- **属性**:
  - `text`: 按钮文本 (string, 默认值: "点击")
  - `type`: 样式类型 (string, 默认值: "primary", 选项: default, primary)
- **事件**:
  - `onClick`: 点击事件

### 容器类组件

#### 表单 (fh_form)
- **分类**: form
- **图标**: icon-form
- **属性**:
  - `fields`: 字段列表 (array)
  - `submitText`: 提交文本 (string, 默认值: "提交")
- **事件**:
  - `onSubmit`: 提交事件

## 使用说明

AI生成低代码Schema时，必须严格基于以上定义的组件库，严禁使用通用React组件知识。所有生成的Schema字段和组件类型必须与实际注册的组件一致。

temperature: 0.7