/* ============================================================
 * 模板变量上下文
 * ------------------------------------------------------------
 * 站点里任何一段文案（尤其是 Hero 的终端输出）都能写成
 * {{ 变量 | 过滤器 }}，渲染时用这里的上下文求值。
 *
 * 可用变量（节选）：
 *   {{ site.brand.name }}            组织名            Hub-develop
 *   {{ totals.repos }}               收录仓库数         6
 *   {{ totals.stacks }}              技术栈项数         34
 *   {{ totals.tags }}                标签数             9
 *   {{ totals.stars | k }}           star 数（紧凑）    0
 *   {{ stacks.top | take:"4, · " }}  前 4 项技术栈      C# · Python · Shell · IL Assembly
 *   {{ tags.top | take:"6, " }}      前 6 个标签        Hub, Hub.ai, Hub.code, C, C#, C++
 *   {{ projects.count }}             项目数
 *   {{ projects.names | take:"3, " }} 前 3 个项目名
 *   {{ date.year }}                  当前年份           2026
 *
 * 过滤器见 src/utils/template.ts：join / num / k / upper / lower /
 * default / count / pad2 / take。
 * 未知变量渲染为空字符串，不会出现 undefined。
 * ============================================================ */

import { site } from './site'
import { githubSnapshot } from './github'
import { projects, featuredProjects } from './projects'
import type { Vars } from '@/utils/template'

export function buildVars(): Vars {
  const g = githubSnapshot()
  const stacksTop = g.stacks.map((s) => s.name)
  const tagsTop = g.tags.map((t) => t.name)

  return {
    /** 整个站点配置，可写 {{ site.xxx }} */
    site,
    /** 品牌快捷方式 */
    brand: site.brand,
    /** GitHub 汇总（repos / stars / forks / openIssues / stacks / tags / orgs / size） */
    totals: g.totals,
    /** totals 的别名，兼容 {{ stats.repos }} 写法 */
    stats: g.totals,
    /** 关联组织 */
    orgs: g.orgs.map((o) => ({
      label: o.label,
      display: o.display,
      login: o.login,
      url: o.url,
      role: o.role,
      repos: o.publicRepos,
    })),
    /** 技术栈：top = 名称数组，list = 完整对象数组 */
    stacks: {
      top: stacksTop,
      list: g.stacks,
    },
    /** 标签：top = 名称数组，list = 完整对象数组 */
    tags: {
      top: tagsTop,
      list: g.tags,
    },
    /** 项目 */
    projects: {
      count: projects.length,
      names: projects.map((p) => p.name),
      slugs: projects.map((p) => p.slug),
      featured: featuredProjects.map((p) => p.name),
      list: projects,
    },
    /** 时间 */
    date: {
      year: new Date().getFullYear(),
      now: new Date().toISOString(),
    },
    /** 同步信息 */
    sync: {
      at: g.syncedAt,
      source: g.tokenSource,
    },
  }
}
