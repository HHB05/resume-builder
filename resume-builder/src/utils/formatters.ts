// 格式化工具函数

// 格式化日期
export function formatDate(date: string | Date, format: 'full' | 'short' | 'relative' = 'full'): string {
  const d = new Date(date)

  if (format === 'relative') {
    return formatRelativeTime(d)
  }

  if (format === 'short') {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  }

  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

// 格式化相对时间
function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return '刚刚'
  } else if (minutes < 60) {
    return `${minutes}分钟前`
  } else if (hours < 24) {
    return `${hours}小时前`
  } else if (days < 7) {
    return `${days}天前`
  } else if (days < 30) {
    return `${Math.floor(days / 7)}周前`
  } else if (days < 365) {
    return `${Math.floor(days / 30)}个月前`
  } else {
    return `${Math.floor(days / 365)}年前`
  }
}

// 格式化日期范围
export function formatDateRange(start: string, end: string): string {
  if (!start || !end) return ''

  const startDate = new Date(start)
  const endDate = new Date(end)

  const startStr = `${startDate.getFullYear()}.${String(startDate.getMonth() + 1).padStart(2, '0')}`
  const endStr = `${endDate.getFullYear()}.${String(endDate.getMonth() + 1).padStart(2, '0')}`

  return `${startStr} - ${endStr}`
}

// 格式化文件大小
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 格式化数字
export function formatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

// 格式化百分比
export function formatPercentage(value: number, decimals = 0): string {
  return `${value.toFixed(decimals)}%`
}

// 格式化分数
export function formatScore(score: number): string {
  if (score >= 80) return '优秀'
  if (score >= 60) return '良好'
  if (score >= 40) return '一般'
  return '需改进'
}

// 格式化技能等级
export function formatSkillLevel(level: number): string {
  const levels: Record<number, string> = {
    1: '了解',
    2: '熟悉',
    3: '掌握',
    4: '精通',
    5: '专家',
  }
  return levels[level] || '未知'
}

// 截断文本
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// 高亮搜索关键词
export function highlightText(text: string, keyword: string): string {
  if (!keyword) return text
  const regex = new RegExp(keyword, 'gi')
  return text.replace(regex, '<mark>$&</mark>')
}

// 生成随机ID
export function generateId(prefix = ''): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2)
  return prefix ? `${prefix}-${timestamp}${random}` : `${timestamp}${random}`
}

// 深拷贝
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

// 节流函数
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false

  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}
