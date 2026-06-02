<template>
  <div class="min-h-screen bg-stone-950 text-white overflow-hidden">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-stone-950/70 border-b border-stone-800/50">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <span class="text-stone-950 font-bold text-lg">R</span>
          </div>
          <span class="font-serif text-xl tracking-tight">ResumeCraft</span>
        </div>
        <div class="hidden md:flex items-center gap-8 text-sm text-stone-400">
          <a href="#features" class="hover:text-white transition-colors">功能</a>
          <a href="#templates" class="hover:text-white transition-colors">模板</a>
          <a href="#pricing" class="hover:text-white transition-colors">定价</a>
        </div>
        <div class="flex items-center gap-4">
          <router-link to="/login" class="text-sm text-stone-400 hover:text-white transition-colors">
            登录
          </router-link>
          <router-link to="/register"
            class="px-5 py-2 bg-white text-stone-950 text-sm font-medium rounded-full hover:bg-stone-200 transition-all hover:scale-105">
            免费开始
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center pt-20">
      <!-- Background elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-stone-800/20 to-transparent rounded-full"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left content -->
        <div class="space-y-8">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-stone-800/50 rounded-full border border-stone-700/50">
            <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span class="text-sm text-stone-400">AI 驱动的简历制作</span>
          </div>

          <h1 class="text-5xl md:text-7xl font-serif leading-tight tracking-tight">
            <span class="text-stone-400">打造</span><br>
            <span class="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              令人难忘的
            </span><br>
            <span>简历</span>
          </h1>

          <p class="text-lg text-stone-400 max-w-lg leading-relaxed">
            告别千篇一律的模板。AI 智能辅助，专业设计美学，
            让您的简历在众多求职者中脱颖而出。
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <router-link to="/register"
              class="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-semibold rounded-full hover:shadow-lg hover:shadow-amber-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2">
              立即开始
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </router-link>
            <router-link to="/templates"
              class="px-8 py-4 border border-stone-700 text-white font-medium rounded-full hover:bg-stone-800 transition-all flex items-center justify-center gap-2">
              浏览模板
            </router-link>
          </div>

          <!-- Stats -->
          <div class="flex gap-12 pt-8 border-t border-stone-800/50">
            <div>
              <div class="text-3xl font-serif text-amber-400">50+</div>
              <div class="text-sm text-stone-500">专业模板</div>
            </div>
            <div>
              <div class="text-3xl font-serif text-amber-400">10万+</div>
              <div class="text-sm text-stone-500">用户信赖</div>
            </div>
            <div>
              <div class="text-3xl font-serif text-amber-400">98%</div>
              <div class="text-sm text-stone-500">好评率</div>
            </div>
          </div>
        </div>

        <!-- Right content - Preview card -->
        <div class="relative lg:block hidden">
          <div class="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl"></div>
          <div class="relative bg-stone-900 rounded-2xl border border-stone-800 p-6 shadow-2xl">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div class="bg-white rounded-xl p-8 text-stone-950">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-2xl font-serif font-bold">张三</h3>
                  <p class="text-stone-500">高级前端工程师</p>
                </div>
                <div class="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl font-bold text-white">
                  张
                </div>
              </div>
              <div class="mt-6 space-y-3 text-sm">
                <div class="flex items-center gap-2 text-stone-600">
                  <span>📱</span> 138-0000-0000
                </div>
                <div class="flex items-center gap-2 text-stone-600">
                  <span>✉️</span> zhangsan@email.com
                </div>
              </div>
              <div class="mt-6 pt-6 border-t border-stone-100">
                <h4 class="font-semibold mb-2">工作经历</h4>
                <div class="text-sm text-stone-600 space-y-2">
                  <div class="flex justify-between">
                    <span class="font-medium text-stone-800">字节跳动</span>
                    <span class="text-xs">2022-至今</span>
                  </div>
                  <p>负责抖音Web端核心功能开发，主导完成播放器重构...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-32 bg-stone-900/50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20">
          <span class="text-amber-400 font-medium tracking-widest text-sm uppercase">为什么选择我们</span>
          <h2 class="text-4xl md:text-5xl font-serif mt-4 tracking-tight">
            不只是模板<br>
            <span class="text-stone-500">而是设计</span>
          </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(feature, index) in features" :key="index"
            class="group p-8 bg-stone-800/30 rounded-2xl border border-stone-700/50 hover:border-amber-500/50 transition-all hover:bg-stone-800/50">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-400/20 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
              {{ feature.icon }}
            </div>
            <h3 class="text-xl font-serif font-semibold mb-3">{{ feature.title }}</h3>
            <p class="text-stone-400 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Templates Section -->
    <section id="templates" class="py-32">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20">
          <span class="text-amber-400 font-medium tracking-widest text-sm uppercase">精选模板</span>
          <h2 class="text-4xl md:text-5xl font-serif mt-4 tracking-tight">
            为每个行业<br>
            <span class="text-stone-500">精心设计</span>
          </h2>
          <p class="text-stone-400 mt-4">超过25种专业模板，覆盖各行各业</p>
        </div>

        <div class="grid md:grid-cols-4 gap-4">
          <div v-for="(template, index) in homepageTemplates" :key="index"
            class="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border border-stone-800 hover:border-amber-500/50 transition-all">
            <img :src="template.thumbnail" :alt="template.name" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
              <h4 class="font-serif text-white text-sm">{{ template.name }}</h4>
              <p class="text-xs text-stone-300">{{ template.category }}</p>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <router-link to="/templates"
            class="inline-flex items-center gap-2 px-8 py-4 border border-stone-700 rounded-full hover:bg-stone-800 transition-all">
            查看全部 25+ 模板
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-32 bg-stone-900/50">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <h2 class="text-4xl md:text-5xl font-serif tracking-tight mb-6">
          准备好开始了吗？
        </h2>
        <p class="text-xl text-stone-400 mb-10">
          加入 10 万+用户，用 AI 打造您的专业简历
        </p>
        <router-link to="/register"
          class="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-semibold rounded-full text-lg hover:shadow-lg hover:shadow-amber-500/25 transition-all hover:scale-105">
          免费注册
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 border-t border-stone-800/50">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <span class="text-stone-950 font-bold text-sm">R</span>
          </div>
          <span class="font-serif">ResumeCraft</span>
        </div>
        <div class="text-sm text-stone-500">
          © 2026 ResumeCraft. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    icon: '✨',
    title: 'AI 智能优化',
    description: 'AI 助手帮您润色内容、优化表达，让简历更专业更有说服力',
  },
  {
    icon: '🎨',
    title: '精美模板',
    description: '精心设计的模板，覆盖各行各业，一键切换风格',
  },
  {
    icon: '⚡',
    title: '一键导出',
    description: '支持 PDF、Word 等多种格式导出，随时随地投递',
  },
]

const templates = [
  {
    name: '极简风格',
    category: '通用',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  },
  {
    name: '商务专业',
    category: '金融',
    gradient: 'linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%)',
  },
  {
    name: '创意设计',
    category: '设计',
    gradient: 'linear-gradient(135deg, #533483 0%, #0f3460 100%)',
  },
]

// 首页展示的模板
const homepageTemplates = [
  { name: '简约经典', category: '通用', thumbnail: '/templates/chinese/001.jpg' },
  { name: '简约风求职', category: '通用', thumbnail: '/templates/chinese/002.jpg' },
  { name: '应届毕业生', category: '通用', thumbnail: '/templates/chinese/003.jpg' },
  { name: '砖红色通用', category: '通用', thumbnail: '/templates/chinese/004.jpg' },
  { name: '左右双栏', category: '创意', thumbnail: '/templates/chinese/005.jpg' },
  { name: '个人简历', category: '通用', thumbnail: '/templates/chinese/006.jpg' },
  { name: '项目经理', category: '金融', thumbnail: '/templates/chinese/007.jpg' },
  { name: '英文专业', category: 'English', thumbnail: '/templates/english/001.jpg' },
]
</script>
