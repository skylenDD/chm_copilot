# CHM Copilot - Low-Code Page Generator

A low-code page generator built with Next.js, AMIS, and DashScope (Tongyi Qianwen). This project allows users to generate AMIS schemas through natural language conversations, enabling rapid prototyping of web pages.

## Features

- **Conversational Schema Generation**: Describe your page requirements in natural language, and the AI generates corresponding AMIS schemas.
- **Real-time Rendering**: Instantly preview generated pages using AMIS rendering engine.
- **DashScope Integration**: Powered by Alibaba's Tongyi Qianwen model for intelligent schema generation.
- **Next.js Framework**: Modern React-based web application with server-side rendering.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/skylenDD/chm_copilot.git
   cd chm_copilot
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```
   DASHSCOPE_API_KEY=your_dashscope_api_key_here
   MODEL_NAME=qwen-plus  # Optional, defaults to qwen-plus
   ```

   Get your API key from [DashScope Console](https://dashscope.aliyun.com/).

## Usage

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

3. Enter your page requirements in the chat interface (e.g., "Create a login form with username and password fields").

4. The AI will generate an AMIS schema and render the page in real-time.

## API

### POST /api/genSchema

Generates AMIS schema based on user messages.

**Request Body:**
```json
{
  "messages": [
    {"role": "user", "content": "Create a contact form"}
  ],
  "schema": {} // Optional: base schema to update
}
```

**Response:**
```json
{
  "schema": {
    "type": "page",
    "body": [...]
  }
}
```

## Project Structure

```
├── app.js              # Main React application
├── pages/
│   ├── index.js        # Home page
│   └── api/
│       └── genSchema.js # API endpoint for schema generation
├── package.json        # Dependencies and scripts
└── .gitignore          # Git ignore rules
```

## Technologies Used

- **Next.js**: React framework for server-side rendering
- **AMIS**: Low-code UI framework by Alibaba
- **DashScope**: Alibaba's AI model platform
- **Tongyi Qianwen**: Large language model for schema generation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see LICENSE file for details.

---

# CHM Copilot - 低代码页面生成器

基于 Next.js、AMIS 和 DashScope（通义千问）构建的低代码页面生成器。本项目允许用户通过自然语言对话生成 AMIS schema，实现网页的快速原型设计。

## 功能特性

- **对话式 Schema 生成**：用自然语言描述页面需求，AI 生成对应的 AMIS schema。
- **实时渲染**：使用 AMIS 渲染引擎即时预览生成的页面。
- **DashScope 集成**：由阿里巴巴的通义千问模型提供智能 schema 生成能力。
- **Next.js 框架**：基于 React 的现代化 Web 应用，支持服务端渲染。

## 安装步骤

1. 克隆仓库：
   ```bash
   git clone https://github.com/skylenDD/chm_copilot.git
   cd chm_copilot
   ```

2. 安装依赖：
   ```bash
   npm install --legacy-peer-deps
   ```

3. 设置环境变量：
   在根目录创建 `.env.local` 文件：
   ```
   DASHSCOPE_API_KEY=你的_dashscope_api_key
   MODEL_NAME=qwen-plus  # 可选，默认 qwen-plus
   ```

   从 [DashScope 控制台](https://dashscope.aliyun.com/) 获取 API 密钥。

## 使用方法

1. 启动开发服务器：
   ```bash
   npm run dev
   ```

2. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

3. 在聊天界面输入页面需求（例如："创建一个包含用户名和密码字段的登录表单"）。

4. AI 将生成 AMIS schema 并实时渲染页面。

## API 接口

### POST /api/genSchema

基于用户消息生成 AMIS schema。

**请求体：**
```json
{
  "messages": [
    {"role": "user", "content": "创建一个联系表单"}
  ],
  "schema": {} // 可选：要更新的基础 schema
}
```

**响应：**
```json
{
  "schema": {
    "type": "page",
    "body": [...]
  }
}
```

## 项目结构

```
├── app.js              # 主 React 应用
├── pages/
│   ├── index.js        # 首页
│   └── api/
│       └── genSchema.js # Schema 生成 API 端点
├── package.json        # 依赖和脚本
└── .gitignore          # Git 忽略规则
```

## 使用的技术

- **Next.js**：React 框架，支持服务端渲染
- **AMIS**：阿里巴巴的低代码 UI 框架
- **DashScope**：阿里巴巴的 AI 模型平台
- **通义千问**：用于 schema 生成的大语言模型

## 贡献

1. Fork 本仓库
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 开启 Pull Request

## 许可证

MIT 许可证 - 详见 LICENSE 文件。