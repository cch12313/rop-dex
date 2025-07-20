<template>
  <div v-if="isVisible" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- 背景遮罩 -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="close"></div>
    
    <!-- 模態框 -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <!-- 標題 -->
        <div class="flex items-center mb-4">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="ml-3 text-lg font-medium text-gray-900">技能點數不足</h3>
        </div>
        
        <!-- 內容 -->
        <div class="mb-6">
          <p class="text-sm text-gray-700 mb-3">
            升級 <strong>{{ targetSkill?.name }}</strong> 需要自動升級以下前置技能：
          </p>
          
          <!-- 前置技能列表 -->
          <div class="bg-gray-50 rounded-md p-3 mb-3">
            <ul class="space-y-1 text-sm">
              <li v-for="req in prerequisiteUpgrades" :key="req.skillId" class="flex justify-between">
                <span>{{ req.skillName }}</span>
                <span class="text-blue-600">{{ req.currentLevel }} → {{ req.requiredLevel }}</span>
              </li>
            </ul>
          </div>
          
          <!-- 技能點數統計 -->
          <div class="bg-red-50 border border-red-200 rounded-md p-3">
            <div class="flex justify-between text-sm mb-1">
              <span>需要技能點數：</span>
              <span class="font-medium">{{ requiredPoints }}</span>
            </div>
            <div class="flex justify-between text-sm mb-1">
              <span>目前可用點數：</span>
              <span class="font-medium">{{ availablePoints }}</span>
            </div>
            <div class="flex justify-between text-sm font-medium text-red-600">
              <span>還缺少：</span>
              <span>{{ shortagePoints }} 點</span>
            </div>
          </div>
          
          <p class="text-sm text-gray-600 mt-3">
            請移除其他技能點數以釋放足夠的技能點。
          </p>
        </div>
        
        <!-- 按鈕 -->
        <div class="flex justify-end space-x-3">
          <button
            @click="close"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Skill } from '~/types/skill'

interface PrerequisiteUpgrade {
  skillId: string
  skillName: string
  currentLevel: number
  requiredLevel: number
}

interface Props {
  isVisible: boolean
  targetSkill: Skill | null
  prerequisiteUpgrades: PrerequisiteUpgrade[]
  requiredPoints: number
  availablePoints: number
  shortagePoints: number
}

interface Emits {
  close: []
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const close = () => {
  emit('close')
}
</script>