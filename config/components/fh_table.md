#### 表格 (fh_table)
- **版本**: 1.0.0
- **分类**: data
- **图标**: icon-table
- **属性**:
  - `columns`: 列配置 (array)
  - `data`: 数据源 (array)
- **事件**:
  - `onRowClick(ctx)`: 行点击事件，ctx 包含行数据和组件上下文信息，默认实现：`console.log('onRowClick', ctx)`