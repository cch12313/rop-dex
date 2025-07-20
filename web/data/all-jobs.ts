import type { JobClass, Job, Skill } from '~/types/skill'

// 基於 RO Zero ragzero.kr 的完整職業和技能資料

// 初心者技能
const noviceSkills: Skill[] = [
  {
    id: 'first_aid',
    name: '急救術',
    icon: '🏥',
    description: '응급치료 - 恢復少量HP，不需要道具',
    maxLevel: 1,
    requirements: [],
    effects: [
      { level: 1, description: '恢復 5% 最大HP' }
    ],
    position: { x: 7, y: 1 }
  },
  {
    id: 'play_dead',
    name: '裝死',
    icon: '💀',
    description: '죽은척하기 - 假裝死亡，避免怪物攻擊',
    maxLevel: 1,
    requirements: [],
    effects: [
      { level: 1, description: '假裝死亡30秒，無法移動和攻擊' }
    ],
    position: { x: 14, y: 1 }
  }
]

// 劍士技能 (已有的資料)
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

// 法師技能
const mageSkills: Skill[] = [
  {
    id: 'stone_curse',
    name: '石化術',
    icon: '🗿',
    description: '스톤커스 - 使敵人石化',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '石化機率 24%' },
      { level: 5, description: '石化機率 40%' },
      { level: 10, description: '石化機率 60%' }
    ],
    position: { x: 1, y: 1 }
  },
  {
    id: 'cold_bolt',
    name: '冰箭術',
    icon: '🧊',
    description: '콜드볼트 - 發射冰箭攻擊單一目標',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '1回攻擊 SP消耗:12' },
      { level: 5, description: '5回攻擊 SP消耗:20' },
      { level: 10, description: '10回攻擊 SP消耗:30' }
    ],
    position: { x: 2, y: 1 }
  },
  {
    id: 'lightning_bolt',
    name: '雷電術',
    icon: '⚡',
    description: '라이트닝볼트 - 發射雷電攻擊單一目標',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '1回攻擊 SP消耗:12' },
      { level: 5, description: '5回攻擊 SP消耗:20' },
      { level: 10, description: '10回攻擊 SP消耗:30' }
    ],
    position: { x: 3, y: 1 }
  },
  {
    id: 'napalm_beat',
    name: '靈魂攻擊',
    icon: '👻',
    description: '네이팜비트 - 靈力攻擊，範圍傷害',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: 'MATK 80% SP消耗:9' },
      { level: 5, description: 'MATK 120% SP消耗:12' },
      { level: 10, description: 'MATK 170% SP消耗:18' }
    ],
    position: { x: 4, y: 1 }
  },
  {
    id: 'fire_bolt',
    name: '火箭術',
    icon: '🔥',
    description: '화이어볼트 - 發射火箭攻擊單一目標',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '1回攻擊 SP消耗:12' },
      { level: 5, description: '5回攻擊 SP消耗:20' },
      { level: 10, description: '10回攻擊 SP消耗:30' }
    ],
    position: { x: 5, y: 1 }
  },
  {
    id: 'sight',
    name: '偵測',
    icon: '👁️',
    description: '사이트 - 顯示隱藏的敵人',
    maxLevel: 1,
    requirements: [],
    effects: [
      { level: 1, description: 'SP10 10秒 範圍7x7' }
    ],
    position: { x: 6, y: 1 }
  },
  {
    id: 'sp_recovery',
    name: 'SP回復術',
    icon: '💙',
    description: 'SP회복력 향상 - 增加SP自然回復速度',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '10秒回復 SP +(3 + 最大SP的0.2%)' },
      { level: 5, description: '10秒回復 SP +(15 + 最大SP的1.0%)' },
      { level: 10, description: '10秒回復 SP +(30 + 最大SP的2.0%)' }
    ],
    position: { x: 15, y: 1 }
  }
]

