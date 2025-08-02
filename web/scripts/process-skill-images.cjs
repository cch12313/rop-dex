#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// 所有劍士和騎士技能的圖片資料（基於 skillNameMapping 擴展）
const skillImagesData = [
  // 劍士技能 (sm.png) - 基於已知位置擴展完整的劍士技能
  { skillId: "SM_SWORD", skillName: "單手劍使用熟練度", imageName: "sm.png", imageUrl: "https://iro.ntome.com/skill/sm.png", position: { x: 0, y: -52 } },
  { skillId: "SM_RECOVERY", skillName: "快速恢復", imageName: "sm.png", imageUrl: "https://iro.ntome.com/skill/sm.png", position: { x: -26, y: -52 } },
  { skillId: "SM_BASH", skillName: "狂擊", imageName: "sm.png", imageUrl: "https://iro.ntome.com/skill/sm.png", position: { x: -52, y: -52 } },
  { skillId: "SM_PROVOKE", skillName: "挑釁", imageName: "sm.png", imageUrl: "https://iro.ntome.com/skill/sm.png", position: { x: -78, y: -52 } },
  { skillId: "SM_AUTOBERSERK", skillName: "狂暴狀態", imageName: "sm.png", imageUrl: "https://iro.ntome.com/skill/sm.png", position: { x: -104, y: -52 } },
  { skillId: "SM_MOVINGRECOVERY", skillName: "移動時恢復HP", imageName: "sm.png", imageUrl: "https://iro.ntome.com/skill/sm.png", position: { x: 0, y: -78 } },
  { skillId: "SM_TWOHAND", skillName: "雙手劍使用熟練度", imageName: "sm.png", imageUrl: "https://iro.ntome.com/skill/sm.png", position: { x: -26, y: -78 } },
  { skillId: "SM_MAGNUM", skillName: "怒爆", imageName: "sm.png", imageUrl: "https://iro.ntome.com/skill/sm.png", position: { x: -52, y: -78 } },
  { skillId: "SM_ENDURE", skillName: "霸體", imageName: "sm.png", imageUrl: "https://iro.ntome.com/skill/sm.png", position: { x: -78, y: -78 } },
  { skillId: "SM_FATALBLOW", skillName: "攻擊弱點", imageName: "sm.png", imageUrl: "https://iro.ntome.com/skill/sm.png", position: { x: -104, y: -78 } },

  // 騎士技能 (kn.png) - 包含所有騎士技能
  { skillId: "KN_SPEARMASTERY", skillName: "長矛使用熟練度", imageName: "kn.png", imageUrl: "https://iro.ntome.com/skill/kn.png", position: { x: 0, y: -52 } },
  { skillId: "KN_TWOHANDQUICKEN", skillName: "雙手劍攻擊速度增加", imageName: "kn.png", imageUrl: "https://iro.ntome.com/skill/kn.png", position: { x: -26, y: -52 } },
  { skillId: "KN_AUTOCOUNTER", skillName: "反擊", imageName: "kn.png", imageUrl: "https://iro.ntome.com/skill/kn.png", position: { x: -52, y: -52 } },
  { skillId: "KN_RIDING", skillName: "騎術", imageName: "kn.png", imageUrl: "https://iro.ntome.com/skill/kn.png", position: { x: -78, y: -52 } },
  { skillId: "KN_PIERCE", skillName: "長矛刺擊", imageName: "kn.png", imageUrl: "https://iro.ntome.com/skill/kn.png", position: { x: -104, y: -52 } },
  { skillId: "KN_CHARGEATK", skillName: "衝鋒攻擊", imageName: "kn.png", imageUrl: "https://iro.ntome.com/skill/kn.png", position: { x: 0, y: -78 } },
  { skillId: "KN_BOWLINGBASH", skillName: "怪物互擊", imageName: "kn.png", imageUrl: "https://iro.ntome.com/skill/kn.png", position: { x: -26, y: -78 } },
  { skillId: "KN_CAVALIERMASTERY", skillName: "騎兵修練", imageName: "kn.png", imageUrl: "https://iro.ntome.com/skill/kn.png", position: { x: -52, y: -78 } },
  { skillId: "KN_SPEARBOOMERANG", skillName: "騎乘攻擊", imageName: "kn.png", imageUrl: "https://iro.ntome.com/skill/kn.png", position: { x: -78, y: -78 } },
  { skillId: "KN_SPEARSTAB", skillName: "連刺攻擊", imageName: "kn.png", imageUrl: "https://iro.ntome.com/skill/kn.png", position: { x: -104, y: -78 } },
  { skillId: "KN_BRANDISHSPEAR", skillName: "投擲長矛攻擊", imageName: "kn.png", imageUrl: "https://iro.ntome.com/skill/kn.png", position: { x: 0, y: -104 } }
];

