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