/* ============================================================
 * 展示格式化工具
 * ============================================================ */

/** ISO 时间 → 中文相对时间（刚刚 / N 小时前 / N 天前 / N 个月前 / N 年前） */
export function relativeTime(iso: string): string {
  const t = new Date(iso).getTime()
  if (!Number.isFinite(t)) return '—'
  const diff = Date.now() - t
  if (diff < 0) return '刚刚'
  const min = 60_000
  const hour = 60 * min
  const day = 24 * hour
  if (diff < hour) return '刚刚'
  if (diff < day) return `${Math.floor(diff / hour)} 小时前`
  if (diff < 30 * day) return `${Math.floor(diff / day)} 天前`
  if (diff < 365 * day) return `${Math.floor(diff / (30 * day))} 个月前`
  return `${Math.floor(diff / (365 * day))} 年前`
}

/** GitHub 的仓库体积单位是 KB */
export function humanSize(kb: number): string {
  if (!kb) return '—'
  if (kb < 1024) return `${kb} KB`
  const mb = kb / 1024
  if (mb < 1024) return `${mb.toFixed(mb < 10 ? 1 : 0)} MB`
  return `${(mb / 1024).toFixed(1)} GB`
}