// 唯一的 Sprite 圖片清單
const uniqueSprites = [
  { name: "sm.png", url: "https://iro.ntome.com/skill/sm.png" },
  { name: "kn.png", url: "https://iro.ntome.com/skill/kn.png" },
  { name: "lk.png", url: "https://iro.ntome.com/skill/lk.png" },
  { name: "rk.png", url: "https://iro.ntome.com/skill/rk.png" },
  { name: "all.png", url: "https://iro.ntome.com/skill/all.png" },
  { name: "dk.png", url: "https://iro.ntome.com/skill/dk.png" }
];

// 建立必要的目錄
const assetsDir = path.join(__dirname, '../assets');
const spritesDir = path.join(assetsDir, 'sprites');
const skillIconsDir = path.join(assetsDir, 'skill-icons');

[assetsDir, spritesDir, skillIconsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 下載檔案函數
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', reject);
    }).on('error', reject);
  });
}

// 切割技能圖片函數
async function cropSkillIcon(spritePath, outputPath, x, y, width = 26, height = 26) {
  try {
    const image = await loadImage(spritePath);
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // 將負座標轉換為正座標 (CSS background-position 的負值代表往右下移動)
    const sourceX = Math.abs(x);
    const sourceY = Math.abs(y);
    
    // 從 sprite 圖片中裁切指定區域
    ctx.drawImage(image, sourceX, sourceY, width, height, 0, 0, width, height);
    
    // 儲存為 PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    
    return true;
  } catch (error) {
    console.error(`Error cropping skill icon: ${error.message}`);
    return false;
  }
}

// 主要處理函數
async function processSkillImages() {
  console.log('🚀 開始處理技能圖片...');
  
  // 步驟 1: 下載所有 sprite 圖片
  console.log('\n📥 下載 Sprite 圖片...');
  for (const sprite of uniqueSprites) {
    const destPath = path.join(spritesDir, sprite.name);
    if (!fs.existsSync(destPath)) {
      console.log(`  下載中: ${sprite.name}`);
      try {
        await downloadFile(sprite.url, destPath);
        console.log(`  ✅ 完成: ${sprite.name}`);
      } catch (error) {
        console.error(`  ❌ 失敗: ${sprite.name} - ${error.message}`);
      }
    } else {
      console.log(`  ⏭️  已存在: ${sprite.name}`);
    }
  }
  
  // 步驟 2: 切割個別技能圖片
  console.log('\n✂️  切割技能圖片...');
  let successCount = 0;
  let failCount = 0;
  
  for (const skill of skillImagesData) {
    const spritePath = path.join(spritesDir, skill.imageName);
    const outputPath = path.join(skillIconsDir, `${skill.skillId}.png`);
    
    if (!fs.existsSync(spritePath)) {
      console.log(`  ❌ Sprite 不存在: ${skill.imageName}`);
      failCount++;
      continue;
    }
    
    console.log(`  處理中: ${skill.skillId} (${skill.skillName})`);
    const success = await cropSkillIcon(
      spritePath,
      outputPath,
      skill.position.x,
      skill.position.y
    );
    
    if (success) {
      console.log(`  ✅ 完成: ${skill.skillId}.png`);
      successCount++;
    } else {
      console.log(`  ❌ 失敗: ${skill.skillId}.png`);
      failCount++;
    }
  }
  
  // 步驟 3: 生成對應表
  console.log('\n📋 生成技能圖片對應表...');
  const mappingData = {
    metadata: {
      createdAt: new Date().toISOString(),
      totalSkills: skillImagesData.length,
      successCount,
      failCount
    },
    skills: skillImagesData.map(skill => ({
      skillId: skill.skillId,
      skillName: skill.skillName,
      iconPath: `skill-icons/${skill.skillId}.png`,
      spriteSource: {
        imageName: skill.imageName,
        position: skill.position
      }
    }))
  };
  
  const mappingPath = path.join(assetsDir, 'skill-image-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(mappingData, null, 2));
  console.log(`  ✅ 對應表已儲存: ${mappingPath}`);
  
  // 總結
  console.log('\n🎉 處理完成!');
  console.log(`📊 統計:`);
  console.log(`  - 成功: ${successCount}`);
  console.log(`  - 失敗: ${failCount}`);
  console.log(`  - 總計: ${skillImagesData.length}`);
  console.log(`📁 檔案位置:`);
  console.log(`  - Sprite 圖片: ${spritesDir}`);
  console.log(`  - 技能圖片: ${skillIconsDir}`);
  console.log(`  - 對應表: ${mappingPath}`);
}

// 執行處理
if (require.main === module) {
  processSkillImages().catch(console.error);
}

module.exports = { processSkillImages, skillImagesData };