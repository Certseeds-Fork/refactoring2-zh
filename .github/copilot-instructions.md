# Copilot Instructions for refactoring2-zh

## 项目概述

这是《重构：改善既有代码的设计》第二版的中文翻译项目，使用 VitePress 构建静态文档站点，部署于 GitHub Pages。

## 技术栈

- **文档框架**: VitePress 1.6+
- **包管理器**: pnpm (必须使用 pnpm，不要使用 npm 或 yarn)
- **Node.js**: 22.x
- **Markdown 扩展**: markdown-it-footnote（支持脚注语法 `[^name]`）

## 项目结构

```
docs/           # 所有章节的 Markdown 文件
  ch1.md - ch12.md  # 第 1-12 章内容
  figures/      # 图片资源
  ch1/          # 第 1 章的代码示例 (JavaScript)
.vitepress/
  config.mts    # VitePress 配置（TypeScript）
```

## 开发命令

```bash
pnpm install        # 安装依赖
pnpm docs:dev       # 本地开发服务器 (http://localhost:5173/refactoring2-zh/)
pnpm docs:build     # 构建静态站点
pnpm docs:preview   # 预览构建结果
```

## 内容编写规范

### Markdown 格式

- 使用 VitePress 的 `:::tip` 语法块表示提示信息
- 代码块需指定语言：`js`, `json`, `bash`, `typescript` 等
- 脚注使用 `[^name]` 语法，在文档末尾定义 `[^name]: 说明文字`
- 章节标题格式：`# 第 X 章 章节名称`

### 代码示例风格

书中代码示例遵循以下约定（来自原书）：
- 函数返回值变量命名为 `result`
- 使用不定冠词前缀表示类型：`aPerformance`, `aNumber`
- 使用 `#### function xxx...` 或 `#### 顶层作用域...` 标注代码上下文

## 部署配置

- 基础路径: `/refactoring2-zh/`
- 自动部署: 推送到 `master` 分支触发 GitHub Actions 构建和部署
- 站点 URL: https://certseeds-fork.github.io/refactoring2-zh/

## VitePress 配置要点

配置文件 `.vitepress/config.mts` 中：
- `base: '/refactoring2-zh/'` - 子目录部署必须设置
- 侧边栏在 `themeConfig.sidebar` 中定义
- 使用 `markdown.config` 注册 markdown-it 插件

## 翻译术语一致性

保持与原书中文版一致的术语翻译，关键术语包括：
- Extract Function → 提炼函数
- Inline Variable → 内联变量  
- Move Function → 搬移函数
- Replace Conditional with Polymorphism → 以多态取代条件表达式
