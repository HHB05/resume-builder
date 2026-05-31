// 简历相关类型定义

import type { User } from './user'

export interface Resume {
  id: string
  userId: string
  title: string
  templateId: string
  content: ResumeContent
  language: ResumeLanguage
  version: number
  parentId: string | null
  score: number | null
  isFavorite: boolean
  status: ResumeStatus
  createdAt: string
  updatedAt: string
}

export type ResumeLanguage = 'zh' | 'en' | 'ja'

export type ResumeStatus = 'draft' | 'published' | 'archived'

export interface ResumeContent {
  personal: PersonalInfo
  education: EducationEntry[]
  experience: ExperienceEntry[]
  projects: ProjectEntry[]
  skills: SkillEntry[]
  summary: string
  customSections?: CustomSection[]
}

export interface PersonalInfo {
  name: string
  phone: string
  email: string
  location: string
  title: string
  website?: string
  github?: string
  linkedin?: string
}

export interface EducationEntry {
  id: string
  school: string
  degree: string
  major: string
  period: DateRange
  gpa?: string
  description?: string
}

export interface ExperienceEntry {
  id: string
  company: string
  position: string
  period: DateRange
  description: string // rich text HTML
  highlights: string[]
}

export interface ProjectEntry {
  id: string
  name: string
  role: string
  period: DateRange
  description: string
  techStack: string[]
  highlights: string[]
}

export interface SkillEntry {
  id: string
  name: string
  level: SkillLevel
  category?: string
}

export type SkillLevel = 1 | 2 | 3 | 4 | 5

export interface DateRange {
  start: string
  end: string
}

export interface CustomSection {
  id: string
  title: string
  content: string
  order: number
}

export interface ResumeCreateParams {
  title: string
  templateId: string
  content?: Partial<ResumeContent>
}

export interface ResumeUpdateParams {
  title?: string
  templateId?: string
  content?: Partial<ResumeContent>
  status?: ResumeStatus
}

export interface ResumeListParams {
  page?: number
  pageSize?: number
  status?: ResumeStatus
  search?: string
  sortBy?: 'createdAt' | 'updatedAt' | 'title'
  sortOrder?: 'asc' | 'desc'
}

export interface ResumeVersion {
  id: string
  resumeId: string
  version: number
  content: ResumeContent
  createdAt: string
}

// 简历模块类型
export type ResumeModuleType =
  | 'personal'
  | 'education'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'summary'

export interface ResumeModule {
  id: ResumeModuleType
  title: string
  icon: string
  order: number
  visible: boolean
}
