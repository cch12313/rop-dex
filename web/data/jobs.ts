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

// 劍士技能 (基於 RO Zero ragzero.kr 資料)
const swordsmanSkills: Skill[] = [
  {
    id: 'sword_mastery',
    name: '單手劍武器熟練度',
    icon: '⚔️',
    description: '한손검 수련 - 增加單手劍與短劍的攻擊力',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '攻擊力 +4' },
      { level: 5, description: '攻擊力 +20' },
      { level: 10, description: '攻擊力 +40' }
    ],
    position: { x: 1, y: 1 }
  },
  {
    id: 'twohand_sword_mastery',
    name: '雙手劍武器熟練度',
    icon: '🗡️',
    description: '양손검 수련 - 增加雙手劍的攻擊力',
    maxLevel: 10,
    requirements: [{ skillId: 'sword_mastery', level: 1 }],
    effects: [
      { level: 1, description: '攻擊力 +4' },
      { level: 5, description: '攻擊力 +20' },
      { level: 10, description: '攻擊力 +40' }
    ],
    position: { x: 1, y: 2 }
  },
  {
    id: 'spear_mastery',
    name: '長槍熟練度',
    icon: '🛡️',
    description: '창 수련 - 增加長槍的攻擊力',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '攻擊力 +4' },
      { level: 5, description: '攻擊力 +20' },
      { level: 10, description: '攻擊力 +40' }
    ],
    position: { x: 1, y: 3 }
  },
  {
    id: 'hp_recovery',
    name: 'HP回復',
    icon: '💚',
    description: 'HP회복력 향상 - 增加HP自然回復速度',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '10秒回復 HP +(5 + 最大HP的0.2%)' },
      { level: 5, description: '10秒回復 HP +(25 + 最大HP的1.0%)' },
      { level: 10, description: '10秒回復 HP +(50 + 最大HP的2.0%)' }
    ],
    position: { x: 2, y: 1 }
  },
  {
    id: 'bash',
    name: '狂擊',
    icon: '💥',
    description: '배쉬 - 對單一目標造成強力攻擊',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '攻擊力 130% 命中率+5% SP消耗:8' },
      { level: 5, description: '攻擊力 250% 命中率+25% SP消耗:8' },
      { level: 10, description: '攻擊力 400% 命中率+50% SP消耗:15' }
    ],
    position: { x: 3, y: 1 }
  },
  {
    id: 'magnum_break',
    name: '怒爆',
    icon: '🔥',
    description: '매그넘 브레이크 - 火屬性範圍攻擊技能',
    maxLevel: 10,
    requirements: [{ skillId: 'bash', level: 5 }],
    effects: [
      { level: 1, description: '攻擊力 120% 火屬性 範圍 5x5' },
      { level: 5, description: '攻擊力 200% 火屬性 範圍 5x5' },
      { level: 10, description: '攻擊力 300% 火屬性 範圍 5x5' }
    ],
    position: { x: 3, y: 2 }
  },
  {
    id: 'provoke',
    name: '挑釁',
    icon: '😠',
    description: '프로보크 - 降低目標防禦力，提高攻擊力',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '敵人攻擊力+5% 防禦力-10%' },
      { level: 5, description: '敵人攻擊力+17% 防禦力-30%' },
      { level: 10, description: '敵人攻擊力+32% 防禦力-55%' }
    ],
    position: { x: 4, y: 1 }
  },
  {
    id: 'endure',
    name: '霸體',
    icon: '🛡️',
    description: '인듀어 - 被攻擊時不會被打斷動作',
    maxLevel: 10,
    requirements: [{ skillId: 'provoke', level: 5 }],
    effects: [
      { level: 1, description: '持續10秒 MDEF+1 被攻擊7次後解除' },
      { level: 5, description: '持續22秒 MDEF+5 被攻擊7次後解除' },
      { level: 10, description: '持續37秒 MDEF+10 被攻擊7次後解除' }
    ],
    position: { x: 4, y: 2 }
  },
  {
    id: 'fatal_blow',
    name: '攻擊弱點',
    icon: '🎯',
    description: '급소치기 - 配合狂擊使用時有機率造成暈眩',
    maxLevel: 1,
    requirements: [],
    effects: [
      { level: 1, description: '狂擊Lv6以上時有機率造成暈眩' }
    ],
    position: { x: 5, y: 2 }
  },
  {
    id: 'moving_hp_recovery',
    name: '移動時恢復HP',
    icon: '🏃',
    description: '이동시 HP 회복 - 移動時也能回復HP',
    maxLevel: 1,
    requirements: [],
    effects: [
      { level: 1, description: '移動時以25%效率回復HP' }
    ],
    position: { x: 6, y: 1 }
  },
  {
    id: 'auto_berserk',
    name: '狂暴狀態',
    icon: '😡',
    description: '오토 버서크 - HP低於25%時自動進入狂暴狀態',
    maxLevel: 1,
    requirements: [],
    effects: [
      { level: 1, description: 'HP低於25%時自動狂暴(如同挑釁Lv10效果)' }
    ],
    position: { x: 5, y: 1 }
  }
]

