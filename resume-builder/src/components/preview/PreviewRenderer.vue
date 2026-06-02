<template>
  <div class="bg-white shadow-lg" :style="pageStyle">
    <GenericTemplate
      :content="content"
      :config="templateConfig"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ResumeContent } from '@/types'
import GenericTemplate from './templates/GenericTemplate.vue'
import { templates } from '@/data/templates'

const props = defineProps<{
  content: ResumeContent
  templateId: string
  previewMode: 'pc' | 'tablet' | 'mobile'
}>()

// 从模板数据中获取配置
const templateConfig = computed(() => {
  const template = templates.find(t => t.id === props.templateId)
  if (template) {
    return template.config
  }
  // 默认配置
  return {
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    fontFamily: { heading: 'Noto Sans SC', body: 'Noto Sans SC' },
    fontSize: { title: 24, heading: 18, subheading: 14, body: 12, small: 10 },
    spacing: { sectionGap: 16, itemGap: 8, lineHeight: 1.5, padding: 20 },
    layout: 'single-column',
    headerStyle: 'left',
    sectionTitleStyle: 'underline',
  }
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
