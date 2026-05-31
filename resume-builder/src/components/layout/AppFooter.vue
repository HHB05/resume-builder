<template>
  <footer class="bg-gray-50 border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-2 md:col-span-1">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900">简历制作平台</span>
          </div>
          <p class="text-gray-600 text-sm">
            AI驱动的专业简历制作平台，让求职更简单。
          </p>
        </div>

        <!-- Product -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 mb-4">产品</h3>
          <ul class="space-y-3">
            <li>
              <router-link to="/templates" class="text-gray-600 hover:text-gray-900 text-sm">
                模板中心
              </router-link>
            </li>
            <li>
              <router-link to="/pricing" class="text-gray-600 hover:text-gray-900 text-sm">
                定价方案
              </router-link>
            </li>
            <li>
              <a href="#" class="text-gray-600 hover:text-gray-900 text-sm">
                功能介绍
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 hover:text-gray-900 text-sm">
                更新日志
              </a>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 mb-4">支持</h3>
          <ul class="space-y-3">
            <li>
              <a href="#" class="text-gray-600 hover:text-gray-900 text-sm">
                帮助中心
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 hover:text-gray-900 text-sm">
                联系我们
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 hover:text-gray-900 text-sm">
                反馈建议
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 hover:text-gray-900 text-sm">
                常见问题
              </a>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 mb-4">法律</h3>
          <ul class="space-y-3">
            <li>
              <a href="#" class="text-gray-600 hover:text-gray-900 text-sm">
                隐私政策
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 hover:text-gray-900 text-sm">
                服务条款
              </a>
            </li>
            <li>
              <a href="#" class="text-gray-600 hover:text-gray-900 text-sm">
                用户协议
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-200 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-500 text-sm">
            © {{ currentYear }} 简历制作平台. All rights reserved.
          </p>
          <div class="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-gray-600">
              <span class="sr-only">微信</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.887-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.032zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z" />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-600">
              <span class="sr-only">微博</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.601.622.263.825.991.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.248.239.09.321.361.194.581zm.455-2.669c-1.893-.493-4.033.45-4.857 2.118-.836 1.706-.076 3.591 1.841 4.21 1.983.642 4.318-.341 5.132-2.145.8-1.769-.046-3.642-2.116-4.183zM17.663 14c.07-.157.02-.334-.124-.414-.14-.078-.309-.025-.379.127-.066.154-.019.33.12.408.144.081.313.033.383-.121zm1.048-1.709c-.267-.729-1.083-1.128-1.835-.893-.747.236-1.186.977-.977 1.713.21.729 1.037 1.125 1.786.893.755-.228 1.205-.975 1.026-1.713zm1.142-1.757c-.316-.884-1.233-1.353-2.055-1.048-.821.308-1.286 1.177-.988 2.06.299.878 1.22 1.346 2.036 1.044.827-.302 1.318-1.175 1.007-2.056z" />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-600">
              <span class="sr-only">GitHub</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