// 騎士技能 (基於 RO Zero ragzero.kr 資料)
const knightSkills: Skill[] = [
  ...swordsmanSkills, // 繼承劍士所有技能
  {
    id: 'pierce',
    name: '穿刺攻擊',
    icon: '🗡️',
    description: '피어스 - 對一直線上的多個敵人造成傷害',
    maxLevel: 10,
    requirements: [{ skillId: 'spear_mastery', level: 1 }],
    effects: [
      { level: 1, description: '攻擊力 100% 穿透攻擊' },
      { level: 5, description: '攻擊力 140% 穿透攻擊' },
      { level: 10, description: '攻擊力 190% 穿透攻擊' }
    ],
    position: { x: 2, y: 3 }
  },
  {
    id: 'brandish_spear',
    name: '旋風槍',
    icon: '🌪️',
    description: '브랜디쉬 스피어 - 範圍攻擊技能',
    maxLevel: 10,
    requirements: [{ skillId: 'pierce', level: 5 }],
    effects: [
      { level: 1, description: '攻擊力 150% 範圍攻擊' },
      { level: 5, description: '攻擊力 250% 範圍攻擊' },
      { level: 10, description: '攻擊力 350% 範圍攻擊' }
    ],
    position: { x: 2, y: 4 }
  },
  {
    id: 'spear_stab',
    name: '槍刺',
    icon: '📏',
    description: '스피어 스텝 - 增加攻擊距離的槍技',
    maxLevel: 10,
    requirements: [{ skillId: 'pierce', level: 5 }],
    effects: [
      { level: 1, description: '攻擊力 120% 射程+1' },
      { level: 5, description: '攻擊力 200% 射程+3' },
      { level: 10, description: '攻擊力 280% 射程+5' }
    ],
    position: { x: 3, y: 3 }
  },
  {
    id: 'spear_boomerang',
    name: '槍迴旋',
    icon: '🪃',
    description: '스피어 부메랑 - 遠距離投擲槍械攻擊',
    maxLevel: 5,
    requirements: [{ skillId: 'pierce', level: 3 }],
    effects: [
      { level: 1, description: '攻擊力 150% 遠距離投擲' },
      { level: 3, description: '攻擊力 250% 遠距離投擲' },
      { level: 5, description: '攻擊力 350% 遠距離投擲' }
    ],
    position: { x: 1, y: 4 }
  },
  {
    id: 'twohand_quicken',
    name: '雙手劍速度增加',
    icon: '⚡',
    description: '투 핸드 퀴큰 - 提高雙手劍攻擊速度',
    maxLevel: 10,
    requirements: [{ skillId: 'twohand_sword_mastery', level: 1 }],
    effects: [
      { level: 1, description: '攻擊速度+30% 持續30秒' },
      { level: 5, description: '攻擊速度+50% 持續110秒' },
      { level: 10, description: '攻擊速度+70% 持續200秒' }
    ],
    position: { x: 1, y: 5 }
  },
  {
    id: 'auto_counter',
    name: '自動反擊',
    icon: '🛡️',
    description: '오토 카운터 - 被攻擊時自動反擊',
    maxLevel: 5,
    requirements: [{ skillId: 'twohand_sword_mastery', level: 1 }],
    effects: [
      { level: 1, description: '20% 機率反擊 攻擊力200%' },
      { level: 3, description: '30% 機率反擊 攻擊力300%' },
      { level: 5, description: '40% 機率反擊 攻擊力400%' }
    ],
    position: { x: 2, y: 5 }
  },
  {
    id: 'bowling_bash',
    name: '保齡球猛擊',
    icon: '🎳',
    description: '볼링 바쉬 - 直線範圍攻擊',
    maxLevel: 10,
    requirements: [{ skillId: 'bash', level: 10 }, { skillId: 'twohand_sword_mastery', level: 5 }, { skillId: 'magnum_break', level: 3 }],
    effects: [
      { level: 1, description: '攻擊力 150% 直線範圍攻擊' },
      { level: 5, description: '攻擊力 250% 直線範圍攻擊' },
      { level: 10, description: '攻擊力 350% 直線範圍攻擊' }
    ],
    position: { x: 4, y: 3 }
  },
  {
    id: 'riding',
    name: '騎乘術',
    icon: '🐎',
    description: '라이딩 - 可以騎乘佩克佩克鳥',
    maxLevel: 1,
    requirements: [],
    effects: [
      { level: 1, description: '可以騎乘佩克佩克鳥，增加移動速度' }
    ],
    position: { x: 5, y: 3 }
  },
  {
    id: 'cavalier_mastery',
    name: '騎兵熟練術',
    icon: '🐴',
    description: '캐벌리어 마스터리 - 騎乘時增加攻擊力',
    maxLevel: 5,
    requirements: [{ skillId: 'riding', level: 1 }],
    effects: [
      { level: 1, description: '騎乘時攻擊力+20%' },
      { level: 3, description: '騎乘時攻擊力+60%' },
      { level: 5, description: '騎乘時攻擊力+100%' }
    ],
    position: { x: 5, y: 4 }
  }
]