// 弓箭手技能
const archerSkills: Skill[] = [
  {
    id: 'double_strafing',
    name: '二連射',
    icon: '🏹',
    description: '더블 스트레이핑 - 快速射出兩發箭矢',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: 'ATK 100% X 2回 SP消耗:12' },
      { level: 5, description: 'ATK 140% X 2回 SP消耗:12' },
      { level: 10, description: 'ATK 190% X 2回 SP消耗:12' }
    ],
    position: { x: 2, y: 1 }
  },
  {
    id: 'owls_eye',
    name: '鷹眼',
    icon: '🦅',
    description: '올빼미의 눈 - 增加DEX',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: 'DEX +1' },
      { level: 5, description: 'DEX +5' },
      { level: 10, description: 'DEX +10' }
    ],
    position: { x: 3, y: 1 }
  },
  {
    id: 'charge_arrow',
    name: '衝擊箭',
    icon: '💥',
    description: '차지 애로우 - 擊退敵人的強力射擊',
    maxLevel: 1,
    requirements: [],
    effects: [
      { level: 1, description: 'ATK 150% 擊退4格 SP消耗:15' }
    ],
    position: { x: 5, y: 1 }
  },
  {
    id: 'arrow_shower',
    name: '箭雨',
    icon: '☔',
    description: '애로우 샤워 - 範圍攻擊技能',
    maxLevel: 10,
    requirements: [{ skillId: 'double_strafing', level: 5 }],
    effects: [
      { level: 1, description: 'ATK 160% 範圍3x3' },
      { level: 5, description: 'ATK 200% 範圍3x3' },
      { level: 10, description: 'ATK 250% 範圍3x3' }
    ],
    position: { x: 9, y: 1 }
  },
  {
    id: 'vulture_eye',
    name: '禿鷹眼',
    icon: '🔭',
    description: '독수리의 눈 - 增加弓箭射程和命中率',
    maxLevel: 10,
    requirements: [{ skillId: 'owls_eye', level: 3 }],
    effects: [
      { level: 1, description: '射程+1 命中率+1%' },
      { level: 5, description: '射程+5 命中率+5%' },
      { level: 10, description: '射程+10 命中率+10%' }
    ],
    position: { x: 10, y: 1 }
  },
  {
    id: 'making_arrow',
    name: '製造箭矢',
    icon: '🏹',
    description: '화살 만들기 - 將道具轉換為箭矢',
    maxLevel: 1,
    requirements: [],
    effects: [
      { level: 1, description: 'SP10 將道具轉換為箭矢' }
    ],
    position: { x: 12, y: 1 }
  },
  {
    id: 'concentration',
    name: '專注',
    icon: '🎯',
    description: '집중력 향상 - 提高DEX和AGI',
    maxLevel: 10,
    requirements: [{ skillId: 'vulture_eye', level: 1 }],
    effects: [
      { level: 1, description: 'DEX AGI +3% 持續60秒' },
      { level: 5, description: 'DEX AGI +7% 持續140秒' },
      { level: 10, description: 'DEX AGI +12% 持續240秒' }
    ],
    position: { x: 17, y: 1 }
  }
]

// 服事技能
const acolyteSkills: Skill[] = [
  {
    id: 'ruwach',
    name: '顯現',
    icon: '✨',
    description: '루아흐 - 顯示隱藏敵人並造成傷害',
    maxLevel: 1,
    requirements: [],
    effects: [
      { level: 1, description: 'SP10 10秒 範圍5x5 MATK145%' }
    ],
    position: { x: 1, y: 1 }
  },
  {
    id: 'heal',
    name: '治癒術',
    icon: '💚',
    description: '힐 - 恢復目標HP',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '基本回復量+INT+武器MATK' },
      { level: 5, description: '基本回復量+INT+武器MATK' },
      { level: 10, description: '基本回復量+INT+武器MATK' }
    ],
    position: { x: 2, y: 1 }
  },
  {
    id: 'holy_water',
    name: '聖水製造',
    icon: '💧',
    description: '성수 만들기 - 製造聖水',
    maxLevel: 1,
    requirements: [],
    effects: [
      { level: 1, description: '製造聖水(需要空瓶)' }
    ],
    position: { x: 3, y: 1 }
  },
  {
    id: 'mace_mastery',
    name: '鈍器修練',
    icon: '🔨',
    description: '메이스 마스터리 - 增加鈍器攻擊力',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '鈍器攻擊力+3' },
      { level: 5, description: '鈍器攻擊力+15' },
      { level: 10, description: '鈍器攻擊力+30' }
    ],
    position: { x: 4, y: 1 }
  },
  {
    id: 'divine_protection',
    name: '神聖攻擊',
    icon: '⚔️',
    description: '디바인 프로텍션 - 對不死系額外傷害',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '對不死系攻擊力+3' },
      { level: 5, description: '對不死系攻擊力+15' },
      { level: 10, description: '對不死系攻擊力+30' }
    ],
    position: { x: 5, y: 1 }
  }
]

