<template>
  <div
    :class="[
      'relative rounded-lg border-2 cursor-pointer transition-all overflow-hidden',
      selected
        ? 'border-primary-500 ring-2 ring-primary-200'
        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
    ]"
    @click="$emit('select', template)"
  >
    <!-- Template preview -->
    <div class="aspect-[3/4] bg-gray-100 relative">
      <div
        class="w-full h-full p-3"
        :style="{ backgroundColor: template.config.primaryColor + '08' }"
      >
        <!-- Header -->
        <div
          class="w-full h-1/5 rounded mb-2"
          :style="{ backgroundColor: template.config.primaryColor }"
        ></div>

        <!-- Content -->
        <div class="space-y-2">
          <div class="w-3/4 h-1.5 bg-gray-300 rounded"></div>
          <div class="w-1/2 h-1.5 bg-gray-300 rounded"></div>
          <div class="mt-3 space-y-1">
            <div class="w-full h-1 bg-gray-200 rounded"></div>
            <div class="w-5/6 h-1 bg-gray-200 rounded"></div>
            <div class="w-4/6 h-1 bg-gray-200 rounded"></div>
          </div>
          <div class="mt-3 space-y-1">
            <div class="w-full h-1 bg-gray-200 rounded"></div>
            <div class="w-3/4 h-1 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <!-- Premium badge -->
      <div
        v-if="template.isPremium"
        class="absolute top-2 right-2 px-2 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-medium rounded"
      >
        PRO
      </div>

      <!-- Hover overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity flex items-center justify-center">
        <span class="opacity-0 hover:opacity-100 text-white font-medium transition-opacity">预览模板</span>
      </div>
    </div>

    <!-- Template info -->
    <div class="p-3 bg-white">
      <h4 class="font-medium text-gray-900 text-sm">{{ template.name }}</h4>
      <div class="flex items-center justify-between mt-2">
        <div class="flex items-center">
          <div class="flex items-center">
            <svg
              v-for="i in 5"
              :key="i"
              :class="[
                'w-3 h-3',
                i <= Math.round(template.rating) ? 'text-yellow-400' : 'text-gray-300'
              ]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span class="text-xs text-gray-500 ml-1">({{ template.ratingCount }})</span>
        </div>
        <span class="text-xs text-gray-500">{{ formatCount(template.downloadCount) }} 使用</span>
      </div>
    </div>

    <!-- Selected indicator -->
    <div
      v-if="selected"
      class="absolute top-2 left-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
    >
      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Template } from '@/types'

defineProps<{
  template: Template
  selected?: boolean
}>()

defineEmits<{
  select: [template: Template]
}>()

function formatCount(count: number): string {
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + 'w'
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k'
  }
  return count.toString()
}
</script>
