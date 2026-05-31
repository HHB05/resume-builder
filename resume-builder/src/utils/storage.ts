// 本地存储工具函数

const PREFIX = 'resume_builder_'

// 设置存储
export function setStorage<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(PREFIX + key, serializedValue)
  } catch (error) {
    console.error('Failed to set storage:', error)
  }
}

// 获取存储
export function getStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(PREFIX + key)
    if (item === null) {
      return defaultValue
    }
    return JSON.parse(item) as T
  } catch (error) {
    console.error('Failed to get storage:', error)
    return defaultValue
  }
}

// 删除存储
export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch (error) {
    console.error('Failed to remove storage:', error)
  }
}

// 清空存储
export function clearStorage(): void {
  try {
    // 只清除我们的存储，保留其他应用的存储
    const keys = Object.keys(localStorage)
    keys.forEach((key) => {
      if (key.startsWith(PREFIX)) {
        localStorage.removeItem(key)
      }
    })
  } catch (error) {
    console.error('Failed to clear storage:', error)
  }
}

// 检查存储是否存在
export function hasStorage(key: string): boolean {
  return localStorage.getItem(PREFIX + key) !== null
}

// 获取存储大小（字节）
export function getStorageSize(): number {
  let totalSize = 0
  const keys = Object.keys(localStorage)

  keys.forEach((key) => {
    if (key.startsWith(PREFIX)) {
      const value = localStorage.getItem(key)
      if (value) {
        totalSize += key.length + value.length
      }
    }
  })

  return totalSize * 2 // UTF-16编码，每个字符2字节
}

// Session Storage 方法
export function setSessionStorage<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value)
    sessionStorage.setItem(PREFIX + key, serializedValue)
  } catch (error) {
    console.error('Failed to set session storage:', error)
  }
}

export function getSessionStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = sessionStorage.getItem(PREFIX + key)
    if (item === null) {
      return defaultValue
    }
    return JSON.parse(item) as T
  } catch (error) {
    console.error('Failed to get session storage:', error)
    return defaultValue
  }
}

export function removeSessionStorage(key: string): void {
  try {
    sessionStorage.removeItem(PREFIX + key)
  } catch (error) {
    console.error('Failed to remove session storage:', error)
  }
}
