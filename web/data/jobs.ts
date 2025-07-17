import type { JobClass, Job, Skill } from '~/types/skill'

// 初心者技能
const noviceSkills: Skill[] = [
  {
    id: 'first_aid',
    name: '急救術',
    icon: '🏥',
    description: '恢復少量HP，不需要道具',
    maxLevel: 1,
    requirements: [],
    effects: [
      { level: 1, description: '恢復 5% 最大HP' }
    ],
    position: { x: 1, y: 1 }
  },
  {
    id: 'play_dead',
    name: '裝死',
    icon: '💀',
    description: '假裝死亡，避免怪物攻擊',
    maxLevel: 1,
    requirements: [],
    effects: [
      { level: 1, description: '假裝死亡30秒，無法移動和攻擊' }
    ],
    position: { x: 2, y: 1 }
  }
]

// 劍士技能
const swordsmanSkills: Skill[] = [
  {
    id: 'bash',
    name: '猛擊',
    icon: '⚔️',
    description: '對單一目標造成強力攻擊',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '造成 130% 攻擊力傷害' },
      { level: 5, description: '造成 170% 攻擊力傷害' },
      { level: 10, description: '造成 220% 攻擊力傷害' }
    ],
    position: { x: 1, y: 2 }
  },
  {
    id: 'provoke',
    name: '挑釁',
    icon: '😠',
    description: '降低目標防禦力，提高攻擊力',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '降低目標 5% 防禦力，提高 3% 攻擊力' },
      { level: 10, description: '降低目標 32% 防禦力，提高 30% 攻擊力' }
    ],
    position: { x: 2, y: 2 }
  },
  {
    id: 'magnum_break',
    name: '爆裂波',
    icon: '💥',
    description: '火屬性範圍攻擊',
    maxLevel: 10,
    requirements: [{ skillId: 'bash', level: 5 }],
    effects: [
      { level: 1, description: '造成 115% 火屬性傷害' },
      { level: 10, description: '造成 160% 火屬性傷害' }
    ],
    position: { x: 1, y: 3 }
  }
]

// 法師技能
const mageSkills: Skill[] = [
  {
    id: 'cold_bolt',
    name: '冰箭術',
    icon: '🧊',
    description: '發射冰箭攻擊單一目標',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '造成 100% 魔法攻擊力水屬性傷害' },
      { level: 10, description: '造成 190% 魔法攻擊力水屬性傷害' }
    ],
    position: { x: 1, y: 2 }
  },
  {
    id: 'fire_bolt',
    name: '火箭術',
    icon: '🔥',
    description: '發射火箭攻擊單一目標',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '造成 100% 魔法攻擊力火屬性傷害' },
      { level: 10, description: '造成 190% 魔法攻擊力火屬性傷害' }
    ],
    position: { x: 2, y: 2 }
  },
  {
    id: 'lightning_bolt',
    name: '雷電術',
    icon: '⚡',
    description: '發射雷電攻擊單一目標',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '造成 100% 魔法攻擊力風屬性傷害' },
      { level: 10, description: '造成 190% 魔法攻擊力風屬性傷害' }
    ],
    position: { x: 3, y: 2 }
  },
  {
    id: 'sight',
    name: '偵測',
    icon: '👁️',
    description: '顯示隱藏的敵人',
    maxLevel: 1,
    requirements: [],
    effects: [
      { level: 1, description: '顯示周圍隱藏的敵人10秒' }
    ],
    position: { x: 4, y: 2 }
  }
]

// 職業資料
const jobs: Job[] = [
  {
    id: 'novice',
    name: '初心者',
    icon: '👶',
    description: '所有職業的起點',
    skills: noviceSkills,
    baseSkillPoints: 9
  },
  {
    id: 'swordsman',
    name: '劍士',
    icon: '⚔️',
    description: '近戰物理攻擊職業',
    skills: swordsmanSkills,
    baseSkillPoints: 49
  },
  {
    id: 'mage',
    name: '法師',
    icon: '🧙‍♂️',
    description: '遠程魔法攻擊職業',
    skills: mageSkills,
    baseSkillPoints: 49
  },
  {
    id: 'archer',
    name: '弓箭手',
    icon: '🏹',
    description: '遠程物理攻擊職業',
    skills: [],
    baseSkillPoints: 49
  },
  {
    id: 'acolyte',
    name: '服事',
    icon: '🙏',
    description: '支援與治療職業',
    skills: [],
    baseSkillPoints: 49
  },
  {
    id: 'merchant',
    name: '商人',
    icon: '💰',
    description: '商業與生產職業',
    skills: [],
    baseSkillPoints: 49
  },
  {
    id: 'thief',
    name: '盜賊',
    icon: '🗡️',
    description: '敏捷與暗殺職業',
    skills: [],
    baseSkillPoints: 49
  }
]

export const jobClassesData: JobClass[] = [
  {
    id: 'first_class',
    name: '一轉職業',
    jobs: jobs
  }
]