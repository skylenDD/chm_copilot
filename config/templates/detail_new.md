# 基础详情页面模板

## 模板信息
- **ID**: detail
- **分类**: form
- **版本**: 1.0.0
- **适用场景**: 产品详情、用户信息、联系人详情等数据展示场景

## 使用的组件

### 核心组件结构
- **根容器 (root)**: 页面根组件，负责整体布局和主题设置
- **详情卡片 (card)**: 用于组织详情信息的容器
- **文本 (fh_text)**: 用于静态文本展示（如标签、值）
- **按钮 (fh_button)**: 用于操作（返回、编辑、删除等）

## 页面结构描述

### 整体布局
- 页面采用卡片式布局，信息按区块组织
- 顶部包含页面标题和操作按钮
- 中部按信息类别分组展示详情内容
- 底部包含导航和操作按钮

### 信息展示区域
- **基本信息区**: 显示核心字段（如姓名、ID、状态等）
- **详细信息区**: 显示扩展字段（如描述、地址、联系方式等）
- **状态信息区**: 显示状态相关字段（如创建时间、更新时间等）

### 操作区域
- **顶部操作**: 编辑、删除等主要操作按钮
- **底部导航**: 返回列表、上一条、下一条等导航按钮

## 事件调用说明

### 预定义事件处理函数
- **handleEdit(ctx)**: 处理编辑事件，由编辑按钮触发
  - 参数: `ctx` (组件上下文信息)
  - 功能: 跳转到编辑页面或打开编辑弹窗
  
- **handleDelete(ctx)**: 处理删除事件，由删除按钮触发
  - 参数: `ctx` (组件上下文信息)
  - 功能: 执行删除确认和删除操作
  
- **handleReturn(ctx)**: 处理返回事件，由返回按钮触发
  - 参数: `ctx` (组件上下文信息)
  - 功能: 返回到上一级页面（通常是列表页）
  
- **handlePrev(ctx)**: 处理上一条事件，由上一条按钮触发
  - 参数: `ctx` (组件上下文信息)
  - 功能: 导航到上一条记录
  
- **handleNext(ctx)**: 处理下一条事件，由下一条按钮触发
  - 参数: `ctx` (组件上下文信息)
  - 功能: 导航到下一条记录

### 组件事件绑定
- **编辑按钮**: 
  - `onClick` 事件绑定到 `handleEdit` 函数
  
- **删除按钮**: 
  - `onClick` 事件绑定到 `handleDelete` 函数
  
- **返回按钮**: 
  - `onClick` 事件绑定到 `handleReturn` 函数
  
- **导航按钮**: 
  - 上一条按钮 `onClick` 绑定到 `handlePrev` 函数
  - 下一条按钮 `onClick` 绑定到 `handleNext` 函数

## 数据源配置
- **detailData**: 详情数据变量，用于存储和绑定详情信息
- **pageParams**: 页面基本信息（title, theme等）
- **navigation**: 导航相关变量，用于控制前后条记录

## 事件函数生成要求
根据组件事件生成规范，必须在 `actions.module.source` 中生成以下导出函数：
- `export function handleEdit(ctx) { console.log('handleEdit', ctx); }`
- `export function handleDelete(ctx) { console.log('handleDelete', ctx); }`
- `export function handleReturn(ctx) { console.log('handleReturn', ctx); }`
- `export function handlePrev(ctx) { console.log('handlePrev', ctx); }`
- `export function handleNext(ctx) { console.log('handleNext', ctx); }`

所有函数参数签名必须严格匹配组件配置文件中的实际定义。