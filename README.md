# Hub-develop · 组织官网

Hub-develop 是 **CodeHub 的上游开源组织**的官方站点，使用 **Vue 3 + Vite + TypeScript + vue-router** 构建。

> 在线地址：https://Hub-develop.github.io/hub-develop-web/

## 特点

- **多页面路由**：首页 / 项目列表 / 项目详情 / 关于 / 联系 / 404，按页懒加载。
- **内容与代码分离**：全站所有文案集中在 `src/content/`，改内容不用碰组件。
- **页脚高级效果**：参考 tiouo.cc 的深色网格 + 极光渐变 + 超大白色字标。
- **纯手写 CSS**：无 UI 框架，设计 token 集中在 `src/style.css`。
- **响应式**：桌面侧边导航 / 移动端汉堡菜单，滚动入场动效。

## 本地开发

```bash
npm install
npm run dev        # 本地开发 http://localhost:5173/hub-develop-web/
npm run build      # 构建到 dist/
npm run preview    # 预览构建产物
npm run type-check # vue-tsc 类型检查
```

## 目录结构

```
src/
├── content/
│   ├── site.ts        # ★ 全站内容总配置（品牌/导航/Hero/关于/联系/页脚/SEO）
│   └── projects.ts    # ★ 项目数据（卡片 + 详情页；新增项目 = 加一个对象）
├── router/index.ts    # 路由表（含 GitHub Pages 深链接处理）
├── pages/             # HomePage / ProjectsPage / ProjectDetailPage / AboutPage / ContactPage / NotFoundPage
├── components/        # NavBar / Hero / ProjectCard / Footer / BackToTop
├── utils/rich.ts      # 文案 **强调** → <strong>
├── App.vue            # 全局布局：NavBar + RouterView + Footer + BackToTop
├── main.ts            # 应用入口 + v-reveal 指令
└── style.css          # 全局设计系统
```

## 怎么改内容

- **改文案 / 导航 / 页脚 / 联系方式** → 只改 `src/content/site.ts`。
- **加一个项目** → 往 `src/content/projects.ts` 的 `projects` 数组里加一个对象，
  首页卡片、`/projects` 列表、`/projects/<slug>` 详情页会自动出现。
  - `featured: true` 的项目会出现在首页「精选项目」。
  - `status` 只支持 `active` / `maintained` / `beta`（文案见 `statusMeta`）。

## 部署

站点通过 `gh-pages` 分支 + GitHub Pages 发布（不使用 Actions）：

- `vite.config.ts` 中 `base = '/hub-develop-web/'`，保证子路径资源正确。
- 构建产物 `dist/` 推送到 `gh-pages` 分支，Pages 源设为该分支 `/root`。
- `public/404.html` 负责 SPA 深链接回退：直接访问 `/projects/mchub` 也能正常打开。

更新流程：改内容 → `npm run build` → 把 `dist/` 推到 `gh-pages`。
