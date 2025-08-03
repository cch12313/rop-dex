const playwright = require('playwright');
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

const SKILL_MAPPING = {
  // 十字軍專屬技能
  "自動防禦": "CR_AUTOGUARD",
  "盾擊": "CR_SHIELDCHARGE", 
  "迴旋盾擊": "CR_SHIELDBOOMERANG",
  "光之盾": "CR_REFLECTSHIELD",
  "反射盾": "CR_REFLECTSHIELD_ALT",
  "信任": "CR_TRUST",
  "聖十字攻擊": "CR_HOLYCROSS",
  "聖十字審判": "CR_GRANDCROSS",
  "犧牲": "CR_SACRIFICE",
  "神祐之光": "CR_PROVIDENCE",
  "長矛加速術": "CR_SPEARQUICKEN",
  "退縮": "CR_SHRINK",
  
  // 侍僧技能
  "治療術": "AL_HEAL",
  "天使之護": "AL_BLESSING", 
  "天使之擊": "AL_HOLYLIGHT",
  "治癒術": "AL_CURE",
  
  // 騎士共用技能
  "長矛使用熟練度": "KN_SPEARMASTERY",
  "騎乘術": "KN_RIDING",
  "騎兵修練": "KN_CAVALIERMASTERY"
};

const SKILL_PRIORITIES = {
  // Crusader 獨有技能優先
  "CR_AUTOGUARD": 1,
  "CR_SHIELDCHARGE": 1,
  "CR_HOLYCROSS": 1,
  "CR_SHIELDBOOMERANG": 1,
  "CR_GRANDCROSS": 1,
  "CR_DEVOTION": 1,
  "CR_PROVIDENCE": 1,
  "CR_DEFENDER": 1,
  "CR_SPEARQUICKEN": 1,
  // 基礎服事技能
  "AL_HEAL": 2,
  "AL_INCAGI": 2,
  "AL_BLESSING": 2,
  "AL_HOLYLIGHT": 2,
  "AL_TELEPORT": 2,
  "AL_WARP": 2,
  "AL_PNEUMA": 2,
  "AL_CURE": 2,
  // 騎士共享技能
  "KN_SPEARMASTERY": 3,
  "KN_RIDING": 3
};

