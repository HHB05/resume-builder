<template>
  <div class="bg-white shadow-lg" :style="pageStyle">
    <component
      :is="currentTemplate"
      :content="content"
      :config="templateConfig"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ResumeContent } from '@/types'
import {
  MinimalTemplate,
  ModernTemplate,
  ProfessionalTemplate,
  CreativeTemplate,
  BusinessTemplate,
  SimpleTemplate,
  TwoColumnTemplate,
} from './templates'

const props = defineProps<{
  content: ResumeContent
  templateId: string
  previewMode: 'pc' | 'tablet' | 'mobile'
}>()

const templateMap: Record<string, any> = {
  minimal: MinimalTemplate,
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  creative: CreativeTemplate,
  business: BusinessTemplate,
  simple: SimpleTemplate,
  twoColumn: TwoColumnTemplate,
}

const currentTemplate = computed(() => {
  return templateMap[props.templateId] || MinimalTemplate
})

const templateConfig = computed(() => {
  const configs: Record<string, any> = {
    minimal: {
      primaryColor: '#2563eb',
      secondaryColor: '#1e40af',
      fontFamily: { heading: 'Inter', body: 'Inter' },
    },
    modern: {
      primaryColor: '#0f172a',
      secondaryColor: '#334155',
      fontFamily: { heading: 'Inter', body: 'Inter' },
    },
    professional: {
      primaryColor: '#1e40af',
      secondaryColor: '#3b82f6',
      fontFamily: { heading: 'Noto Sans SC', body: 'Noto Sans SC' },
    },
    creative: {
      primaryColor: '#7c3aed',
      secondaryColor: '#a78bfa',
      fontFamily: { heading: 'Inter', body: 'Inter' },
    },
    business: {
      primaryColor: '#0f172a',
      secondaryColor: '#475569',
      fontFamily: { heading: 'Noto Sans SC', body: 'Noto Sans SC' },
    },
    simple: {
      primaryColor: '#374151',
      secondaryColor: '#6b7280',
      fontFamily: { heading: 'Inter', body: 'Inter' },
    },
    twoColumn: {
      primaryColor: '#0d9488',
      secondaryColor: '#14b8a6',
      fontFamily: { heading: 'Inter', body: 'Inter' },
    },
  }
  return configs[props.templateId] || configs.minimal
})

const pageStyle = computed(() => {
  const widths: Record<string, string> = {
    pc: '210mm',
    tablet: '190mm',
    mobile: '170mm',
  }
  return {
    width: widths[props.previewMode],
    minHeight: '297mm',
  }
})
</script>
