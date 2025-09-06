<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">Rop-dex</NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Ropdex
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          RO 樂園攻略網站，提供各種實用工具和資訊
        </p>
        
        <!-- Feature Cards -->
        <div class="grid grid-cols-1 gap-6 mt-12">
          <!-- 新功能將在此處加入 -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-3xl mb-4">🚧</div>
            <h3 class="text-lg font-semibold mb-2">開發中</h3>
            <p class="text-gray-600 text-sm">更多實用功能即將推出</p>
          </div>
        </div>
      </div>
    </main>
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