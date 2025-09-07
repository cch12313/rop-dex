<template>
  <div :class="containerClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'page' | 'section' | 'card' | 'float' | 'glass'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  centered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'page',
  size: 'lg',
  padding: 'md',
  centered: false
})

const containerClasses = computed(() => {
  const baseClasses = [
    'transition-all',
    'duration-200'
  ]

  // 尺寸
  const sizeClasses = {
    sm: ['max-w-sm'],
    md: ['max-w-md'],
    lg: ['max-w-4xl'],
    xl: ['max-w-7xl'],
    full: ['w-full']
  }

  // 居中
  const centerClasses = props.centered ? ['mx-auto'] : []

  // 內距
  const paddingClasses = {
    none: [],
    sm: ['p-4'],
    md: ['p-6', 'md:p-8'],
    lg: ['p-8', 'md:p-12'],
    xl: ['p-12', 'md:p-16']
  }

  // 變體樣式
  const variantClasses = {
    page: [
      'min-h-screen',
      'bg-ro-soft'
    ],
    section: [
      'rounded-ro-xl',
      'bg-white/80',
      'backdrop-blur-sm',
      'shadow-ro-card',
      'border',
      'border-white/20'
    ],
    card: [
      'rounded-ro-lg',
      'bg-white',
      'shadow-ro-soft',
      'border',
      'border-ro-neutral-100'
    ],
    float: [
      'rounded-ro-xl',
      'bg-white/90',
      'backdrop-blur-md',
      'shadow-ro-hover',
      'border-2',
      'border-white/30',
      'hover:shadow-2xl',
      'hover:-translate-y-1'
    ],
    glass: [
      'rounded-ro-lg',
      'bg-white/60',
      'backdrop-blur-lg',
      'shadow-ro-card',
      'border',
      'border-white/40'
    ]
  }

  return [
    ...baseClasses,
    ...sizeClasses[props.size],
    ...centerClasses,
    ...paddingClasses[props.padding],
    ...variantClasses[props.variant]
  ]
})
</script>