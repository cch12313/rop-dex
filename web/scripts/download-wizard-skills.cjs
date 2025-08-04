const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// 巫師相關技能對應表 (需要下載圖片的技能)
const wizardSkills = [
  // 魔法師技能 (一轉)
  { skillId: 'MG_SRECOVERY', chineseName: '禪心' },
  { skillId: 'MG_SIGHT', chineseName: '火狩' },
  { skillId: 'MG_FIREBOLT', chineseName: '火箭術' },
  { skillId: 'MG_FIREBALL', chineseName: '火球術' },
  { skillId: 'MG_FIREWALL', chineseName: '火焰之壁' },
  { skillId: 'MG_LIGHTNINGBOLT', chineseName: '雷擊術' },
  { skillId: 'MG_THUNDERSTORM', chineseName: '雷爆術' },
  { skillId: 'MG_COLDBOLT', chineseName: '冰箭術' },
  { skillId: 'MG_FROSTDIVER', chineseName: '冰凍術' },
  { skillId: 'MG_STONECURSE', chineseName: '石化術' },
  { skillId: 'MG_SOULSTRIKE', chineseName: '心靈爆破' },
  { skillId: 'MG_NAPALMBEAT', chineseName: '聖靈召喚' },
  { skillId: 'MG_SAFETYWALL', chineseName: '暗之障壁' },
  { skillId: 'MG_ENERGYCOAT', chineseName: '能量外套' },
  
  // 巫師技能 (二轉)
  { skillId: 'WZ_ESTIMATION', chineseName: '怪物情報' },
  { skillId: 'WZ_SIGHTRASHER', chineseName: '火之獵殺' },
  { skillId: 'WZ_FIREPILLAR', chineseName: '火柱攻擊' },
  { skillId: 'WZ_METEOR', chineseName: '隕石術' },
  { skillId: 'WZ_JUPITEL', chineseName: '雷鳴術' },
  { skillId: 'WZ_VERMILION', chineseName: '怒雷強擊' },
  { skillId: 'WZ_WATERBALL', chineseName: '水球術' },
  { skillId: 'WZ_ICEWALL', chineseName: '冰刃之牆' },
  { skillId: 'WZ_FROSTNOVA', chineseName: '霜凍之術' },
  { skillId: 'WZ_STORMGUST', chineseName: '暴風雪' },
  { skillId: 'WZ_HEAVENDRIVE', chineseName: '地震術' },
  { skillId: 'WZ_EARTHSPIKE', chineseName: '崩裂術' },
  { skillId: 'WZ_QUAGMIRE', chineseName: '泥沼地' },
  { skillId: 'WZ_SIGHTBLASTER', chineseName: '火狩芽' }
];

async function downloadWizardSkillImages() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // 訪問巫師技能頁面
  await page.goto('https://ro.ntome.com/skill/wz');
  await page.waitForLoadState('networkidle');
  
  console.log('開始下載巫師技能圖示...');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const skill of wizardSkills) {
    try {
      console.log(`處理技能: ${skill.skillId} - ${skill.chineseName}`);
      
      // 查找包含技能名稱的表格元素
      const skillElement = await page.locator(`table:has-text("${skill.chineseName}")`).first();
      
      if (await skillElement.count() > 0) {
        // 查找該技能的圖示元素
        const iconElement = await skillElement.locator('td').first().locator('div[style*="background-image"]');
        
        if (await iconElement.count() > 0) {
          // 獲取背景圖片 URL
          const style = await iconElement.getAttribute('style');
          const urlMatch = style.match(/url\\(['"](.*?)['"]\\)/);
          
          if (urlMatch) {
            let imageUrl = urlMatch[1];
            if (imageUrl.startsWith('/')) {
              imageUrl = 'https://ro.ntome.com' + imageUrl;
            }
            
            console.log(`找到圖片 URL: ${imageUrl}`);
            
            // 下載圖片
            const response = await page.request.get(imageUrl);
            if (response.ok()) {
              const buffer = await response.body();
              const fileName = `${skill.skillId}.png`;
              const filePath = path.join('/Users/alvin.chiu56/Documents/mine/projects/ro/web/public/assets/skill-icons', fileName);
              
              fs.writeFileSync(filePath, buffer);
              console.log(`✅ 成功下載: ${fileName}`);
              successCount++;
            } else {
              console.log(`❌ 下載失敗: ${skill.skillId} - HTTP ${response.status()}`);
              errorCount++;
            }
          } else {
            console.log(`❌ 找不到圖片 URL: ${skill.skillId}`);
            errorCount++;
          }
        } else {
          console.log(`❌ 找不到圖示元素: ${skill.skillId}`);
          errorCount++;
        }
      } else {
        console.log(`❌ 找不到技能元素: ${skill.skillId} - ${skill.chineseName}`);
        errorCount++;
      }
      
      // 短暫延遲避免過於頻繁的請求
      await page.waitForTimeout(200);
      
    } catch (error) {
      console.log(`❌ 處理 ${skill.skillId} 時發生錯誤:`, error.message);
      errorCount++;
    }
  }
  
  await browser.close();
  
  console.log(`\n=== 下載完成 ===`);
  console.log(`成功: ${successCount} 個`);
  console.log(`失敗: ${errorCount} 個`);
  console.log(`總計: ${wizardSkills.length} 個技能`);
}

// 確保目標目錄存在
const targetDir = '/Users/alvin.chiu56/Documents/mine/projects/ro/web/public/assets/skill-icons';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

downloadWizardSkillImages().catch(console.error);