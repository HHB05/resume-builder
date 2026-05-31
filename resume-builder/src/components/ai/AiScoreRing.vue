<template>
  <div class="relative inline-flex items-center justify-center">
    <svg :width="size" :height="size" viewBox="0 0 100 100">
      <!-- Background circle -->
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        :stroke="trackColor"
        :stroke-width="strokeWidth"
      />
      <!-- Progress circle -->
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        :stroke="progressColor"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        transform="rotate(-90 50 50)"
        class="transition-all duration-1000 ease-out"
      />
    </svg>
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <span :class="['font-bold', scoreTextColor]" :style="{ fontSize: size * 0.25 + 'px' }">
        {{ score }}
      </span>
      <span class="text-gray-500" :style="{ fontSize: size * 0.12 + 'px' }">分</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  score: number
  size?: number
  strokeWidth?: number
}>(), {
  size: 120,
  strokeWidth: 8,
})

const circumference = computed(() => 2 * Math.PI * 45)
const dashOffset = computed(() => circumference.value * (1 - props.score / 100))

const progressColor = computed(() => {
  if (props.score >= 80) return '#10b981' // green
  if (props.score >= 60) return '#f59e0b' // yellow
  return '#ef4444' // red
})

const trackColor = computed(() => '#e5e7eb')
const scoreTextColor = computed(() => {
  if (props.score >= 80) return 'text-green-600'
  if (props.score >= 60) return 'text-yellow-600'
  return 'text-red-600'
})
</script>
