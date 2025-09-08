<template>
  <div class="min-h-screen bg-ro-soft font-ro-body">
    <!-- Header -->
    <header class="bg-white/90 backdrop-blur-sm shadow-ro-soft border-b-2 border-ro-accent-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-3xl font-bold font-ro-title bg-ro-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-200">
              🌟 Rop-dex
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center">
        <!-- 可愛的標題區 -->
        <div class="relative">
          <div class="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <RoIcon name="sparkle" size="3xl" animated class="ro-sparkle" />
          </div>
          <h1 class="text-5xl md:text-6xl font-bold font-ro-display ro-gradient-text mb-6 leading-tight ro-float">
            歡迎來到 Rop-dex
          </h1>
          <div class="absolute -bottom-2 right-1/4">
            <RoIcon name="poring" size="2xl" animated class="ro-bounce delay-300" />
          </div>
        </div>
        
        <p class="text-xl md:text-2xl text-ro-neutral-700 mb-12 max-w-3xl mx-auto leading-relaxed ro-hover-cute">
          你的 RO 樂園冒險夥伴！<br>
          提供最實用的工具和攻略資訊 <RoIcon name="magic" animated class="ro-sparkle inline" />
        </p>
        
        <!-- Feature Cards -->
        <div class="flex justify-center mt-16">
          <!-- 素質模擬器 -->
          <NuxtLink to="/stat-calculator" class="group block bg-white/60 backdrop-blur-sm rounded-ro-xl shadow-ro-card border-2 border-ro-neutral-200 hover:border-ro-primary-300 overflow-hidden relative ro-3d hover:shadow-ro-hover transition-all duration-200">
            <div class="p-8 relative">
              <!-- 裝飾性背景圖示 -->
              <div class="absolute top-4 right-16 opacity-10">
                <RoIcon name="diamond" size="xl" />
              </div>
              
              <div class="mb-6 opacity-60 group-hover:opacity-80 transition-opacity">
                <RoIcon name="level-up" size="3xl" class="ro-bounce" />
              </div>
              <h3 class="text-2xl font-bold text-ro-neutral-500 mb-4 font-ro-title flex items-center group-hover:text-ro-green-500 transition-colors">
                素質模擬器
                <RoIcon name="heart" class="ml-2 opacity-50 ro-heartbeat" />
              </h3>
              <p class="text-ro-neutral-500 text-lg leading-relaxed group-hover:text-ro-neutral-600 transition-colors">
                配置你的角色屬性點<br>
              </p>
            </div>
          </NuxtLink>
        </div>

        <!-- 可愛的裝飾元素 -->
        <div class="mt-20 text-center">
          <div class="inline-flex items-center space-x-4 text-2xl ro-hover-cute">
            <RoIcon name="flower" animated class="ro-bounce" />
            <span class="text-ro-neutral-400 font-ro-title ro-gradient-text">讓我們一起探索 RO 的世界吧</span>
            <RoIcon name="flower" animated class="ro-bounce delay-300" />
          </div>
          
          <!-- 額外的可愛元素 -->
          <div class="mt-8 flex justify-center space-x-6">
            <RoIcon name="cat" size="lg" animated class="ro-wiggle ro-hover-cute" />
            <RoIcon name="rainbow" size="lg" animated class="ro-rainbow ro-hover-cute" />
            <RoIcon name="sun" size="lg" animated class="ro-sparkle ro-hover-cute" />
          </div>
        </div>
      </div>
    </main>

    <!-- 裝飾性背景元素 -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-40 -left-40 w-80 h-80 bg-ro-accent-200/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -right-40 w-80 h-80 bg-ro-primary-200/20 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/4 w-60 h-60 bg-ro-green-200/20 rounded-full blur-3xl"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Rop-dex - RO樂園攻略網站',
  description: 'RO樂園攻略網站，提供技能模擬器等實用工具',
  ogTitle: 'Rop-dex - RO樂園攻略網站',
  ogDescription: 'RO樂園攻略網站，提供技能模擬器等實用工具',
})
</script>