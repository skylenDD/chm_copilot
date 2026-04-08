# 数据列表页面模板

## 模板信息
- **ID**: data-list
- **分类**: list
- **版本**: 1.0.0
- **适用场景**: 用户管理、订单列表、产品目录等带搜索和分页的数据展示场景

## 使用的组件

### 核心组件结构
- **根容器 (root)**: 页面根组件，负责整体布局和主题设置
- **搜索表单 (fh_form)**: 包含搜索条件输入字段
- **表格 (fh_table)**: 用于数据展示和操作
- **文本输入框 (fh_input-text)**: 用于搜索关键词输入
- **下拉框 (fh_select)**: 用于状态筛选、分类选择等
- **按钮 (fh_button)**: 用于搜索、重置、新增等操作

## 页面结构描述

### 整体布局
- 页面采用上下结构：顶部为搜索区域，底部为数据表格
- 搜索区域包含多个筛选条件和操作按钮
- 表格区域显示数据列表，支持分页和操作列

### 搜索区域
- **关键词搜索**: 文本输入框用于输入搜索关键词
- **状态筛选**: 下拉框用于选择数据状态（如启用/禁用）
- **分类筛选**: 下拉框用于选择数据分类
- **操作按钮**: 搜索按钮、重置按钮、新增按钮

### 表格区域
- **列配置**: 包含序号、关键字段、状态、操作列等
- **分页控件**: 支持分页浏览大量数据
- **操作列**: 包含编辑、删除、查看详情等操作按钮

## 事件调用说明

### 预定义事件处理函数
- **handleSearch(ctx)**: 处理搜索事件，由搜索按钮触发
  - 参数: `ctx` (组件上下文信息)
  - 功能: 收集搜索条件并刷新表格数据
  
- **handleReset(ctx)**: 处理重置事件，由重置按钮触发
  - 参数: `ctx` (组件上下文信息)  
  - 功能: 清空搜索条件并重置表格
  
- **handleAdd(ctx)**: 处理新增事件，由新增按钮触发
  - 参数: `ctx` (组件上下文信息)
  - 功能: 跳转到新增页面或打开新增弹窗
  
- **handleEdit(ctx)**: 处理编辑事件，由编辑按钮触发
  - 参数: `ctx` (组件上下文信息)
  - 功能: 跳转到编辑页面或打开编辑弹窗
  
- **handleDelete(ctx)**: 处理删除事件，由删除按钮触发
  - 参数: `ctx` (组件上下文信息)
  - 功能: 执行删除确认和删除操作
  
- **handleViewDetail(ctx)**: 处理查看详情事件，由详情按钮触发
  - 参数: `ctx` (组件上下文信息)
  - 功能: 跳转到详情页面或打开详情弹窗

### 组件事件绑定
- **搜索表单**: 
  - 提交事件绑定到 `handleSearch` 函数
  
- **重置按钮**: 
  - `onClick` 事件绑定到 `handleReset` 函数
  
- **新增按钮**: 
  - `onClick` 事件绑定到 `handleAdd` 函数
  
- **表格操作列**: 
  - 编辑按钮 `onClick` 绑定到 `handleEdit` 函数
  - 删除按钮 `onClick` 绑定到 `handleDelete` 函数  
  - 详情按钮 `onClick` 绑定到 `handleViewDetail` 函数

## 数据源配置
- **searchParams**: 搜索条件变量，用于存储搜索表单数据
- **tableData**: 表格数据变量，用于存储和绑定表格数据
- **pagination**: 分页配置变量，用于控制分页状态
- **pageParams**: 页面基本信息（title, theme等）

## 事件函数生成要求
根据组件事件生成规范，必须在 `actions.module.source` 中生成以下导出函数：
- `export function handleSearch(ctx) { console.log('handleSearch', ctx); }`
- `export function handleReset(ctx) { console.log('handleReset', ctx); }`
- `export function handleAdd(ctx) { console.log('handleAdd', ctx); }`
- `export function handleEdit(ctx) { console.log('handleEdit', ctx); }`
- `export function handleDelete(ctx) { console.log('handleDelete', ctx); }`
- `export function handleViewDetail(ctx) { console.log('handleViewDetail', ctx); }`

所有函数参数签名必须严格匹配组件配置文件中的实际定义。