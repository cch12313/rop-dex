const fs = require('fs');
const https = require('https');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');

async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const data = [];
      response.on('data', (chunk) => data.push(chunk));
      response.on('end', () => resolve(Buffer.concat(data)));
      response.on('error', reject);
    });
  });
}

// 從ro.ntome.com提取的劍士技能精確座標
const swordsmanSkills = [
  { name: '單手劍使用熟練度', skillId: 'SM_SWORD', position: 'background-position: 0px -52px;', x: 0, y: 52 },
  { name: '雙手劍使用熟練度', skillId: 'SM_TWOHAND', position: 'background-position: -26px -52px;', x: 26, y: 52 },
  { name: '狂擊', skillId: 'SM_BASH', position: 'background-position: -26px 0px;', x: 26, y: 0 },
  { name: '怒爆', skillId: 'SM_MAGNUM', position: 'background-position: 0px -26px;', x: 0, y: 26 },
  { name: '挑釁', skillId: 'SM_PROVOKE', position: 'background-position: -52px -26px;', x: 52, y: 26 },
  { name: '霸體', skillId: 'SM_ENDURE', position: 'background-position: -52px 0px;', x: 52, y: 0 },
  { name: '快速恢復', skillId: 'SM_RECOVERY', position: 'background-position: -78px -26px;', x: 78, y: 26 },
  { name: '移動時恢復HP', skillId: 'SM_MOVINGRECOVERY', position: 'background-position: -26px -26px;', x: 26, y: 26 },
  { name: '攻擊弱點', skillId: 'SM_FATALBLOW', position: 'background-position: -78px 0px;', x: 78, y: 0 },
  { name: '狂暴狀態', skillId: 'SM_AUTOBERSERK', position: 'background-position: 0px 0px;', x: 0, y: 0 }
];

// 從ro.ntome.com提取的騎士技能精確座標
const knightSkills = [
  { name: '雙手劍攻擊速度增加', skillId: 'KN_TWOHANDQUICKEN', position: 'background-position: -78px -52px;', x: 78, y: 52 },
  { name: '反擊', skillId: 'KN_AUTOCOUNTER', position: 'background-position: 0px 0px;', x: 0, y: 0 },
  { name: '怪物互擊', skillId: 'KN_BOWLINGBASH', position: 'background-position: -26px 0px;', x: 26, y: 0 },
  { name: '騎術', skillId: 'KN_RIDING', position: 'background-position: -78px -26px;', x: 78, y: 26 },
  { name: '騎兵修練', skillId: 'KN_CAVALIERMASTERY', position: 'background-position: -78px 0px;', x: 78, y: 0 },
  { name: '長矛使用熟練度', skillId: 'KN_SPEARMASTERY', position: 'background-position: -26px -52px;', x: 26, y: 52 },
  { name: '連刺攻擊', skillId: 'KN_SPEARSTAB', position: 'background-position: -52px -26px;', x: 52, y: 26 },
  { name: '長矛刺擊', skillId: 'KN_PIERCE', position: 'background-position: -52px -52px;', x: 52, y: 52 },
  { name: '投擲長矛攻擊', skillId: 'KN_BRANDISHSPEAR', position: 'background-position: 0px -52px;', x: 0, y: 52 },
  { name: '騎乘攻擊', skillId: 'KN_SPEARBOOMERANG', position: 'background-position: -52px 0px;', x: 52, y: 0 },
  { name: '衝鋒攻擊', skillId: 'KN_CHARGEATK', position: 'background-position: 0px -26px;', x: 0, y: 26 },
  { name: '單手劍攻擊速度增加', skillId: 'KN_ONEHAND', position: 'background-position: -26px -26px;', x: 26, y: 26 }
];