// 十字軍技能 (基於 RO Zero ragzero.kr 資料)
const crusaderSkills: Skill[] = [
  ...swordsmanSkills, // 繼承劍士所有技能
  {
    id: 'faith',
    name: '信賴',
    icon: '🙏',
    description: '믿음 - 增加最大SP與SP回復速度',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '最大SP+200 SP回復+1' },
      { level: 5, description: '最大SP+1000 SP回復+5' },
      { level: 10, description: '最大SP+2000 SP回復+10' }
    ],
    position: { x: 7, y: 1 }
  },
  {
    id: 'auto_guard',
    name: '自動格擋',
    icon: '🛡️',
    description: '오토 가드 - 自動格擋物理攻擊',
    maxLevel: 10,
    requirements: [{ skillId: 'faith', level: 7 }],
    effects: [
      { level: 1, description: '5% 機率格擋物理攻擊' },
      { level: 5, description: '25% 機率格擋物理攻擊' },
      { level: 10, description: '50% 機率格擋物理攻擊' }
    ],
    position: { x: 7, y: 2 }
  },
  {
    id: 'shield_charge',
    name: '盾牌衝擊',
    icon: '💥',
    description: '쉴드 차지 - 用盾牌攻擊敵人',
    maxLevel: 5,
    requirements: [{ skillId: 'auto_guard', level: 5 }],
    effects: [
      { level: 1, description: '攻擊力 100% 造成暈眩' },
      { level: 3, description: '攻擊力 200% 造成暈眩' },
      { level: 5, description: '攻擊力 300% 造成暈眩' }
    ],
    position: { x: 7, y: 3 }
  },
  {
    id: 'shield_boomerang',
    name: '盾牌迴旋',
    icon: '🪃',
    description: '쉴드 부메랑 - 投擲盾牌攻擊遠距離敵人',
    maxLevel: 5,
    requirements: [{ skillId: 'shield_charge', level: 3 }],
    effects: [
      { level: 1, description: '攻擊力 130% 遠距離攻擊' },
      { level: 3, description: '攻擊力 190% 遠距離攻擊' },
      { level: 5, description: '攻擊力 250% 遠距離攻擊' }
    ],
    position: { x: 7, y: 4 }
  },
  {
    id: 'reflect_shield',
    name: '盾牌反射',
    icon: '↩️',
    description: '리플렉트 쉴드 - 反射物理攻擊傷害',
    maxLevel: 10,
    requirements: [{ skillId: 'shield_boomerang', level: 3 }],
    effects: [
      { level: 1, description: '反射13% 物理傷害' },
      { level: 5, description: '反射50% 物理傷害' },
      { level: 10, description: '反射100% 物理傷害' }
    ],
    position: { x: 7, y: 5 }
  },
  {
    id: 'holy_cross',
    name: '聖十字斬',
    icon: '✝️',
    description: '홀리 크로스 - 聖屬性攻擊',
    maxLevel: 10,
    requirements: [{ skillId: 'faith', level: 7 }],
    effects: [
      { level: 1, description: '攻擊力 135% 聖屬性攻擊' },
      { level: 5, description: '攻擊力 235% 聖屬性攻擊' },
      { level: 10, description: '攻擊力 335% 聖屬性攻擊' }
    ],
    position: { x: 8, y: 2 }
  },
  {
    id: 'grand_cross',
    name: '神聖十字',
    icon: '💫',
    description: '그랜드 크로스 - 強力聖屬性範圍攻擊',
    maxLevel: 10,
    requirements: [{ skillId: 'holy_cross', level: 6 }, { skillId: 'faith', level: 10 }, { skillId: 'auto_guard', level: 5 }],
    effects: [
      { level: 1, description: '攻擊力 140% 聖屬性 十字範圍' },
      { level: 5, description: '攻擊力 240% 聖屬性 十字範圍' },
      { level: 10, description: '攻擊力 340% 聖屬性 十字範圍' }
    ],
    position: { x: 8, y: 3 }
  },
  {
    id: 'devotion',
    name: '犧牲',
    icon: '💖',
    description: '디보션 - 代替他人承受傷害',
    maxLevel: 5,
    requirements: [{ skillId: 'grand_cross', level: 4 }, { skillId: 'reflect_shield', level: 5 }],
    effects: [
      { level: 1, description: '為1個隊友承受傷害' },
      { level: 3, description: '為3個隊友承受傷害' },
      { level: 5, description: '為5個隊友承受傷害' }
    ],
    position: { x: 8, y: 4 }
  },
  {
    id: 'providence',
    name: '神之庇護',
    icon: '🕊️',
    description: '프로비던스 - 提高對魔物與不死系的抗性',
    maxLevel: 5,
    requirements: [{ skillId: 'auto_guard', level: 5 }],
    effects: [
      { level: 1, description: '對魔物與不死系防禦力+20 魔防+20' },
      { level: 3, description: '對魔物與不死系防禦力+60 魔防+60' },
      { level: 5, description: '對魔物與不死系防禦力+100 魔防+100' }
    ],
    position: { x: 6, y: 3 }
  },
  {
    id: 'defender',
    name: '守護者',
    icon: '🛡️',
    description: '디펜더 - 大幅提升防禦力，但降低攻擊力和速度',
    maxLevel: 5,
    requirements: [{ skillId: 'shield_boomerang', level: 1 }],
    effects: [
      { level: 1, description: '防禦力+20% 攻擊力-25% 攻擊速度-25%' },
      { level: 3, description: '防禦力+60% 攻擊力-75% 攻擊速度-75%' },
      { level: 5, description: '防禦力+100% 攻擊力-125% 攻擊速度-125%' }
    ],
    position: { x: 6, y: 4 }
  },
  {
    id: 'spear_quicken',
    name: '長槍速度增加',
    icon: '⚡',
    description: '스피어 퀴큰 - 提高長槍攻擊速度',
    maxLevel: 10,
    requirements: [{ skillId: 'spear_mastery', level: 10 }],
    effects: [
      { level: 1, description: '攻擊速度+30% 持續30秒' },
      { level: 5, description: '攻擊速度+50% 持續110秒' },
      { level: 10, description: '攻擊速度+70% 持續200秒' }
    ],
    position: { x: 1, y: 6 }
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
const firstClassJobs: Job[] = [
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

// 二轉職業資料 (劍士系)
const secondClassJobs: Job[] = [
  {
    id: 'knight',
    name: '騎士',
    icon: '🏇',
    description: '나이트 - 強化近戰與騎乘戰鬥的職業',
    skills: knightSkills,
    baseSkillPoints: 49
  },
  {
    id: 'crusader',
    name: '十字軍',
    icon: '✝️',
    description: '크루세이더 - 防禦與支援專精的聖職戰士',
    skills: crusaderSkills,
    baseSkillPoints: 49
  }
]

export const jobClassesData: JobClass[] = [
  {
    id: 'first_class',
    name: '一轉職業',
    jobs: firstClassJobs
  },
  {
    id: 'second_class_swordsman',
    name: '二轉職業 - 劍士系',
    jobs: secondClassJobs
  }
]