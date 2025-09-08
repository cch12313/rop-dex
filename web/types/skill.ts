export interface Skill {
  id: string
  name: string
  icon: string
  description: string
  maxLevel: number
  requirements: SkillRequirement[]
  effects: SkillEffect[]
  position: {
    x: number
    y: number
  }
}

export interface SkillRequirement {
  skillId: string
  level: number
}

export interface SkillEffect {
  level: number
  description: string
}

export interface StatBonuses {
  str?: number
  agi?: number
  vit?: number
  int?: number
  dex?: number
  luk?: number
}

export interface Job {
  id: string
  name: string
  icon: string
  description: string
  skills: Skill[]
  baseSkillPoints: number
  classId: string
  className: string
  hpCoefficient: number
  spCoefficient: number
  statBonuses: StatBonuses
}

export interface JobClass {
  id: string
  name: string
  jobs: Job[]
}