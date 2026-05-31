import { post, get, streamRequest } from './api'
import type {
  AiPolishResponse,
  AiScoreResult,
  AiMatchResult,
  AiGenerateResponse,
  AiTranslateResponse,
  AiUsageInfo,
  AiKeyword,
} from '@/types'

export const aiService = {
  // 文本润色
  async polishText(
    resumeId: string,
    section: string,
    text: string,
    targetRole: string,
    options: { style: 'professional' | 'concise' | 'detailed'; language: 'zh' | 'en' },
    onChunk?: (chunk: string) => void
  ): Promise<AiPolishResponse> {
    if (onChunk) {
      // 流式请求
      let fullContent = ''
      await streamRequest(
        '/ai/polish',
        { resumeId, section, text, targetRole, options },
        (chunk) => {
          fullContent += chunk
          onChunk(chunk)
        }
      )
      return {
        originalText: text,
        polishedText: fullContent,
        suggestions: [],
        tokensUsed: 0,
      }
    }

    // 普通请求
    return post<AiPolishResponse>('/ai/polish', {
      resumeId,
      section,
      text,
      targetRole,
      options,
    })
  },

  // 简历评分
  async scoreResume(resumeId: string): Promise<AiScoreResult> {
    return post<AiScoreResult>('/ai/score', { resumeId })
  },

  // 职位匹配
  async matchJob(resumeId: string, jobDescription: string): Promise<AiMatchResult> {
    return post<AiMatchResult>('/ai/match', { resumeId, jobDescription })
  },

  // 生成内容
  async generateContent(
    type: 'summary' | 'experience' | 'project' | 'skills' | 'highlight',
    context: string,
    prompt?: string,
    onChunk?: (chunk: string) => void
  ): Promise<AiGenerateResponse> {
    if (onChunk) {
      // 流式请求
      let fullContent = ''
      await streamRequest(
        '/ai/generate',
        { type, context, prompt },
        (chunk) => {
          fullContent += chunk
          onChunk(chunk)
        }
      )
      return {
        content: fullContent,
        tokensUsed: 0,
      }
    }

    // 普通请求
    return post<AiGenerateResponse>('/ai/generate', { type, context, prompt })
  },

  // 翻译文本
  async translateText(
    text: string,
    targetLang: 'zh' | 'en' | 'ja',
    onChunk?: (chunk: string) => void
  ): Promise<AiTranslateResponse> {
    if (onChunk) {
      // 流式请求
      let fullContent = ''
      await streamRequest(
        '/ai/translate',
        { text, targetLang },
        (chunk) => {
          fullContent += chunk
          onChunk(chunk)
        }
      )
      return {
        translatedText: fullContent,
        tokensUsed: 0,
      }
    }

    // 普通请求
    return post<AiTranslateResponse>('/ai/translate', { text, targetLang })
  },

  // 获取关键词
  async getKeywords(
    resumeId: string,
    jobDescription?: string
  ): Promise<AiKeyword[]> {
    return post<AiKeyword[]>('/ai/keywords', { resumeId, jobDescription })
  },

  // 获取使用量
  async getUsage(): Promise<AiUsageInfo> {
    return get<AiUsageInfo>('/ai/usage')
  },

  // 获取AI历史记录
  async getHistory(page?: number, pageSize?: number): Promise<any[]> {
    return get('/ai/history', { page, pageSize })
  },
}
