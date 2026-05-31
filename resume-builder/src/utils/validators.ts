// 表单验证工具函数

export interface ValidationResult {
  valid: boolean
  message?: string
}

// 验证邮箱
export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) {
    return { valid: false, message: '请输入邮箱地址' }
  }
  if (!emailRegex.test(email)) {
    return { valid: false, message: '请输入有效的邮箱地址' }
  }
  return { valid: true }
}

// 验证手机号
export function validatePhone(phone: string): ValidationResult {
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phone) {
    return { valid: false, message: '请输入手机号' }
  }
  if (!phoneRegex.test(phone)) {
    return { valid: false, message: '请输入有效的手机号' }
  }
  return { valid: true }
}

// 验证密码
export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { valid: false, message: '请输入密码' }
  }
  if (password.length < 6) {
    return { valid: false, message: '密码至少需要6位' }
  }
  if (password.length > 50) {
    return { valid: false, message: '密码不能超过50位' }
  }
  return { valid: true }
}

// 验证确认密码
export function validateConfirmPassword(password: string, confirmPassword: string): ValidationResult {
  if (!confirmPassword) {
    return { valid: false, message: '请确认密码' }
  }
  if (password !== confirmPassword) {
    return { valid: false, message: '两次输入的密码不一致' }
  }
  return { valid: true }
}

// 验证昵称
export function validateNickname(nickname: string): ValidationResult {
  if (!nickname) {
    return { valid: false, message: '请输入昵称' }
  }
  if (nickname.length < 2) {
    return { valid: false, message: '昵称至少需要2个字符' }
  }
  if (nickname.length > 20) {
    return { valid: false, message: '昵称不能超过20个字符' }
  }
  return { valid: true }
}

// 验证URL
export function validateUrl(url: string): ValidationResult {
  if (!url) {
    return { valid: true } // URL是可选的
  }
  try {
    new URL(url)
    return { valid: true }
  } catch {
    return { valid: false, message: '请输入有效的URL地址' }
  }
}

// 验证必填字段
export function validateRequired(value: any, fieldName: string): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { valid: false, message: `请输入${fieldName}` }
  }
  if (typeof value === 'string' && value.trim() === '') {
    return { valid: false, message: `请输入${fieldName}` }
  }
  if (Array.isArray(value) && value.length === 0) {
    return { valid: false, message: `请至少添加一个${fieldName}` }
  }
  return { valid: true }
}

// 验证日期范围
export function validateDateRange(start: string, end: string): ValidationResult {
  if (!start) {
    return { valid: false, message: '请选择开始时间' }
  }
  if (!end) {
    return { valid: false, message: '请选择结束时间' }
  }
  if (new Date(start) > new Date(end)) {
    return { valid: false, message: '开始时间不能晚于结束时间' }
  }
  return { valid: true }
}

// 验证简历内容
export function validateResumeContent(content: any): ValidationResult {
  const errors: string[] = []

  // 验证个人信息
  if (!content.personal?.name) {
    errors.push('请填写姓名')
  }
  if (!content.personal?.phone) {
    errors.push('请填写手机号')
  }
  if (!content.personal?.email) {
    errors.push('请填写邮箱')
  }

  // 验证至少有一个经历
  if (!content.education?.length && !content.experience?.length) {
    errors.push('请至少添加一段教育经历或工作经验')
  }

  if (errors.length > 0) {
    return { valid: false, message: errors.join('；') }
  }

  return { valid: true }
}

// 批量验证
export function validateAll(validations: ValidationResult[]): ValidationResult {
  const errors = validations.filter(v => !v.valid)
  if (errors.length > 0) {
    return {
      valid: false,
      message: errors.map(e => e.message).join('；'),
    }
  }
  return { valid: true }
}
