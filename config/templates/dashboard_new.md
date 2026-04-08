# 仪表盘页面模板

## 模板信息
- **ID**: dashboard
- **分类**: dashboard
- **版本**: 1.0.0
- **适用场景**: 数据统计概览、业务监控、KPI展示等仪表盘场景

## 使用的组件

### 核心组件结构
- **根容器 (root)**: 页面根组件，负责整体布局和主题设置
- **卡片容器 (card)**: 用于组织统计卡片和图表区域
- **文本 (fh_text)**: 用于展示统计数值和指标名称
- **按钮 (fh_button)**: 用于操作（刷新、导出、查看详情等）

## 页面结构描述

### 整体布局
- 页面采用网格布局，多个统计卡片和图表区域并排显示
- 顶部包含页面标题和全局操作按钮
- 中部按功能模块分组展示统计数据和图表
- 底部可包含更多详细信息或操作入口

### 统计区域
- **KPI卡片**: 显示关键指标数值（如用户数、订单数、收入等）
- **趋势图表**: 显示数据变化趋势（如日活用户趋势、销售额趋势等）
- **分布图表**: 显示数据分布情况（如用户地域分布、产品类别分布等）

### 操作区域
- **全局操作**: 刷新数据、导出报表、设置筛选条件等
- **卡片操作**: 各统计卡片内的详情查看、图表切换等

## 事件调用说明

### 预定义事件处理函数
- **handleRefresh(ctx)**: 处理刷新事件，由刷新按钮触发
  - 参数: `ctx` (组件上下文信息)
  - 功能: 重新加载所有统计数据和图表
  
- **handleExport(ctx)**: 处理导出事件，由导出按钮触发
  - 参数: `ctx` (组件上下文信息)
  - 功能: 导出当前页面的统计数据为报表文件
  
- **handleViewDetail(ctx)**: 处理查看详情事件，由详情按钮触发
  - 参数: `ctx` (组件上下文信息)
  - 功能: 跳转到对应数据的详情页面
  
- **handleChangePeriod(ctx)**: 处理时间周期切换事件
  - 参数: `ctx` (组件上下文信息)
  - 功能: 切换统计数据的时间范围（今日、本周、本月等）

### 组件事件绑定
- **刷新按钮**: 
  - `onClick` 事件绑定到 `handleRefresh` 函数
  
- **导出按钮**: 
  - `onClick` 事件绑定到 `handleExport` 函数
  
- **详情按钮**: 
  - `onClick` 事件绑定到 `handleViewDetail` 函数
  
- **时间筛选**: 
  - 相关操作绑定到 `handleChangePeriod` 函数

## 数据源配置
- **kpiData**: KPI统计数据变量，用于存储关键指标数值
- **chartData**: 图表数据变量，用于存储图表展示数据
- **timeRange**: 时间范围变量，用于控制数据统计周期
- **pageParams**: 页面基本信息（title, theme等）

## 事件函数生成要求
根据组件事件生成规范，必须在 `actions.module.source` 中生成以下导出函数：
- `export function handleRefresh(ctx) { console.log('handleRefresh', ctx); }`
- `export function handleExport(ctx) { console.log('handleExport', ctx); }`
- `export function handleViewDetail(ctx) { console.log('handleViewDetail', ctx); }`
- `export function handleChangePeriod(ctx) { console.log('handleChangePeriod', ctx); }`

所有函数参数签名必须严格匹配组件配置文件中的实际定义。