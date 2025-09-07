<template>
  <span :class="iconClasses" :title="tooltip">
    {{ iconContent }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  color?: 'default' | 'primary' | 'secondary' | 'cute' | 'muted'
  animated?: boolean
  tooltip?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'default',
  animated: false
})

// RO 風格圖示映射
const iconMap: Record<string, string> = {
  // 基本圖示
  'star': '⭐',
  'heart': '💖',
  'diamond': '💎',
  'crown': '👑',
  'magic': '✨',
  'sparkle': '🌟',
  'gem': '💎',
  
  // 職業相關
  'sword': '⚔️',
  'shield': '🛡️',
  'bow': '🏹',
  'staff': '🪄',
  'dagger': '🗡️',
  'axe': '🪓',
  
  // 角色職業
  'knight': '🛡️',
  'wizard': '🔮',
  'archer': '🏹',
  'priest': '✨',
  'assassin': '🗡️',
  'merchant': '💰',
  
  // UI 元素
  'home': '🏠',
  'settings': '⚙️',
  'profile': '👤',
  'search': '🔍',
  'menu': '📋',
  'close': '❌',
  'check': '✅',
  'warning': '⚠️',
  'info': 'ℹ️',
  'error': '❌',
  
  // 可愛元素
  'cat': '🐱',
  'poring': '🟡', // RO經典史萊姆
  'flower': '🌸',
  'leaf': '🍃',
  'sun': '☀️',
  'moon': '🌙',
  'rainbow': '🌈',
  
  // 動作
  'level-up': '📈',
  'skill': '💫',
  'exp': '✨',
  'hp': '❤️',
  'sp': '💙',
  'attack': '⚔️',
  'defense': '🛡️',
  'speed': '💨',
  
  // 物品
  'potion': '🧪',
  'food': '🍎',
  'equipment': '⚔️',
  'accessory': '💍',
  'card': '🃏',
  
  // 導航
  'next': '➡️',
  'prev': '⬅️',
  'up': '⬆️',
  'down': '⬇️',
  'expand': '🔽',
  'collapse': '🔼'
}

const iconContent = computed(() => {
  return iconMap[props.name] || '❓'
})

const iconClasses = computed(() => {
  const baseClasses = [
    'inline-block',
    'select-none',
    'transition-all',
    'duration-200'
  ]

  // 尺寸
  const sizeClasses = {
    xs: ['text-xs'],
    sm: ['text-sm'],
    md: ['text-base'],
    lg: ['text-lg'],
    xl: ['text-xl'],
    '2xl': ['text-2xl'],
    '3xl': ['text-3xl']
  }

  // 顏色 (通過 CSS filter 或 opacity 調整)
  const colorClasses = {
    default: [],
    primary: ['text-ro-primary-500'],
    secondary: ['text-ro-neutral-500'],
    cute: ['text-ro-pink-500'],
    muted: ['opacity-60']
  }

  // 動畫效果
  const animatedClasses = props.animated ? [
    'hover:scale-110',
    'hover:rotate-6',
    'cursor-pointer'
  ] : []

  // 特殊動畫 (基於圖示類型)
  const specialAnimations = []
  if (props.animated) {
    switch (props.name) {
      case 'star':
      case 'sparkle':
      case 'magic':
        specialAnimations.push('animate-pulse')
        break
      case 'heart':
        specialAnimations.push('hover:animate-bounce')
        break
      case 'poring':
        specialAnimations.push('hover:animate-bounce')
        break
    }
  }

  return [
    ...baseClasses,
    ...sizeClasses[props.size],
    ...colorClasses[props.color],
    ...animatedClasses,
    ...specialAnimations
  ]
})
</script>

<style scoped>
/* 自定義動畫延遲 */
.animation-delay-100 {
  animation-delay: 100ms;
}
.animation-delay-200 {
  animation-delay: 200ms;
}
.animation-delay-300 {
  animation-delay: 300ms;
}
</style>