<template>
  <div class="bg-white min-h-full">
    <!-- Header with gradient -->
    <div class="relative">
      <div class="h-36 relative overflow-hidden" :style="{ background: `linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%)` }">
        <!-- Decorative circles -->
        <div class="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10"></div>
        <div class="absolute bottom-0 -left-8 w-24 h-24 rounded-full bg-white/10"></div>
        <div class="absolute top-1/2 right-1/4 w-8 h-8 rounded-full bg-white/20"></div>
      </div>
      <div class="absolute bottom-0 left-0 right-0 px-8 pb-6">
        <div class="bg-white rounded-2xl shadow-xl p-6 flex items-center gap-6 border border-gray-100">
          <div class="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg"
               :style="{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})` }">
            {{ (content.personal.name || '姓')[0] }}
          </div>
          <div class="flex-1">
            <h1 class="text-3xl font-bold text-gray-900 tracking-tight">{{ content.personal.name || '您的姓名' }}</h1>
            <p class="text-gray-500 mt-1">{{ content.personal.title || '求职意向' }}</p>
            <div class="flex gap-5 mt-3 text-sm text-gray-500">
              <span v-if="content.personal.phone" class="flex items-center gap-1.5">
                <span class="text-gray-400">📞</span> {{ content.personal.phone }}
              </span>
              <span v-if="content.personal.email" class="flex items-center gap-1.5">
                <span class="text-gray-400">✉️</span> {{ content.personal.email }}
              </span>
              <span v-if="content.personal.location" class="flex items-center gap-1.5">
                <span class="text-gray-400">📍</span> {{ content.personal.location }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-8 pt-28 pb-8 space-y-8">
      <!-- Education -->
      <div v-if="content.education?.length">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: config.primaryColor + '12' }">📚</div>
          <h2 class="text-base font-bold text-gray-900">教育背景</h2>
        </div>
        <div class="space-y-4 ml-1">
          <div v-for="edu in content.education" :key="edu.id" class="relative pl-5 border-l-2" :style="{ borderColor: config.primaryColor + '30' }">
            <div class="absolute left-0 top-2.5 w-2.5 h-2.5 rounded-full border-2 border-white" :style="{ backgroundColor: config.primaryColor }"></div>
            <div class="flex justify-between items-baseline">
              <span class="font-bold text-gray-900">{{ edu.school }}</span>
              <span class="text-xs text-gray-400">{{ edu.period.start }} - {{ edu.period.end }}</span>
            </div>
            <p class="text-gray-600 text-sm mt-0.5">{{ edu.major }} · {{ edu.degree }}</p>
          </div>
        </div>
      </div>

      <!-- Experience -->
      <div v-if="content.experience?.length">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: config.primaryColor + '12' }">💼</div>
          <h2 class="text-base font-bold text-gray-900">工作经历</h2>
        </div>
        <div class="space-y-5 ml-1">
          <div v-for="exp in content.experience" :key="exp.id" class="relative pl-5 border-l-2" :style="{ borderColor: config.primaryColor + '30' }">
            <div class="absolute left-0 top-2.5 w-2.5 h-2.5 rounded-full border-2 border-white" :style="{ backgroundColor: config.primaryColor }"></div>
            <div class="flex justify-between items-baseline">
              <span class="font-bold text-gray-900">{{ exp.company }}</span>
              <span class="text-xs text-gray-400">{{ exp.period.start }} - {{ exp.period.end }}</span>
            </div>
            <p class="text-sm font-medium mt-0.5" :style="{ color: config.primaryColor }">{{ exp.position }}</p>
            <p v-if="exp.description" class="text-sm text-gray-600 mt-2 leading-relaxed">{{ exp.description }}</p>
            <ul v-if="exp.highlights?.length" class="mt-2 space-y-1.5">
              <li v-for="(h, i) in exp.highlights" :key="i" class="text-sm text-gray-600 flex items-start gap-2">
                <span class="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" :style="{ backgroundColor: config.primaryColor }"></span>
                <span>{{ h }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Projects -->
      <div v-if="content.projects?.length">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: config.primaryColor + '12' }">🚀</div>
          <h2 class="text-base font-bold text-gray-900">项目经历</h2>
        </div>
        <div class="space-y-5 ml-1">
          <div v-for="proj in content.projects" :key="proj.id" class="relative pl-5 border-l-2" :style="{ borderColor: config.primaryColor + '30' }">
            <div class="absolute left-0 top-2.5 w-2.5 h-2.5 rounded-full border-2 border-white" :style="{ backgroundColor: config.primaryColor }"></div>
            <div class="flex justify-between items-baseline">
              <span class="font-bold text-gray-900">{{ proj.name }}</span>
              <span class="text-xs text-gray-400">{{ proj.period.start }} - {{ proj.period.end }}</span>
            </div>
            <p class="text-sm font-medium mt-0.5" :style="{ color: config.primaryColor }">{{ proj.role }}</p>
            <p v-if="proj.description" class="text-sm text-gray-600 mt-2 leading-relaxed">{{ proj.description }}</p>
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div v-if="content.skills?.length">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: config.primaryColor + '12' }">⚡</div>
          <h2 class="text-base font-bold text-gray-900">专业技能</h2>
        </div>
        <div class="grid grid-cols-2 gap-2.5 ml-1">
          <div v-for="skill in content.skills" :key="skill.id" class="flex items-center gap-2.5 p-2 rounded-lg" :style="{ backgroundColor: config.primaryColor + '05' }">
            <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: config.primaryColor }"></div>
            <span class="text-sm text-gray-700 font-medium">{{ skill.name }}</span>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div v-if="content.summary">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg" :style="{ backgroundColor: config.primaryColor + '12' }">👤</div>
          <h2 class="text-base font-bold text-gray-900">自我评价</h2>
        </div>
        <p class="text-gray-600 text-sm leading-relaxed ml-1">{{ content.summary }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: any
  config: any
}>()
</script>
