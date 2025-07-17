<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div v-for="jobClass in jobClasses" :key="jobClass.id" class="space-y-2">
      <h3 class="font-semibold text-gray-900">{{ jobClass.name }}</h3>
      <div class="space-y-2">
        <button
          v-for="job in jobClass.jobs"
          :key="job.id"
          @click="selectJob(job)"
          class="w-full flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
          :class="{ 'border-blue-500 bg-blue-50': selectedJobId === job.id }"
        >
          <div class="text-2xl mr-3">{{ job.icon }}</div>
          <div class="text-left">
            <div class="font-medium">{{ job.name }}</div>
            <div class="text-sm text-gray-500">{{ job.description }}</div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Job, JobClass } from '~/types/skill'
import { jobClassesData } from '~/data/jobs'

const emit = defineEmits<{
  jobSelected: [job: Job]
}>()

const selectedJobId = ref<string | null>(null)
const jobClasses = ref<JobClass[]>(jobClassesData)

const selectJob = (job: Job) => {
  selectedJobId.value = job.id
  emit('jobSelected', job)
}
</script>