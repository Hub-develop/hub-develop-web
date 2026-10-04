/* ============================================================
 * 模板引擎 —— 让站点文案「可变量化」
 * ------------------------------------------------------------
 * 语法：{{ 变量路径 }} 或 {{ 变量路径 | 过滤器 }} 或 {{ 变量路径 | 过滤器:参数 }}
 *
 * 例：
 *   {{ site.name }}                          → Hub-develop
 *   {{ projects.count }}                     → 6
 *   {{ stacks.top | join:" · " }}            → C# · Python · Shell
 *   {{ stats.stars | k }}                    → 0
 *   {{ date.year }}                          → 2026
 *   {{ projects.names | join:", " }}         → MChub, CodeNet, ...
 *   {{ site.email | default:"(未设置)" }}     → (未设置)
 *
 * 可用变量清单见 src/content/vars.ts 的 buildVars()。
 * 未知变量渲染为空字符串（不会显示 undefined）。
 * ============================================================ */

export type Vars = Record<string, unknown>

/** 按点路径取值，如 "projects.count" */
function getPath(obj: unknown, path: string): unknown {
  return path
    .split('.')
    .map((s) => s.trim())
    .filter(Boolean)
    .reduce<unknown>((acc, key) => {
      if (acc === null || acc === undefined) return undefined
      if (Array.isArray(acc)) {
        const i = Number(key)
        return Number.isInteger(i) ? acc[i] : undefined
      }
      if (typeof acc === 'object') return (acc as Record<string, unknown>)[key]
      return undefined
    }, obj)
}

function toNum(v: unknown): number | null {
  const n = typeof v === 'number' ? v : Number(v)
  return Number.isFinite(n) ? n : null
}

/** 过滤器：{{ x | 名称:参数 }} */
const filters: Record<string, (v: unknown, arg?: string) => string> = {
  /** 数组拼接，默认逗号空格 */
  join: (v, arg) => (Array.isArray(v) ? v.join(arg ?? ', ') : String(v ?? '')),
  /** 千分位 */
  num: (v) => {
    const n = toNum(v)
    return n === null ? String(v ?? '') : n.toLocaleString('en-US')
  },
  /** 紧凑（1200 → 1.2k） */
  k: (v) => {
    const n = toNum(v)
    if (n === null) return String(v ?? '')
    if (Math.abs(n) < 1000) return String(n)
    return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`
  },
  upper: (v) => String(v ?? '').toUpperCase(),
  lower: (v) => String(v ?? '').toLowerCase(),
  /** 空值兜底 */
  default: (v, arg) =>
    v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)
      ? (arg ?? '')
      : String(v),
  /** 数组长度 */
  count: (v) => (Array.isArray(v) ? String(v.length) : String(v ?? '')),
  /** 补零（1 → 01） */
  pad2: (v) => String(v ?? '').padStart(2, '0'),
  /** 取数组前 n 项后用分隔符拼接 */
  take: (v, arg) => {
    const [nRaw, sep] = (arg ?? '3,').split(',')
    const n = Number(nRaw) || 3
    return Array.isArray(v) ? v.slice(0, n).join(sep || ', ') : String(v ?? '')
  },
}

function applyFilters(val: unknown, chain: string[]): unknown {
  let out = val
  for (const step of chain) {
    const [nameRaw, ...argParts] = step.split(':')
    const name = nameRaw.trim()
    const arg = argParts
      .join(':')
      .trim()
      .replace(/^["']|["']$/g, '')
    const fn = filters[name]
    out = fn ? fn(out, arg) : out
  }
  return out
}

/** 渲染一段模板字符串 */
export function render(tpl: string | undefined | null, vars: Vars): string {
  if (!tpl) return ''
  return tpl.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_m, expr: string) => {
    const [pathPart, ...chain] = expr.split('|')
    const val = applyFilters(getPath(vars, pathPart.trim()), chain.map((s) => s.trim()))
    if (val === undefined || val === null) return ''
    return String(val)
  })
}

/** 只在模板里确实引用了该变量时才返回值（用于 v-if 判断） */
export function hasVar(tpl: string | undefined | null): boolean {
  return !!tpl && /\{\{\s*[^}]+?\s*\}\}/.test(tpl)
}

/** 供「可用变量」面板使用：遍历变量上下文，输出扁平键列表 */
export function flattenVars(vars: Vars, prefix = ''): { path: string; value: string }[] {
  const out: { path: string; value: string }[] = []
  for (const [k, v] of Object.entries(vars)) {
    const path = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      out.push(...flattenVars(v as Vars, path))
    } else {
      out.push({ path, value: Array.isArray(v) ? v.join(', ') : String(v) })
    }
  }
  return out
}
