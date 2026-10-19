# MChub 项目长期记忆

## 组织 / 仓库归属（重要，易踩坑）
- MChub 仓库当前归属组织 **Hub-code-develop**（GitHub login 即此，显示名 "Hub.code"）。
- 旧名 `hub-code-develop`（小写）与 `CodeHub-develop` 现在都只是**重定向**到 `Hub-code-develop`；
  `CodeHub-develop` 作为 org 已不存在（gh api orgs/CodeHub-develop → 404）。
- 所有指向 MChub 仓库的链接（官网下载、社交、页脚、构建工具）应写 `Hub-code-develop/MChub`，
  不要写 `hub-code-develop` 或 `CodeHub-develop`（会靠重定向，且大小写/归属不对）。
- 本地 git remote 仍是 `https://github.com/hub-code-develop/MChub.git`（重定向可用，但可择机改规范名）。
- 官网域名：`mchub.code.hub-develop.top`（CNAME 在 `MChub.Web/wwwroot/CNAME`）。

## 官网技术栈与部署
- 官网源码：`MChub/MChub.Web/site-src`（Vite + 原生 JS + Vue 3，多语言 i18n 用 `LOCALES` 注册表 + `t()` + `useLocale.js`，支持 zh/en/ja/ko/zht 五语）。
- 构建：`npm run build` → `dist/`；同步 `rsync -a --delete --exclude=CNAME dist/ MChub.Web/wwwroot/`。
- 部署：push 到 main 触发 `.github/workflows/publish-website.yml`（发布官网），把 wwwroot 部署到 GitHub Pages。
- 站点配置集中在 `MChub.Web/site-src/src/data/site.js`（GITHUB_REPO 等常量、平台、文案）。
- 冒烟测试 `npm run smoke` 用 SSR 渲染，默认 locale=en，故中文文案检查会 ✗，属预期，不影响线上。

## npm 依赖安全修复 / Dependabot
- 修复传递依赖漏洞的标准做法：在 `site-src/package.json` 加 `overrides: { "包名": "安全版本" }`，再 `npm install` 刷新 lock；不要把它加进 `dependencies`（它是传递依赖）。
- 例：CVE-2026-93749 / GHSA-68fv-2mgg-jv7q（source-map-js <1.2.2，high，事件循环 DoS）→ override 钉 1.2.2；该包是 postcss 的构建期依赖，不进线上静态产物。
- 推送前可在 `site-src` 跑 `npm audit` 验证 0 vulnerabilities。

## 推送 gotcha（本机 git / npm 访问 GitHub）
- 本机 `HTTP_PROXY/HTTPS_PROXY` 指向 127.0.0.1:7892（Clash），上游断开时 `git push` / `npm install` / `curl` 会 502 或被沙箱 kill。
  临时解决：`env -u HTTP_PROXY -u HTTPS_PROXY -u http_proxy -u https_proxy <命令>`（`gh` 本身不受影响，能直连）。
- 远端 main 可能被网页端改动（如 README 编辑）抢先提交，导致本地 push 被拒（fetch first）。
  处理：先把桌面端未暂存改动 `git stash push -u`，再 `git pull --rebase origin main`，然后 `git stash pop` 还原（桌面端 WIP 切勿误提交）。
- Dependabot alert 在 push 修复提交后由 GitHub 后台重扫自动转 `fixed`，通常 1~2 分钟内生效。

## 字体
- 官网与桌面端统一用阿里妈妈方圆体 `AlimamaFangYuanTi`（woff2 在 `site-src/public/fonts/`）。
