<template>
  <div class="relative" :style="{ width: size + 'px', height: size + 'px' }">
    <svg :width="size" :height="size" viewBox="0 0 200 200">
      <!-- Background polygons -->
      <polygon
        v-for="(level, index) in levels"
        :key="index"
        :points="getPolygonPoints(level)"
        fill="none"
        stroke="#e5e7eb"
        stroke-width="1"
      />

      <!-- Axis lines -->
      <line
        v-for="(_, index) in dimensions"
        :key="'axis-' + index"
        x1="100"
        y1="100"
        :x2="getPoint(index, 100).x"
        :y2="getPoint(index, 100).y"
        stroke="#e5e7eb"
        stroke-width="1"
      />

      <!-- Data polygon -->
      <polygon
        :points="getDataPolygonPoints"
        :fill="dataColor"
        :fill-opacity="0.3"
        :stroke="dataColor"
        stroke-width="2"
      />

      <!-- Data points -->
      <circle
        v-for="(dim, index) in dimensions"
        :key="'point-' + index"
        :cx="getPoint(index, dim.value).x"
        :cy="getPoint(index, dim.value).y"
        r="4"
        :fill="dataColor"
      />

      <!-- Labels -->
      <text
        v-for="(dim, index) in dimensions"
        :key="'label-' + index"
        :x="getLabelPoint(index).x"
        :y="getLabelPoint(index).y"
        text-anchor="middle"
        dominant-baseline="middle"
        class="text-xs fill-gray-600"
      >
        {{ dim.label }}
      </text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Dimension {
  label: string
  value: number // 0-100
}

const props = withDefaults(defineProps<{
  dimensions: Dimension[]
  size?: number
  dataColor?: string
}>(), {
  size: 200,
  dataColor: '#3b82f6',
})

const levels = [20, 40, 60, 80, 100]

const getPoint = (index: number, value: number) => {
  const angle = (Math.PI * 2 * index) / props.dimensions.length - Math.PI / 2
  const radius = (value / 100) * 80
  return {
    x: 100 + radius * Math.cos(angle),
    y: 100 + radius * Math.sin(angle),
  }
}

const getLabelPoint = (index: number) => {
  const angle = (Math.PI * 2 * index) / props.dimensions.length - Math.PI / 2
  const radius = 90
  return {
    x: 100 + radius * Math.cos(angle),
    y: 100 + radius * Math.sin(angle),
  }
}

const getPolygonPoints = (level: number) => {
  return props.dimensions
    .map((_, index) => {
      const point = getPoint(index, level)
      return `${point.x},${point.y}`
    })
    .join(' ')
}

const getDataPolygonPoints = computed(() => {
  return props.dimensions
    .map((dim, index) => {
      const point = getPoint(index, dim.value)
      return `${point.x},${point.y}`
    })
    .join(' ')
})
</script>
