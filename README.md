# Hub-develop · 组织官网首页

Hub-develop 是 **CodeHub 的上游开源组织**的官方站点，使用 **Vue 3 + Vite + TypeScript** 构建。

> 在线地址：https://Hub-develop.github.io/hub-develop-web/

## 技术栈

- [Vue 3](https://vuejs.org/)（`<script setup>` + TS）
- [Vite 6](https://vitejs.dev/) 构建
- 纯手写 CSS（无 UI 框架，轻量、可控）
- 部署：GitHub Pages（项目站点，base = `/hub-develop-web/`）

## 本地开发

```bash
npm install
npm run dev        # 本地预览 http://localhost:5173
npm run build      # 产物输出到 dist/
npm run preview    # 预览构建产物
```

## 目录结构

```
src/
├── components/      # NavBar / Hero / About / Projects / Footer
├── data/
│   └── projects.ts  # 项目矩阵数据（改这里即可更新卡片）
├── App.vue          # 页面组装
├── main.ts
└── style.css        # 全局样式与主题变量
```

## 部署说明

站点通过 `gh-pages` 分支 + GitHub Pages 发布：

- `base` 已在 `vite.config.ts` 中设为 `/hub-develop-web/`，保证子路径资源正确加载；
- 构建产物 `dist/` 推送到 `gh-pages` 分支，Pages 源设为该分支的 `/root`。

如需更新站点内容：改代码 → `npm run build` → 将 `dist/` 推到 `gh-pages`。
