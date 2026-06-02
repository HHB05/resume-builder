<template>
  <div class="min-h-full" :style="{ fontFamily: config.fontFamily?.body || 'Noto Sans SC, sans-serif' }">
    <!-- 根据不同模板样式渲染 -->
    <component :is="layoutComponent" :content="content" :config="config" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import DefaultLayout from './layouts/DefaultLayout.vue'
import TwoColumnLayout from './layouts/TwoColumnLayout.vue'
import CenterHeaderLayout from './layouts/CenterHeaderLayout.vue'
import GradientHeaderLayout from './layouts/GradientHeaderLayout.vue'

const props = defineProps<{
  content: any
  config: any
}>()

// 根据模板配置选择布局
const layoutComponent = computed(() => {
  if (props.config.layout === 'two-column') {
    return TwoColumnLayout
  }
  if (props.config.headerStyle === 'center') {
    return CenterHeaderLayout
  }
  if (props.config.sectionTitleStyle === 'background') {
    return GradientHeaderLayout
  }
  return DefaultLayout
})
</script>
