// AI相关类型定义

export interface AiPolishRequest {
  resumeId: string
  section: string
  text: string
  targetRole: string
  options: AiPolishOptions
}

export interface AiPolishOptions {
  style: AiPolishStyle
  language: 'zh' | 'en'
}

export type AiPolishStyle = 'professional' | 'concise' | 'detailed'

export interface AiPolishResponse {
  originalText: string
  polishedText: string
  suggestions: AiSuggestion[]
  tokensUsed: number
}

export interface AiSuggestion {
  id: string
  type: AiSuggestionType
  original: string
  suggested: string
  reason: string
  priority: AiPriority
}

export type AiSuggestionType =
  | 'verb'
  | 'quantify'
  | 'redundancy'
  | 'grammar'
  | 'keyword'
  | 'style'
  | 'clarity'

export type AiPriority = 'high' | 'medium' | 'low'

export interface AiScoreRequest {
  resumeId: string
}

export interface AiScoreResult {
  overallScore: number
  dimensions: AiScoreDimensions
  issues: AiIssue[]
  industryComparison: IndustryComparison[]
}

export interface AiScoreDimensions {
  completeness: number
  professionalism: number
  quantification: number
  layout: number
  keywords: number
}

export interface AiIssue {
  id: string
  type: AiIssueType
  severity: 'error' | 'warning' | 'info'
  message: string
  section: string
  suggestion: string
}

export type AiIssueType =
  | 'missing-section'
  | 'too-short'
  | 'too-long'
  | 'no-quantify'
  | 'passive-voice'
  | 'jargon'
  | 'formatting'

export interface IndustryComparison {
  dimension: string
  userScore: number
  average: number
}

export interface AiMatchRequest {
  resumeId: string
  jobDescription: string
}

export interface AiMatchResult {
  matchScore: number
  jobRequirements: string[]
  matchedRequirements: string[]
  missingRequirements: string[]
  suggestions: AiSuggestion[]
}

export interface AiGenerateRequest {
  type: AiGenerateType
  context: string
  prompt?: string
}

export type AiGenerateType =
  | 'summary'
  | 'experience'
  | 'project'
  | 'skills'
  | 'highlight'

export interface AiGenerateResponse {
  content: string
  tokensUsed: number
}

export interface AiTranslateRequest {
  text: string
  targetLang: 'zh' | 'en' | 'ja'
}

export interface AiTranslateResponse {
  translatedText: string
  tokensUsed: number
}

export interface AiChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  type?: AiMessageType
}

export type AiMessageType =
  | 'text'
  | 'polish'
  | 'score'
  | 'match'
  | 'generate'
  | 'translate'

export interface AiUsageInfo {
  used: number
  limit: number
  resetAt: string
}

export interface AiKeywordRequest {
  resumeId: string
  jobDescription?: string
}

export interface AiKeyword {
  keyword: string
  importance: 'high' | 'medium' | 'low'
  found: boolean
}