async function processCrusaderSkills() {
  console.log('\n🔄 開始處理十字軍技能圖片...\n');
  
  // 讀取已有的技能對應資料
  const mappingPath = path.join(__dirname, '../public/assets/skill-image-mapping.json');
  let existingMapping = { metadata: {}, skills: [] };
  
  if (fs.existsSync(mappingPath)) {
    existingMapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
  }

  // 使用預定義的技能資料 (從 ro.ntome.com/skill/cr 網頁提取)
  const skillsData = [
    { skillName: "自動防禦", imageName: "cr.png", x: 0, y: 26 },
    { skillName: "盾擊", imageName: "cr.png", x: 0, y: 78 },
    { skillName: "迴旋盾擊", imageName: "cr.png", x: 78, y: 52 },
    { skillName: "光之盾", imageName: "cr.png", x: 26, y: 26 },
    { skillName: "反射盾", imageName: "cr.png", x: 52, y: 52 },
    { skillName: "信任", imageName: "cr.png", x: 78, y: 78 },
    { skillName: "聖十字攻擊", imageName: "cr.png", x: 0, y: 52 },
    { skillName: "聖十字審判", imageName: "cr.png", x: 78, y: 26 },
    { skillName: "犧牲", imageName: "cr.png", x: 52, y: 26 },
    { skillName: "治療術", imageName: "al.png", x: 78, y: 0 },
    { skillName: "天使之護", imageName: "al.png", x: 52, y: 26 },
    { skillName: "天使之擊", imageName: "al.png", x: 26, y: 26 },
    { skillName: "治癒術", imageName: "al.png", x: 78, y: 26 },
    { skillName: "神祐之光", imageName: "cr.png", x: 26, y: 52 },
    { skillName: "長矛使用熟練度", imageName: "kn.png", x: 26, y: 52 },
    { skillName: "長矛加速術", imageName: "cr.png", x: 52, y: 78 },
    { skillName: "騎乘術", imageName: "kn.png", x: 78, y: 26 },
    { skillName: "騎兵修練", imageName: "kn.png", x: 78, y: 0 },
    { skillName: "退縮", imageName: "cr.png", x: 26, y: 78 }
  ];
  
  console.log(`📊 找到 ${skillsData.length} 個技能:`, skillsData.map(s => s.skillName).join(', '));
  
  // 下載需要的sprite圖片
  const spriteFiles = ['cr.png', 'al.png', 'kn.png'];
  const assetsDir = path.join(__dirname, '../public/assets');
  const iconsDir = path.join(assetsDir, 'skill-icons');
  
  // 確保目錄存在
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }
  
  for (const spriteFile of spriteFiles) {
    const spritePath = path.join(assetsDir, spriteFile);
    if (!fs.existsSync(spritePath)) {
      console.log(`⬇️ 下載 ${spriteFile}...`);
      const response = await fetch(`https://iro.ntome.com/skill/${spriteFile}`);
      const buffer = await response.arrayBuffer();
      fs.writeFileSync(spritePath, Buffer.from(buffer));
    }
  }
  
  // 處理每個技能圖片
  const processedSkills = [];
  let successCount = 0;
  let failCount = 0;
  
  for (const skillData of skillsData) {
    try {
      // 找到對應的技能ID
      const skillId = SKILL_MAPPING[skillData.skillName];
      if (!skillId) {
        console.log(`⚠️ 跳過未對應的技能: ${skillData.skillName}`);
        continue;
      }
      
      // 檢查是否是重複技能（選擇優先級較高的）
      const existingSkill = processedSkills.find(s => s.skillId === skillId);
      if (existingSkill) {
        const currentPriority = SKILL_PRIORITIES[skillId] || 999;
        const existingPriority = SKILL_PRIORITIES[existingSkill.skillId] || 999;
        
        if (currentPriority >= existingPriority) {
          console.log(`⚠️ 跳過重複技能: ${skillData.skillName} (已有更高優先級)`);
          continue;
        } else {
          // 移除較低優先級的技能
          const index = processedSkills.findIndex(s => s.skillId === skillId);
          processedSkills.splice(index, 1);
          console.log(`🔄 替換較低優先級技能: ${skillData.skillName}`);
        }
      }
      
      console.log(`🎯 處理技能: ${skillData.skillName} (${skillId}) - ${skillData.imageName}`);
      
      // 載入對應的sprite圖片
      const spritePath = path.join(assetsDir, skillData.imageName);
      if (!fs.existsSync(spritePath)) {
        console.log(`❌ Sprite圖片不存在: ${skillData.imageName}`);
        failCount++;
        continue;
      }
      
      const spriteImage = await loadImage(spritePath);
      
      // 建立26x26的畫布
      const canvas = createCanvas(26, 26);
      const ctx = canvas.getContext('2d');
      
      // 從sprite圖片中切割指定區域
      ctx.drawImage(
        spriteImage,
        skillData.x, skillData.y, 26, 26,  // 來源區域
        0, 0, 26, 26  // 目標區域
      );
      
      // 儲存圖片
      const iconPath = path.join(iconsDir, `${skillId}.png`);
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(iconPath, buffer);
      
      // 記錄處理資訊
      const skillInfo = {
        skillId,
        skillName: skillData.skillName,
        iconPath: `skill-icons/${skillId}.png`,
        spriteSource: {
          imageName: skillData.imageName,
          gridPosition: {
            row: Math.floor(skillData.y / 26),
            col: Math.floor(skillData.x / 26),
            x: skillData.x,
            y: skillData.y
          }
        },
        fileSize: buffer.length
      };
      
      processedSkills.push(skillInfo);
      successCount++;
      
      console.log(`✅ 成功: ${skillId}.png (${buffer.length} bytes)`);
      
    } catch (error) {
      console.error(`❌ 處理失敗: ${skillData.skillName}`, error.message);
      failCount++;
    }
  }
  
  // 合併到現有的對應表中
  const updatedSkills = [...existingMapping.skills];
  
  // 移除舊的十字軍技能
  const crusaderSkillIds = Object.values(SKILL_MAPPING);
  for (let i = updatedSkills.length - 1; i >= 0; i--) {
    if (crusaderSkillIds.includes(updatedSkills[i].skillId)) {
      updatedSkills.splice(i, 1);
    }
  }
  
  // 添加新處理的技能
  updatedSkills.push(...processedSkills);
  
  // 更新對應表
  const updatedMapping = {
    metadata: {
      createdAt: new Date().toISOString(),
      totalSkills: updatedSkills.length,
      successCount: existingMapping.metadata.successCount - crusaderSkillIds.length + successCount,
      failCount: existingMapping.metadata.failCount + failCount,
      note: "Added Crusader skills based on ro.ntome.com analysis"
    },
    skills: updatedSkills
  };
  
  fs.writeFileSync(mappingPath, JSON.stringify(updatedMapping, null, 2));
  
  console.log('\n📊 十字軍技能處理完成:');
  console.log(`✅ 成功: ${successCount} 個技能`);
  console.log(`❌ 失敗: ${failCount} 個技能`);
  console.log(`📁 總技能數: ${updatedMapping.metadata.totalSkills} 個`);
  console.log(`📄 對應表已更新: ${mappingPath}`);
  
  return processedSkills;
}

// 執行
processCrusaderSkills().catch(console.error);