async function fixAllSkillImages() {
  try {
    console.log('🗡️ 開始修正所有劍士和騎士技能圖片...\n');
    
    // 下載sprite圖片
    console.log('📥 下載sprite圖片...');
    const smSpriteUrl = 'https://iro.ntome.com/skill/sm.png';
    const knSpriteUrl = 'https://iro.ntome.com/skill/kn.png';
    
    const [smSpriteBuffer, knSpriteBuffer] = await Promise.all([
      downloadImage(smSpriteUrl),
      downloadImage(knSpriteUrl)
    ]);
    
    const [smSpriteImage, knSpriteImage] = await Promise.all([
      loadImage(smSpriteBuffer),
      loadImage(knSpriteBuffer)
    ]);
    
    console.log('✅ Sprite圖片下載完成');
    
    // 確保輸出目錄存在
    const outputDir = '/Users/alvin.chiu56/Documents/mine/projects/ro/web/public/assets/skill-icons';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const allResults = [];
    
    // 處理劍士技能
    console.log('\n⚔️ 處理劍士技能 (sm.png):');
    for (const skill of swordsmanSkills) {
      const canvas = createCanvas(26, 26);
      const ctx = canvas.getContext('2d');
      
      // 從sprite中切割圖片
      ctx.drawImage(
        smSpriteImage,
        skill.x, skill.y, 26, 26,  // source
        0, 0, 26, 26  // destination
      );
      
      // 儲存圖片
      const outputPath = path.join(outputDir, `${skill.skillId}.png`);
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(outputPath, buffer);
      
      const result = {
        skillId: skill.skillId,
        skillName: skill.name,
        iconPath: `skill-icons/${skill.skillId}.png`,
        spriteSource: {
          imageName: 'sm.png',
          gridPosition: {
            row: skill.y / 26,
            col: skill.x / 26,
            x: skill.x,
            y: skill.y
          }
        },
        fileSize: buffer.length
      };
      
      allResults.push(result);
      console.log(`  ✅ ${skill.name} (${skill.skillId}) - ${buffer.length} bytes`);
    }
    
    // 處理騎士技能
    console.log('\n🏇 處理騎士技能 (kn.png):');
    for (const skill of knightSkills) {
      const canvas = createCanvas(26, 26);
      const ctx = canvas.getContext('2d');
      
      // 從sprite中切割圖片
      ctx.drawImage(
        knSpriteImage,
        skill.x, skill.y, 26, 26,  // source
        0, 0, 26, 26  // destination
      );
      
      // 儲存圖片
      const outputPath = path.join(outputDir, `${skill.skillId}.png`);
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(outputPath, buffer);
      
      const result = {
        skillId: skill.skillId,
        skillName: skill.name,
        iconPath: `skill-icons/${skill.skillId}.png`,
        spriteSource: {
          imageName: 'kn.png',
          gridPosition: {
            row: skill.y / 26,
            col: skill.x / 26,
            x: skill.x,
            y: skill.y
          }
        },
        fileSize: buffer.length
      };
      
      allResults.push(result);
      console.log(`  ✅ ${skill.name} (${skill.skillId}) - ${buffer.length} bytes`);
    }
    
    // 更新 skill-image-mapping.json
    console.log('\n📝 更新 skill-image-mapping.json...');
    const mappingPath = '/Users/alvin.chiu56/Documents/mine/projects/ro/web/public/assets/skill-image-mapping.json';
    
    let existingMapping = { metadata: {}, skills: [] };
    if (fs.existsSync(mappingPath)) {
      existingMapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
    }
    
    // 移除舊的劍士和騎士技能資料
    const skillIds = [...swordsmanSkills, ...knightSkills].map(s => s.skillId);
    existingMapping.skills = existingMapping.skills.filter(skill => !skillIds.includes(skill.skillId));
    
    // 加入新的技能資料
    existingMapping.skills.push(...allResults);
    
    // 更新metadata
    existingMapping.metadata = {
      createdAt: new Date().toISOString(),
      totalSkills: existingMapping.skills.length,
      successCount: existingMapping.skills.length,
      failCount: 0,
      note: "Complete fix for all Swordsman and Knight skills based on ro.ntome.com analysis"
    };
    
    fs.writeFileSync(mappingPath, JSON.stringify(existingMapping, null, 2));
    
    console.log('✅ skill-image-mapping.json 更新完成');
    console.log(`\n🎯 總結:`);
    console.log(`   - 劍士技能: ${swordsmanSkills.length} 個`);
    console.log(`   - 騎士技能: ${knightSkills.length} 個`);
    console.log(`   - 總計修正: ${allResults.length} 個技能圖片`);
    console.log(`   - 映射檔案已更新，包含 ${existingMapping.skills.length} 個技能`);
    
  } catch (error) {
    console.error('❌ 修正技能圖片時發生錯誤:', error);
  }
}

// 執行修正
fixAllSkillImages();