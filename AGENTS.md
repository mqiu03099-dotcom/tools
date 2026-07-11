# Repository Guidelines

## 项目结构与模块组织
本仓库是一个微信小程序项目。应用级文件位于根目录，包括 `app.js`、`app.json`、`app.wxss`、`project.config.json` 和 `sitemap.json`。页面代码位于 `pages/`，当前主要页面为 `pages/index/`，按 `index.js`、`index.wxml`、`index.wxss`、`index.json` 拆分。共享逻辑放在 `utils/`，例如 `utils/page-loading-state.js`。静态图片资源统一放在 `assets/`。

## 构建、测试与开发命令
本仓库没有 `package.json`，也没有 CLI 构建流水线。请使用微信开发者工具打开项目根目录并本地运行。

```powershell
# 在微信开发者工具中打开项目目录
D:\giteeContent\milk-frog
```

需要格式化时使用 Prettier：

```powershell
npx prettier --write .
```

## 代码风格与命名规范
遵循现有 Prettier 配置：2 空格缩进、分号、双引号、尾随逗号、100 字符换行和 CRLF 行尾。页面状态字段与事件处理函数使用语义清晰的 camelCase 命名，例如 `isPageLoadingVisible`、`handleVideoPause`。可复用业务逻辑放入 `utils/`，页面文件主要负责生命周期、交互事件和 `setData()` 更新。

## 测试指南
当前项目没有维护自动化测试。涉及 UI 或交互行为的修改时，请在微信开发者工具中手动验证，并在 PR 中说明已检查的场景。

## 提交与合并请求规范
近期提交历史采用简短的 Conventional Commit 风格，例如 `feat: 更新链接`、`feat: 奶呱V1`。后续继续使用 `feat:`、`fix:`、`chore:` 等前缀，并配合简洁摘要。PR 需要说明用户可见变更、列出受影响文件或页面、关联 issue；若涉及 `wxml` 或 `wxss` 调整，附上截图或简短录屏。

## 配置说明
不要提交仅对本地 IDE 或模拟器生效的配置变更，除非这类修改本身就是预期内容。将 `project.private.config.json` 视为开发者本地配置文件，避免在源码中写入敏感应用信息或环境数据。