// 商人技能
const merchantSkills: Skill[] = [
  {
    id: 'increase_weight',
    name: '負重增加',
    icon: '🎒',
    description: '소지량 증가 - 增加負重上限',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '負重+200' },
      { level: 5, description: '負重+1000' },
      { level: 10, description: '負重+2000' }
    ],
    position: { x: 1, y: 1 }
  },
  {
    id: 'axe_mastery',
    name: '斧頭修練',
    icon: '🪓',
    description: '도끼 수련 - 增加斧頭攻擊力',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '斧頭攻擊力+3' },
      { level: 5, description: '斧頭攻擊力+15' },
      { level: 10, description: '斧頭攻擊力+30' }
    ],
    position: { x: 2, y: 1 }
  },
  {
    id: 'mammonite',
    name: '金錢攻擊',
    icon: '💰',
    description: '맘모나이트 - 消耗金錢的強力攻擊',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: 'ATK 150% 消耗500z' },
      { level: 5, description: 'ATK 250% 消耗2500z' },
      { level: 10, description: 'ATK 400% 消耗5000z' }
    ],
    position: { x: 3, y: 1 }
  },
  {
    id: 'loud_exclamation',
    name: '大聲叫喊',
    icon: '📢',
    description: '큰소리 - 增加STR',
    maxLevel: 1,
    requirements: [],
    effects: [
      { level: 1, description: 'STR+4 持續300秒' }
    ],
    position: { x: 5, y: 1 }
  },
  {
    id: 'item_appraisal',
    name: '物品鑑定',
    icon: '🔍',
    description: '아이템 감정 - 鑑定未知物品',
    maxLevel: 1,
    requirements: [],
    effects: [
      { level: 1, description: '鑑定未知物品' }
    ],
    position: { x: 6, y: 1 }
  },
  {
    id: 'discount',
    name: '折扣',
    icon: '💸',
    description: '디스카운트 - 購買物品時獲得折扣',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '購買折扣-2%' },
      { level: 5, description: '購買折扣-10%' },
      { level: 10, description: '購買折扣-20%' }
    ],
    position: { x: 8, y: 1 }
  },
  {
    id: 'pushcart',
    name: '手推車',
    icon: '🛒',
    description: '푸쉬카트 - 使用手推車',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '可使用手推車 負重+800' },
      { level: 5, description: '可使用手推車 負重+4000' },
      { level: 10, description: '可使用手推車 負重+8000' }
    ],
    position: { x: 9, y: 1 }
  }
]

// 盜賊技能
const thiefSkills: Skill[] = [
  {
    id: 'double_attack',
    name: '二刀流',
    icon: '⚔️',
    description: '이도류 - 單手劍有機率二連擊',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '5% 機率二連擊' },
      { level: 5, description: '25% 機率二連擊' },
      { level: 10, description: '50% 機率二連擊' }
    ],
    position: { x: 1, y: 1 }
  },
  {
    id: 'steal',
    name: '偷竊',
    icon: '🤏',
    description: '스틸 - 偷取敵人物品',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '偷竊成功率+3%' },
      { level: 5, description: '偷竊成功率+15%' },
      { level: 10, description: '偷竊成功率+30%' }
    ],
    position: { x: 2, y: 1 }
  },
  {
    id: 'envenom',
    name: '塗毒',
    icon: '☠️',
    description: '인베놈 - 武器附加毒屬性',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '毒屬性攻擊 持續15秒' },
      { level: 5, description: '毒屬性攻擊 持續75秒' },
      { level: 10, description: '毒屬性攻擊 持續150秒' }
    ],
    position: { x: 3, y: 1 }
  },
  {
    id: 'sprinkle_sand',
    name: '撒沙',
    icon: '💨',
    description: '모래뿌리기 - 降低敵人命中率',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '命中率-10 持續10秒' },
      { level: 5, description: '命中率-50 持續50秒' },
      { level: 10, description: '命中率-100 持續100秒' }
    ],
    position: { x: 4, y: 1 }
  },
  {
    id: 'throw_stone',
    name: '投石',
    icon: '🪨',
    description: '돌던지기 - 遠距離攻擊技能',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: 'ATK 30 射程7' },
      { level: 5, description: 'ATK 70 射程7' },
      { level: 10, description: 'ATK 120 射程7' }
    ],
    position: { x: 5, y: 1 }
  },
  {
    id: 'improve_dodge',
    name: '迴避提升',
    icon: '🏃',
    description: '회피율 증가 - 增加迴避率',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '迴避率+1' },
      { level: 5, description: '迴避率+5' },
      { level: 10, description: '迴避率+10' }
    ],
    position: { x: 8, y: 1 }
  },
  {
    id: 'hiding',
    name: '隱藏',
    icon: '👻',
    description: '하이딩 - 隱身技能',
    maxLevel: 10,
    requirements: [],
    effects: [
      { level: 1, description: '隱身30秒' },
      { level: 5, description: '隱身150秒' },
      { level: 10, description: '隱身300秒' }
    ],
    position: { x: 9, y: 1 }
  }
]

