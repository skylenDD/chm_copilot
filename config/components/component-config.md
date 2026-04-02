# 低代码平台内置组件配置

## 表单类组件

#### 文本输入框 (fh_input-text)
- **版本**: 1.0.0
- **分类**: form
- **图标**: icon-text
- **属性**:
  - `label`: 标签 (string, 默认值: "请输入")
  - `placeholder`: 占位符 (string, 默认值: "请输入内容")  
  - `required`: 是否必填 (boolean, 默认值: false)
- **事件**:
  - `onChange(ctx)`: 内容变化事件，ctx 包含组件上下文信息，默认实现：`console.log('onChange', ctx)`
  - `onFocus(ctx)`: 获取焦点事件，ctx 包含组件上下文信息，默认实现：`console.log('onFocus', ctx)`

#### 下拉框 (fh_select)
- **版本**: 1.0.0
- **分类**: form
- **图标**: icon-select
- **属性**:
  - `label`: 标签 (string, 默认值: "选择项")
  - `options`: 选项列表 (array, 每项包含 label 和 value)
  - `required`: 是否必选 (boolean, 默认值: false)
  - `defaultValue`: 默认值 (string, 默认值: "")
- **事件**:
  - `onChange(ctx)`: 选择变化事件，ctx 包含组件上下文信息，默认实现：`console.log('onChange', ctx)`

#### 日期选择器 (fh_date-picker)
- **版本**: 1.0.0
- **分类**: form
- **图标**: icon-calendar
- **属性**:
  - `label`: 标签 (string, 默认值: "选择日期")
  - `format`: 日期格式 (string, 默认值: "YYYY-MM-DD")
- **事件**:
  - `onChange(ctx)`: 日期变化事件，ctx 包含组件上下文信息，默认实现：`console.log('onChange', ctx)`

#### 单选 (fh_radio)
- **版本**: 1.0.0
- **分类**: form
- **图标**: icon-radio
- **属性**:
  - `label`: 标签 (string, 默认值: "单选")
  - `options`: 选项列表 (array, 每项包含 label 和 value)
- **事件**:
  - `onChange(ctx)`: 选项变化事件，ctx 包含组件上下文信息，默认实现：`console.log('onChange', ctx)`

#### 复选 (fh_checkbox)
- **版本**: 1.0.0
- **分类**: form
- **图标**: icon-checkbox
- **属性**:
  - `label`: 标签 (string, 默认值: "复选")
  - `options`: 选项列表 (array, 每项包含 label 和 value)
- **事件**:
  - `onChange(ctx)`: 选择变化事件，ctx 包含组件上下文信息，默认实现：`console.log('onChange', ctx)`

## 数据展示类组件

#### 表格 (fh_table)
- **版本**: 1.0.0
- **分类**: data
- **图标**: icon-table
- **属性**:
  - `columns`: 列配置 (array)
  - `data`: 数据源 (array)
- **事件**:
  - `onRowClick(ctx)`: 行点击事件，ctx 包含行数据和组件上下文信息，默认实现：`console.log('onRowClick', ctx)`

## 反馈类组件

#### 弹窗 (fh_modal)
- **版本**: 1.0.0
- **分类**: feedback
- **图标**: icon-modal
- **属性**:
  - `title`: 标题 (string, 默认值: "弹窗标题")
  - `visible`: 显示状态 (boolean, 默认值: false)
- **事件**:
  - `onClose(ctx)`: 关闭事件，ctx 包含组件上下文信息，默认实现：`console.log('onClose', ctx)`
  - `onOpen(ctx)`: 打开事件，ctx 包含组件上下文信息，默认实现：`console.log('onOpen', ctx)`

## 基础类组件

#### 文本 (fh_text)
- **版本**: 1.0.0
- **分类**: basic
- **图标**: icon-text
- **属性**:
  - `content`: 文本内容 (string, 默认值: "示例文本")
- **事件**: 无

#### 按钮 (fh_button)
- **版本**: 1.0.0
- **分类**: basic
- **图标**: icon-button
- **属性**:
  - `text`: 按钮文本 (string, 默认值: "点击")
  - `type`: 样式类型 (string, 默认值: "primary", 选项: default, primary)
- **事件**:
  - `onClick(ctx)`: 点击事件，ctx 包含组件上下文信息，默认实现：`console.log('onClick', ctx)`

## 容器类组件

#### 表单 (fh_form)
- **版本**: 1.0.1
- **分类**: form
- **图标**: icon-form
- **属性**:
  - `fields`: 字段列表 (array)
  - `submitText`: 提交文本 (string, 默认值: "提交")
- **事件**:
  - `onSubmit(ctx)`: 提交事件，ctx 包含表单数据和组件上下文信息，默认实现：`console.log('onSubmit', ctx)`

#### 根容器 (root)
  - **版本**: 1.0.0
  - **分类**: container
  - **图标**: icon-root
  - **属性**: 无
    - `theme`: 页面风格 (string, 默认值: "light", 选项: light, dark..)
  - **事件**: 无

temperature: 0.7