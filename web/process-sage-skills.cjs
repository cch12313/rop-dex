const { createCanvas, loadImage } = require('canvas');
const fs = require('fs').promises;
const path = require('path');

// 賢者技能座標資料 - 從 ro.ntome.com 提取
const sageSkillsData = [
  // Sage專屬技能 (sa.png)
  { name: "隨機技能", x: 0, y: 0, spriteImage: "sa.png", skillId: "SA_ABRACADABRA" },
  { name: "肯貝特製作", x: 0, y: 26, spriteImage: "sa.png", skillId: "SA_CREATECON" },
  { name: "進化之書", x: 26, y: 0, spriteImage: "sa.png", skillId: "SA_ADVANCEDBOOK" },
  { name: "水元素領域", x: 26, y: 26, spriteImage: "sa.png", skillId: "SA_DELUGE" },
  { name: "火屬性元素更換", x: 0, y: 52, spriteImage: "sa.png", skillId: "SA_ELEMENTFIRE" },
  { name: "地屬性元素更換", x: 26, y: 52, spriteImage: "sa.png", skillId: "SA_ELEMENTGROUND" },
  { name: "自動念咒", x: 52, y: 0, spriteImage: "sa.png", skillId: "SA_AUTOSPELL" },
  { name: "魔法效果解除", x: 52, y: 26, spriteImage: "sa.png", skillId: "SA_DISPELL" },
  { name: "水屬性元素更換", x: 52, y: 52, spriteImage: "sa.png", skillId: "SA_ELEMENTWATER" },
  { name: "火屬性附加", x: 0, y: 78, spriteImage: "sa.png", skillId: "SA_FLAMELAUNCHER" },
  { name: "自由施法", x: 26, y: 78, spriteImage: "sa.png", skillId: "SA_FREECAST" },
  { name: "水屬性附加", x: 52, y: 78, spriteImage: "sa.png", skillId: "SA_FROSTWEAPON" },
  { name: "取消施法", x: 78, y: 0, spriteImage: "sa.png", skillId: "SA_CASTCANCEL" },
  { name: "龍知識", x: 78, y: 26, spriteImage: "sa.png", skillId: "SA_DRAGONOLOGY" },
  { name: "風屬性元素更換", x: 78, y: 52, spriteImage: "sa.png", skillId: "SA_ELEMENTWIND" },
  { name: "地元素領域", x: 78, y: 78, spriteImage: "sa.png", skillId: "SA_LANDPROTECTOR" },
  { name: "風屬性附加", x: 0, y: 104, spriteImage: "sa.png", skillId: "SA_LIGHTNINGLOADER" },
  { name: "魔法懲罰", x: 26, y: 104, spriteImage: "sa.png", skillId: "SA_MAGICROD" },
  { name: "地屬性附加", x: 52, y: 104, spriteImage: "sa.png", skillId: "SA_SEISMICWEAPON" },
  { name: "念咒拆除", x: 78, y: 104, spriteImage: "sa.png", skillId: "SA_SPELLBREAKER" },
  { name: "風元素領域", x: 0, y: 130, spriteImage: "sa.png", skillId: "SA_VIOLENTGALE" },
  { name: "火元素領域", x: 26, y: 130, spriteImage: "sa.png", skillId: "SA_VOLCANO" },

  // Mage繼承技能 (mg.png)
  { name: "冰箭術", x: 0, y: 0, spriteImage: "mg.png", skillId: "MG_COLDBOLT" },
  { name: "能量外套", x: 26, y: 0, spriteImage: "mg.png", skillId: "MG_ENERGYCOAT" },
  { name: "火球術", x: 52, y: 0, spriteImage: "mg.png", skillId: "MG_FIREBALL" },
  { name: "火箭術", x: 78, y: 0, spriteImage: "mg.png", skillId: "MG_FIREBOLT" },
  { name: "火焰之壁", x: 0, y: 26, spriteImage: "mg.png", skillId: "MG_FIREWALL" },
  { name: "冰凍術", x: 26, y: 26, spriteImage: "mg.png", skillId: "MG_FROSTDIVER" },
  { name: "雷擊術", x: 52, y: 26, spriteImage: "mg.png", skillId: "MG_LIGHTNINGBOLT" },
  { name: "聖靈召喚", x: 52, y: 52, spriteImage: "mg.png", skillId: "MG_NAPALMBEAT" },
  { name: "暗之障壁", x: 0, y: 52, spriteImage: "mg.png", skillId: "MG_SAFETYWALL" },
  { name: "火狩", x: 26, y: 52, spriteImage: "mg.png", skillId: "MG_SIGHT" },
  { name: "心靈爆破", x: 78, y: 26, spriteImage: "mg.png", skillId: "MG_SOULSTRIKE" },
  { name: "禪心", x: 78, y: 52, spriteImage: "mg.png", skillId: "MG_SRECOVERY" },
  { name: "石化術", x: 0, y: 78, spriteImage: "mg.png", skillId: "MG_STONECURSE" },
  { name: "雷爆術", x: 26, y: 78, spriteImage: "mg.png", skillId: "MG_THUNDERSTORM" },

  // Wizard繼承技能 (wz.png)
  { name: "地震術", x: 0, y: 0, spriteImage: "wz.png", skillId: "WZ_EARTHSPIKE" },
  { name: "怪物情報", x: 26, y: 0, spriteImage: "wz.png", skillId: "WZ_ESTIMATION" },
  { name: "崩裂術", x: 26, y: 26, spriteImage: "wz.png", skillId: "WZ_HEAVENDRIVE" }
];

