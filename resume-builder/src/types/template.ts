// 模板相关类型定义

export interface Template {
  id: string
  name: string
  category: TemplateCategory
  style: TemplateStyle
  thumbnailUrl: string
  previewUrls: string[]
  config: TemplateConfig
  isPremium: boolean
  downloadCount: number
  rating: number
  ratingCount: number
  authorId: string | null
  status: TemplateStatus
  createdAt: string
  updatedAt: string
}

export type TemplateCategory =
  | 'tech'
  | 'finance'
  | 'education'
  | 'design'
  | 'medical'
  | 'general'
  | 'marketing'
  | 'legal'

export type TemplateStyle = 'minimal' | 'business' | 'creative' | 'classic'

export type TemplateStatus = 0 | 1 | 2 // 0=draft, 1=published, 2=rejected

export interface TemplateConfig {
  primaryColor: string
  secondaryColor: string
  fontFamily: TemplateFontFamily
  fontSize: TemplateFontSize
  spacing: TemplateSpacing
  layout: TemplateLayout
  headerStyle: TemplateHeaderStyle
  sectionTitleStyle: TemplateSectionTitleStyle
}

export interface TemplateFontFamily {
  heading: string
  body: string
}

export interface TemplateFontSize {
  title: number
  heading: number
  subheading: number
  body: number
  small: number
}

export interface TemplateSpacing {
  sectionGap: number
  itemGap: number
  lineHeight: number
  padding: number
}

export type TemplateLayout = 'single-column' | 'two-column'

export type TemplateHeaderStyle = 'left' | 'center' | 'right'

export type TemplateSectionTitleStyle = 'underline' | 'background' | 'border-left' | 'border-bottom'

export interface TemplateFilter {
  category?: TemplateCategory
  style?: TemplateStyle
  color?: string
  search?: string
  isPremium?: boolean
}

export interface TemplateRateParams {
  score: number
  comment?: string
}

// 预设颜色主题
export interface ColorTheme {
  id: string
  name: string
  primary: string
  secondary: string
  accent: string
}

export const COLOR_THEMES: ColorTheme[] = [
  { id: 'blue', name: '经典蓝', primary: '#2563eb', secondary: '#1e40af', accent: '#3b82f6' },
  { id: 'green', name: '自然绿', primary: '#16a34a', secondary: '#15803d', accent: '#22c55e' },
  { id: 'purple', name: '优雅紫', primary: '#9333ea', secondary: '#7e22ce', accent: '#a855f7' },
  { id: 'red', name: '热情红', primary: '#dc2626', secondary: '#b91c1c', accent: '#ef4444' },
  { id: 'orange', name: '活力橙', primary: '#ea580c', secondary: '#c2410c', accent: '#f97316' },
  { id: 'teal', name: '清新青', primary: '#0d9488', secondary: '#0f766e', accent: '#14b8a6' },
  { id: 'indigo', name: '深邃靛', primary: '#4f46e5', secondary: '#4338ca', accent: '#6366f1' },
  { id: 'pink', name: '浪漫粉', primary: '#db2777', secondary: '#be185d', accent: '#ec4899' },
  { id: 'gray', name: '简约灰', primary: '#374151', secondary: '#1f2937', accent: '#6b7280' },
  { id: 'black', name: '商务黑', primary: '#000000', secondary: '#1a1a1a', accent: '#333333' },
]
