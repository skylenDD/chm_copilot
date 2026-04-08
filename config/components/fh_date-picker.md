#### 日期选择器 (fh_date-picker)
- **版本**: 1.0.0
- **分类**: form
- **图标**: icon-calendar
- **属性**:
  - `label`: 标签 (string, 默认值: "选择日期")
  - `format`: 日期格式 (string, 默认值: "YYYY-MM-DD")
- **事件**:
  - `onChange(ctx)`: 日期变化事件，ctx 包含组件上下文信息，默认实现：`console.log('onChange', ctx)`