async function processSageSkills() {
  const spriteImages = {
    'sa.png': null,
    'mg.png': null,
    'wz.png': null
  };

  try {
    console.log('載入 sprite 圖片...');
    
    // 載入所有需要的 sprite 圖片
    for (const spriteFile of Object.keys(spriteImages)) {
      const spritePath = path.join(__dirname, 'sprites', spriteFile);
      try {
        spriteImages[spriteFile] = await loadImage(spritePath);
        console.log(`✓ 成功載入 ${spriteFile}`);
      } catch (error) {
        console.error(`✗ 無法載入 ${spriteFile}:`, error.message);
        return;
      }
    }

    // 確保輸出目錄存在
    const outputDir = path.join(__dirname, 'public', 'assets', 'skill-icons');
    await fs.mkdir(outputDir, { recursive: true });

    let processedCount = 0;
    let errorCount = 0;

    console.log('\n開始處理賢者技能圖片...');
    console.log('='.repeat(50));

    for (const skill of sageSkillsData) {
      try {
        const spriteImage = spriteImages[skill.spriteImage];
        if (!spriteImage) {
          console.error(`✗ 找不到 sprite 圖片: ${skill.spriteImage}`);
          errorCount++;
          continue;
        }

        // 創建 26x26 畫布
        const canvas = createCanvas(26, 26);
        const ctx = canvas.getContext('2d');

        // 從 sprite 圖片中擷取指定區域 (26x26)
        ctx.drawImage(
          spriteImage,
          skill.x, skill.y, 26, 26,  // 源區域
          0, 0, 26, 26               // 目標區域
        );

        // 儲存為 PNG 檔案
        const outputPath = path.join(outputDir, `${skill.skillId}.png`);
        const buffer = canvas.toBuffer('image/png');
        await fs.writeFile(outputPath, buffer);

        console.log(`✓ ${skill.name} (${skill.skillId}) - ${skill.spriteImage} [${skill.x}, ${skill.y}]`);
        processedCount++;

      } catch (error) {
        console.error(`✗ 處理 ${skill.name} 時發生錯誤:`, error.message);
        errorCount++;
      }
    }

    console.log('='.repeat(50));
    console.log(`\n處理完成！`);
    console.log(`✓ 成功處理: ${processedCount} 個技能`);
    console.log(`✗ 處理失敗: ${errorCount} 個技能`);
    console.log(`📁 輸出目錄: ${outputDir}`);

    if (errorCount === 0) {
      console.log('\n🎉 所有賢者技能圖片已成功生成！');
    }

  } catch (error) {
    console.error('處理過程中發生錯誤:', error);
  }
}

// 執行腳本
if (require.main === module) {
  processSageSkills();
}

module.exports = { processSageSkills, sageSkillsData };