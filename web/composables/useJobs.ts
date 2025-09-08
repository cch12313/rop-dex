import { jobClassesData, allSecondJobs } from '~/data/all-jobs-integrated'
import type { Job, JobClass } from '~/types/skill'

export const useJobs = () => {
  /**
   * 獲取所有二轉職業資料
   */
  const getAllSecondJobs = (): Job[] => {
    return allSecondJobs
  }

  /**
   * 獲取按職業系統分組的資料
   */
  const getJobClassGroups = (): JobClass[] => {
    return jobClassesData
  }

  /**
   * 根據職業 ID 獲取職業資料
   */
  const getJobById = (jobId: string): Job | undefined => {
    return allSecondJobs.find(job => job.id === jobId)
  }

  /**
   * 根據職業系統 ID 獲取該系統的所有職業
   */
  const getJobsByClassId = (classId: string): Job[] => {
    const jobClass = jobClassesData.find(jc => jc.id === classId)
    return jobClass ? jobClass.jobs : []
  }

  /**
   * 獲取職業分組資料 (用於素質計算機的下拉選單)
   * 回傳格式與 stat-calculator.vue 原本的 jobClassGroups 相同
   */
  const getJobClassGroupsForStatCalculator = () => {
    return jobClassesData.map(jobClass => ({
      classId: jobClass.jobs[0]?.classId || 'unknown', 
      className: jobClass.jobs[0]?.className || '未知',
      jobs: jobClass.jobs
    }))
  }

  return {
    getAllSecondJobs,
    getJobClassGroups,
    getJobById,
    getJobsByClassId,
    getJobClassGroupsForStatCalculator
  }
}