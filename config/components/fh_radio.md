#### 单选 (fh_radio)
- **版本**: 1.0.0
- **分类**: form
- **图标**: icon-radio
- **属性**:
  - `label`: 标签 (string, 默认值: "单选")
  - `options`: 选项列表 (array, 每项包含 label 和 value)
- **事件**:
  - `onChange(ctx)`: 选项变化事件，ctx 包含组件上下文信息，默认实现：`console.log('onChange', ctx)`