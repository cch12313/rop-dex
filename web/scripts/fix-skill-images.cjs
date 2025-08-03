#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// 正確的技能圖片座標對應 (基於 26x26 像素格子)
const correctSkillImagesData = [
  // 劍士技能 - 從左到右，從上到下的座標（以0為起點）
  { skillId: "SM_SWORD", skillName: "單手劍使用熟練度", imageName: "sm.png", row: 0, col: 0 },
  { skillId: "SM_RECOVERY", skillName: "快速恢復", imageName: "sm.png", row: 0, col: 1 },
  { skillId: "SM_BASH", skillName: "狂擊", imageName: "sm.png", row: 0, col: 2 },
  { skillId: "SM_PROVOKE", skillName: "挑釁", imageName: "sm.png", row: 0, col: 3 },
  { skillId: "SM_TWOHAND", skillName: "雙手劍使用熟練度", imageName: "sm.png", row: 1, col: 0 },
  { skillId: "SM_MOVINGRECOVERY", skillName: "移動時恢復HP", imageName: "sm.png", row: 1, col: 1 },
  { skillId: "SM_MAGNUM", skillName: "怒爆", imageName: "sm.png", row: 1, col: 2 },
  { skillId: "SM_ENDURE", skillName: "霸體", imageName: "sm.png", row: 1, col: 3 },
  { skillId: "SM_FATALBLOW", skillName: "攻擊弱點", imageName: "sm.png", row: 2, col: 0 },
  { skillId: "SM_AUTOBERSERK", skillName: "狂暴狀態", imageName: "sm.png", row: 2, col: 1 },

  // 騎士技能
  { skillId: "KN_SPEARMASTERY", skillName: "長矛使用熟練度", imageName: "kn.png", row: 0, col: 0 },
  { skillId: "KN_TWOHANDQUICKEN", skillName: "雙手劍攻擊速度增加", imageName: "kn.png", row: 0, col: 1 },
  { skillId: "KN_AUTOCOUNTER", skillName: "反擊", imageName: "kn.png", row: 0, col: 2 },
  { skillId: "KN_RIDING", skillName: "騎術", imageName: "kn.png", row: 0, col: 3 },
  { skillId: "KN_CHARGEATK", skillName: "衝鋒攻擊", imageName: "kn.png", row: 1, col: 0 },
  { skillId: "KN_BOWLINGBASH", skillName: "怪物互擊", imageName: "kn.png", row: 1, col: 1 },
  { skillId: "KN_CAVALIERMASTERY", skillName: "騎兵修練", imageName: "kn.png", row: 1, col: 2 },
  { skillId: "KN_PIERCE", skillName: "長矛刺擊", imageName: "kn.png", row: 1, col: 3 },
  { skillId: "KN_SPEARSTAB", skillName: "連刺攻擊", imageName: "kn.png", row: 2, col: 0 },
  { skillId: "KN_SPEARBOOMERANG", skillName: "騎乘攻擊", imageName: "kn.png", row: 2, col: 1 },
  { skillId: "KN_BRANDISHSPEAR", skillName: "投擲長矛攻擊", imageName: "kn.png", row: 2, col: 2 }
];

// 目錄設定
const spritesDir = path.join(__dirname, '../public/assets/sprites');
const skillIconsDir = path.join(__dirname, '../public/assets/skill-icons');

// 切割技能圖片函數
async function cropSkillIcon(spritePath, outputPath, row, col, iconSize = 26) {
  try {
    const image = await loadImage(spritePath);
    const canvas = createCanvas(iconSize, iconSize);
    const ctx = canvas.getContext('2d');
    
    // 計算在sprite中的位置
    const sourceX = col * iconSize;
    const sourceY = row * iconSize;
    
    // 檢查是否超出圖片範圍
    if (sourceX + iconSize > image.width || sourceY + iconSize > image.height) {
      console.log(`  ⚠️  警告: 座標超出範圍 (${sourceX}, ${sourceY}) 對於圖片 ${path.basename(spritePath)}`);
      return false;
    }
    
    // 從 sprite 圖片中裁切指定區域
    ctx.drawImage(image, sourceX, sourceY, iconSize, iconSize, 0, 0, iconSize, iconSize);
    
    // 儲存為 PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    
    console.log(`  ✅ 成功: ${path.basename(outputPath)} (${sourceX}, ${sourceY})`);
    return true;
  } catch (error) {
    console.error(`  ❌ 錯誤: ${error.message}`);
    return false;
  }
}

// 主要處理函數
async function fixSkillImages() {
  console.log('🔧 修正技能圖片對應...');
  
  let successCount = 0;
  let failCount = 0;
  
  // 處理每個技能
  for (const skill of correctSkillImagesData) {
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
      skill.row,
      skill.col
    );
    
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }
  
  // 生成更新的對應表
  console.log('\n📋 更新技能圖片對應表...');
  const mappingData = {
    metadata: {
      createdAt: new Date().toISOString(),
      totalSkills: correctSkillImagesData.length,
      successCount,
      failCount,
      note: "Fixed skill image coordinates based on actual sprite layout"
    },
    skills: correctSkillImagesData.map(skill => ({
      skillId: skill.skillId,
      skillName: skill.skillName,
      iconPath: `skill-icons/${skill.skillId}.png`,
      spriteSource: {
        imageName: skill.imageName,
        gridPosition: {
          row: skill.row,
          col: skill.col,
          x: skill.col * 26,
          y: skill.row * 26
        }
      }
    }))
  };
  
  const mappingPath = path.join(__dirname, '../public/assets/skill-image-mapping.json');
  fs.writeFileSync(mappingPath, JSON.stringify(mappingData, null, 2));
  console.log(`  ✅ 對應表已更新: ${mappingPath}`);
  
  // 總結
  console.log('\n🎉 修正完成!');
  console.log(`📊 統計:`);
  console.log(`  - 成功: ${successCount}`);
  console.log(`  - 失敗: ${failCount}`);
  console.log(`  - 總計: ${correctSkillImagesData.length}`);
}

// 執行修正
if (require.main === module) {
  fixSkillImages().catch(console.error);
}

module.exports = { fixSkillImages, correctSkillImagesData };