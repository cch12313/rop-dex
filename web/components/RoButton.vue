<template>
  <component
    :is="tag"
    :class="buttonClasses"
    :disabled="disabled"
    :type="type"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span v-if="loading" class="animate-spin mr-2">⭐</span>
    <span v-if="icon && !loading" :class="['mr-2', iconSize]">{{ icon }}</span>
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'cute'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  icon?: string
  tag?: string
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  tag: 'button',
  type: 'button'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

const buttonClasses = computed(() => {
  const baseClasses = [
    'inline-flex',
    'items-center', 
    'justify-center',
    'font-ro-title',
    'font-semibold',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-4',
    'focus:ring-opacity-50',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'transform',
    'active:scale-95'
  ]

  // 尺寸
  const sizeClasses = {
    sm: ['text-sm', 'px-4', 'py-2', 'rounded-ro-md'],
    md: ['text-base', 'px-6', 'py-3', 'rounded-ro-lg'],
    lg: ['text-lg', 'px-8', 'py-4', 'rounded-ro-lg'],
    xl: ['text-xl', 'px-10', 'py-5', 'rounded-ro-xl']
  }

  // 變體樣式
  const variantClasses = {
    primary: [
      'bg-ro-primary text-white',
      'hover:shadow-ro-hover',
      'hover:-translate-y-1',
      'focus:ring-ro-primary-300',
      'shadow-ro-soft'
    ],
    secondary: [
      'bg-white', 'text-ro-primary-600',
      'border-2', 'border-ro-primary-200',
      'hover:bg-ro-primary-50',
      'hover:border-ro-primary-300',
      'hover:shadow-ro-card',
      'focus:ring-ro-primary-200'
    ],
    success: [
      'bg-ro-green-500', 'text-white',
      'hover:bg-ro-green-600',
      'hover:shadow-lg',
      'hover:-translate-y-1',
      'focus:ring-ro-green-300'
    ],
    warning: [
      'bg-gradient-to-r', 'from-yellow-400', 'to-orange-400',
      'text-white',
      'hover:from-yellow-500',
      'hover:to-orange-500',
      'hover:shadow-lg',
      'hover:-translate-y-1',
      'focus:ring-yellow-300'
    ],
    cute: [
      'bg-gradient-to-r', 'from-ro-accent-400', 'to-ro-accent-500',
      'text-white',
      'hover:from-ro-accent-500',
      'hover:to-ro-accent-600',
      'hover:shadow-ro-accent',
      'hover:-translate-y-1',
      'focus:ring-ro-accent-300'
    ]
  }

  return [
    ...baseClasses,
    ...sizeClasses[props.size],
    ...variantClasses[props.variant]
  ]
})

const iconSize = computed(() => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  }
  return sizes[props.size]
})
</script>