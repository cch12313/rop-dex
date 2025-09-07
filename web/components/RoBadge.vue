<template>
  <span :class="badgeClasses">
    <span v-if="icon" :class="['mr-1', iconSize]">{{ icon }}</span>
    <slot />
    <button
      v-if="closable"
      @click="$emit('close')"
      class="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
    >
      ✕
    </button>
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'cute' | 'info'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  icon?: string
  closable?: boolean
  dot?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'sm',
  closable: false,
  dot: false
})

defineEmits<{
  close: []
}>()

const badgeClasses = computed(() => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'font-ro-body',
    'font-medium',
    'rounded-full',
    'transition-all',
    'duration-200'
  ]

  // 尺寸
  const sizeClasses = {
    xs: props.dot ? ['w-2', 'h-2'] : ['text-xs', 'px-2', 'py-0.5'],
    sm: props.dot ? ['w-2.5', 'h-2.5'] : ['text-xs', 'px-2.5', 'py-1'],
    md: props.dot ? ['w-3', 'h-3'] : ['text-sm', 'px-3', 'py-1.5'],
    lg: props.dot ? ['w-4', 'h-4'] : ['text-base', 'px-4', 'py-2']
  }

  // 變體樣式
  const variantClasses = {
    default: [
      'bg-ro-neutral-100',
      'text-ro-neutral-700',
      'hover:bg-ro-neutral-200'
    ],
    primary: [
      'bg-ro-primary-100',
      'text-ro-primary-700',
      'hover:bg-ro-primary-200'
    ],
    success: [
      'bg-ro-green-100',
      'text-ro-green-700',
      'hover:bg-ro-green-200'
    ],
    warning: [
      'bg-yellow-100',
      'text-yellow-700',
      'hover:bg-yellow-200'
    ],
    error: [
      'bg-red-100',
      'text-red-700',
      'hover:bg-red-200'
    ],
    cute: [
      'bg-gradient-to-r',
      'from-ro-pink-100',
      'to-ro-pink-200',
      'text-ro-pink-700',
      'hover:from-ro-pink-200',
      'hover:to-ro-pink-300'
    ],
    info: [
      'bg-ro-sky-100',
      'text-ro-sky-700',
      'hover:bg-ro-sky-200'
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
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }
  return sizes[props.size]
})
</script>