// 騎士技能 (繼承劍士所有技能)
const knightSkills: Skill[] = [
  ...swordsmanSkills,
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

// 十字軍技能 (繼承劍士所有技能)
const crusaderSkills: Skill[] = [
  ...swordsmanSkills,
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
  }
]

// 職業資料
const allJobs: Job[] = [
  // 一轉職業
  {
    id: 'novice',
    name: '初心者',
    icon: '👶',
    description: '노비스 - 所有職業的起點',
    skills: noviceSkills,
    baseSkillPoints: 9
  },
  {
    id: 'swordsman',
    name: '劍士',
    icon: '⚔️',
    description: '검사 - 近戰物理攻擊職業',
    skills: swordsmanSkills,
    baseSkillPoints: 49
  },
  {
    id: 'mage',
    name: '法師',
    icon: '🧙‍♂️',
    description: '마법사 - 遠程魔法攻擊職業',
    skills: mageSkills,
    baseSkillPoints: 49
  },
  {
    id: 'archer',
    name: '弓箭手',
    icon: '🏹',
    description: '궁수 - 遠程物理攻擊職業',
    skills: archerSkills,
    baseSkillPoints: 49
  },
  {
    id: 'acolyte',
    name: '服事',
    icon: '🙏',
    description: '복사 - 支援與治療職業',
    skills: acolyteSkills,
    baseSkillPoints: 49
  },
  {
    id: 'merchant',
    name: '商人',
    icon: '💰',
    description: '상인 - 商業與生產職業',
    skills: merchantSkills,
    baseSkillPoints: 49
  },
  {
    id: 'thief',
    name: '盜賊',
    icon: '🗡️',
    description: '도둑 - 敏捷與暗殺職業',
    skills: thiefSkills,
    baseSkillPoints: 49
  },
  // 二轉職業
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

// 職業分類資料
export const jobClassesData: JobClass[] = [
  {
    id: 'swordsman_class',
    name: '劍士系職業',
    jobs: allJobs.filter(job => ['knight', 'crusader'].includes(job.id))
  },
  {
    id: 'mage_class',
    name: '法師系職業',
    jobs: allJobs.filter(job => ['mage'].includes(job.id))
  },
  {
    id: 'archer_class',
    name: '弓箭手系職業',
    jobs: allJobs.filter(job => ['archer'].includes(job.id))
  },
  {
    id: 'acolyte_class',
    name: '服事系職業',
    jobs: allJobs.filter(job => ['acolyte'].includes(job.id))
  },
  {
    id: 'merchant_class',
    name: '商人系職業',
    jobs: allJobs.filter(job => ['merchant'].includes(job.id))
  },
  {
    id: 'thief_class',
    name: '盜賊系職業',
    jobs: allJobs.filter(job => ['thief'].includes(job.id))
  }
]

// 職業繼承關係
export const jobInheritance = {
  knight: 'swordsman',
  crusader: 'swordsman',
  wizard: 'mage',
  sage: 'mage',
  hunter: 'archer',
  bard: 'archer',
  dancer: 'archer',
  priest: 'acolyte',
  monk: 'acolyte',
  blacksmith: 'merchant',
  alchemist: 'merchant',
  assassin: 'thief',
  rogue: 'thief'
}