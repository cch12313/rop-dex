<template>
  <div :class="cardClasses">
    <!-- 卡片頭部 -->
    <div v-if="$slots.header || title" class="px-6 py-4 border-b border-ro-neutral-100">
      <slot name="header">
        <div class="flex items-center justify-between">
          <h3 v-if="title" :class="titleClasses">
            <span v-if="icon" :class="['mr-2', iconSize]">{{ icon }}</span>
            {{ title }}
          </h3>
          <div v-if="$slots.action" class="flex items-center space-x-2">
            <slot name="action" />
          </div>
        </div>
      </slot>
    </div>

    <!-- 卡片內容 -->
    <div :class="contentClasses">
      <slot />
    </div>

    <!-- 卡片底部 -->
    <div v-if="$slots.footer" :class="footerClasses">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'cute' | 'soft' | 'glass' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  title?: string
  icon?: string
  hoverable?: boolean
  clickable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  hoverable: false,
  clickable: false,
  padding: 'md'
})

const cardClasses = computed(() => {
  const baseClasses = [
    'rounded-ro-lg',
    'transition-all',
    'duration-200',
    'overflow-hidden'
  ]

  // 尺寸
  const sizeClasses = {
    sm: ['max-w-sm'],
    md: ['max-w-md'], 
    lg: ['max-w-lg']
  }

  // 變體樣式
  const variantClasses = {
    default: [
      'bg-white',
      'shadow-ro-card',
      'border',
      'border-ro-neutral-100'
    ],
    cute: [
      'bg-gradient-to-br',
      'from-white',
      'to-ro-pink-50',
      'shadow-ro-soft',
      'border-2',
      'border-ro-pink-100'
    ],
    soft: [
      'bg-white/80',
      'backdrop-blur-sm',
      'shadow-ro-soft',
      'border',
      'border-white/20'
    ],
    glass: [
      'bg-white/60',
      'backdrop-blur-md',
      'shadow-ro-card',
      'border',
      'border-white/30'
    ],
    outline: [
      'bg-transparent',
      'border-2',
      'border-ro-primary-200',
      'hover:bg-ro-primary-50'
    ]
  }

  // 互動效果
  const interactiveClasses = []
  if (props.hoverable || props.clickable) {
    interactiveClasses.push(
      'hover:shadow-ro-hover',
      'hover:-translate-y-1'
    )
  }
  if (props.clickable) {
    interactiveClasses.push(
      'cursor-pointer',
      'active:scale-98'
    )
  }

  return [
    ...baseClasses,
    ...sizeClasses[props.size],
    ...variantClasses[props.variant],
    ...interactiveClasses
  ]
})

const titleClasses = computed(() => [
  'font-ro-title',
  'font-bold',
  'text-ro-primary-600',
  'flex',
  'items-center',
  props.size === 'sm' ? 'text-lg' : props.size === 'lg' ? 'text-2xl' : 'text-xl'
])

const contentClasses = computed(() => {
  const paddingClasses = {
    none: [],
    sm: ['p-4'],
    md: ['p-6'],
    lg: ['p-8']
  }
  
  return [
    'text-ro-neutral-700',
    ...paddingClasses[props.padding]
  ]
})

const footerClasses = computed(() => [
  'px-6',
  'py-4',
  'bg-ro-neutral-50',
  'border-t',
  'border-ro-neutral-100',
  'flex',
  'items-center',
  'justify-between'
])

const iconSize = computed(() => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }
  return sizes[props.size]
})
</script>