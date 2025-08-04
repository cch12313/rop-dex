# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述
這是一個RO樂園攻略/資訊網站（rop-dex.com），採MVP方式開發，結合學習技術目的。

## 技術架構
- Web前端: Nuxt 3 + Tailwind CSS
- 後端: Go (未來規劃)
- 部署: Cloudflare Pages
- 域名: rop-dex.com (Cloudflare管理)

## 專案結構
```
rop-dex/
├── web/          # Nuxt 3 + Tailwind CSS
├── docs/         # 內部開發文件 (不上傳GitHub)
├── README.md     # 專案說明
├── LICENSE       # MIT授權
└── .gitignore    # Git忽略設定
```

## 開發狀態
### 已完成
- [x] 基本專案架構設定 (Nuxt 3 + Tailwind CSS)
- [x] 首頁與品牌設計 (Rop-dex)
- [x] 響應式設計與SEO優化
- [x] GitHub Repository 建立
- [x] 適當的 .gitignore 設定
- [x] 首頁品牌與版面優化 (英文標題 "Welcome to Ropdex")
- [x] 靜態生成設定 (SSG) - 使用 ssr: true + nitro: static preset
- [x] GKE 部署設定優化 - 使用 nuxt preview 而非 nuxt start
- [x] Docker 容器部署設定 (port 3000, host 0.0.0.0)

- [x] 技能模擬器開發 - 完整整合 RO Zero 資料
- [x] 從 ragzero.kr 抓取完整技能資料 (294個技能)
- [x] 支援所有職業的技能樹 (6個一轉 + 13個二轉職業)

- [x] 職業選擇器優化 - 只顯示二轉職業，技能樹包含完整技能繼承

### 進行中
- [ ] 技能先決條件邏輯完善

## 功能開發順序
1. 技能模擬器（Skill Simulator）- 參考 http://ragzero.kr/skilltree/index_sakray.html
2. 素質模擬器（Stat Simulator）
3. 裝備資訊（Item DB）- 參考 https://db.irowiki.org/db/item-info/
4. 怪物資訊（Monster DB）- 參考 https://db.irowiki.org/db/monster-search
5. 傷害模擬器（搭配素質與裝備）

## 開發指令
```bash
# 進入專案目錄
cd web

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置專案 (靜態生成)
npm run build
npm run generate  # 等同於 build，使用 nuxt generate

# 本地預覽靜態網站
npm run preview

# 容器部署啟動 (GKE)
npm run start  # 實際執行: nuxt preview --port 3000 --host 0.0.0.0

# 準備 Nuxt 環境
npm run postinstall  # 執行 nuxt prepare
```

**注意事項**：
- 目前專案無 linting 或測試配置
- 使用 Nuxt 3 的靜態生成模式 (ssr: false, nitro preset: static)
- 開發伺服器預設在 http://localhost:3000 啟動

## 程式碼架構

### 核心資料結構
- `web/types/skill.ts` - 技能系統的 TypeScript 介面定義
  - `Skill`: 技能基本資料 (id, name, icon, description, maxLevel, requirements, effects, position)
  - `Job`: 職業資料 (id, name, icon, description, skills, baseSkillPoints)
  - `JobClass`: 職業分類 (id, name, jobs)
  - `SkillRequirement`: 技能前置需求
  - `SkillEffect`: 技能效果等級描述

### 資料來源整合
- `web/data/ro_skills_final.ts` - RO Zero 原始技能資料庫
  - `SkillDetail`: 技能詳細資料
  - `JobData`: 職業資料
  - `ROSkillDatabase`: 完整資料庫結構
- `web/data/all-jobs-integrated.ts` - 整合後的職業技能資料
  - 包含完整的 294 個技能中文翻譝對照表 (skillNameMapping)
  - 職業 ID 對應：劍士系(7,14)、服事系(8,15)、商人系(10,18)、盜賊系(12,17)、法師系(9,16)、弓箭手系(11,19,20)

### 組件架構
- `web/pages/skill-simulator.vue` - 技能模擬器主頁面
- `web/components/JobSelector.vue` - 職業選擇器 (只顯示二轉職業)
- `web/components/SkillTree.vue` - 技能樹視覺化組件
- `web/components/SkillNode.vue` - 單一技能節點組件
- `web/components/SkillDetails.vue` - 技能詳細資訊面板
- `web/components/SkillPointWarning.vue` - 技能點數警告組件

### 技能系統邏輯
- 技能樹採用座標系統定位 (x, y position)
- 支援技能前置需求檢查
- 包含完整的技能繼承 (一轉→二轉職業)
- 智慧型技能點數分配與升級系統

## 重要檔案說明
- `web/pages/index.vue` - 首頁 (英文標題 "Welcome to Ropdex")
- `web/nuxt.config.ts` - Nuxt 配置 (ssr: false + nitro: static preset)
- `web/package.json` - 包含 GKE 部署優化的 start script
- `web/app.vue` - 根組件
- `docs/` - 內部開發文件 (包含原始規劃文件)
- `CLAUDE.md` - 本檔案 (不上傳GitHub)

## 開發注意事項

### 技能資料整合
- 技能資料來自 ragzero.kr，包含 294 個技能
- 職業 ID 對應必須準確，參考已記錄的職業 ID 對照表
- 所有技能都有完整的中文翻譯對照表
- 修改技能相關功能時需要驗證完整性

### 前置需求系統
- 技能樹具有複雜的前置需求邏輯
- 目前正在完善智慧型前置需求升級系統
- 新增技能邏輯時需考慮前置技能的自動升級

### UI/UX 設計原則
- 使用 Tailwind CSS 進行樣式設計
- 響應式設計支援各種裝置
- 組件採用 Vue 3 Composition API

## Git 管理
- Repository: https://github.com/cch12313/rop-dex
- 分支策略: main branch 直接開發
- 重要檔案已加入 .gitignore: docs/, CLAUDE.md, .idea/, node_modules/ 等

## 部署目標
- 使用 Cloudflare Pages 部署
- 網域: rop-dex.com
- 靜態生成 (npm run generate)

## RO Zero 職業資料整合記錄

### 錯誤記錄與解決方案

#### 問題：職業分類 ID 對應錯誤 (2025-07-20)
**錯誤原因**：
- 在整合 ragzero.kr 技能資料時，職業分類的 ID 對應關係不正確
- 原本錯誤的分類：劍士系(8,14)、服事系(10,15)、商人系(12,18)、盜賊系(13,17)
- 正確的分類應為：劍士系(7,14)、服事系(8,15)、商人系(10,18)、盜賊系(12,17)

**錯誤分析**：
1. 未仔細核對 ragzero.kr 原始資料中的 jobId 對應關係
2. 依賴推測而非實際查證職業 ID
3. 缺乏驗證步驟確認職業分類正確性

**正確的職業 ID 對應表**：
```
劍士系職業：
- 騎士 (jobId: 7)
- 十字軍 (jobId: 14)

法師系職業：
- 巫師 (jobId: 9)  
- 賢者 (jobId: 16)

弓箭手系職業：
- 獵人 (jobId: 11)
- 詩人 (jobId: 19)
- 舞孃 (jobId: 20)

服事系職業：
- 牧師 (jobId: 8)
- 武僧 (jobId: 15)

商人系職業：
- 鐵匠 (jobId: 10)
- 鍊金術師 (jobId: 18)

盜賊系職業：
- 刺客 (jobId: 12)
- 流氓 (jobId: 17)
```

**避免方法**：
1. **必須驗證**：整合外部資料時，務必逐一核對 ID 對應關係
2. **建立對照表**：先建立完整的職業 ID 對照表後再進行分類
3. **測試驗證**：每次修改職業分類後都要測試確認正確性
4. **文件記錄**：將職業 ID 對應表記錄在註釋中，方便未來查證

**修正檔案**：
- `/web/data/all-jobs-integrated.ts` - 修正 jobClassesData 中的職業 ID 過濾條件

#### 問題：技能名稱缺失中文翻譯 (2025-07-20)
**錯誤原因**：
- skillNameMapping 對照表不完整，只包含了劍士系、法師部分、弓箭手、服事部分、商人部分、盜賊技能
- 缺少 115 個技能的中文翻譯，包含所有二轉職業的專屬技能

**錯誤分析**：
1. 在建立 skillNameMapping 時只添加了部分技能，沒有涵蓋所有 294 個技能
2. 轉換邏輯中的 fallback 機制 `detail.chineseName || detail.skillName` 讓錯誤不易發現
3. 缺乏完整性檢查，未驗證所有技能都有對應的中文翻譯

**解決方案**：
- 添加了所有 115 個缺失技能的中文翻譯
- 涵蓋所有二轉職業：牧師、武僧、巫師、賢者、鐵匠、獵人、刺客、流氓、鍊金術師、詩人、舞孃

**避免方法**：
1. **完整性檢查**：建立技能對照表時，必須與原始資料進行完整性比對
2. **自動化驗證**：可考慮建立腳本檢查是否所有技能都有中文翻譯
3. **分階段驗證**：每個職業完成後都要檢查該職業的所有技能是否都有翻譯
4. **文件記錄**：在註釋中記錄每個職業系統包含的技能前綴（如 PR_、MO_、WZ_ 等）

**修正檔案**：
- `/web/data/all-jobs-integrated.ts` - 補完 skillNameMapping 中所有 294 個技能的中文翻譯

## 技能名稱對應更新流程

### 標準作業程序 (SOP)
針對新職業或需要更新技能名稱的職業，請按照以下流程進行：

#### 1. 準備工作
- 確認目標職業的韓文代碼 (如: kn=騎士, cr=十字軍, wz=巫師等)
- 準備 playwright 瀏覽器工具

#### 2. 獲取參考資料
- 使用 playwright 導航到 `https://ro.ntome.com/skill/{職業代碼}`
- 例如：`https://ro.ntome.com/skill/kn` (騎士)
- 提取完整的技能名稱列表，包含一轉基礎職業和二轉專業技能

#### 3. 分析現有設定
```bash
# 查找現有的技能設定
grep -r "職業名稱\|技能ID" /web/data/all-jobs-integrated.ts
```

#### 4. 建立對應關係
- 將網頁技能名稱與現有 skillNameMapping 中的技能ID進行配對
- 注意技能繼承關係：二轉職業包含一轉職業的所有技能
- 記錄需要更新的技能名稱清單

#### 5. 更新技能名稱對照表
```typescript
// 位置：/web/data/all-jobs-integrated.ts
const skillNameMapping: { [key: string]: string } = {
  // 更新對應的技能名稱
  'SKILL_ID': '新的中文技能名稱',
  // ...
}
```

#### 6. 測試驗證
- 啟動開發伺服器：`cd web && npm run dev`
- 使用 playwright 導航到 `http://localhost:3000/skill-simulator`
- 選擇對應職業，驗證技能名稱顯示正確

#### 7. 記錄更新
在此檔案中記錄更新的職業和主要變更，方便未來查證。

## 職業技能中文名稱修正標準流程

### 流程概述
針對每個職業進行技能中文名稱修正的標準化流程，確保與 ro.ntome.com 官方名稱一致。

### 詳細步驟

#### 1. 資料收集階段
- 訪問 `https://ro.ntome.com/skill/[職業代碼]` 查看官方技能名稱
- 使用 playwright 瀏覽器工具提取完整技能列表
- 找出該職業相關的所有技能 ID (包含一轉基礎職業技能)

#### 2. 完整技能對應分析階段
- 使用 `grep` 指令找出現有技能資料中該職業的所有技能
- 列出該職業**所有**技能的現有中文名稱對應
- 逐一比對 ro.ntome.com 與現有資料的差異
- 標記需要修正的技能（❌）和正確的技能（✅）
- 標記需要確認的技能（?）
- **重要：等待用戶確認**所有技能對應正確後再進行下一步

#### 3. 修正執行階段
- 使用 `MultiEdit` 工具批量修正 `all-jobs-integrated.ts` 中的技能名稱
- 確認所有該職業相關技能名稱都已正確更新

#### 4. 圖片處理階段
- 依照既有的圖片下載流程處理該職業技能圖片
- 從 ro.ntome.com 自動下載對應的技能圖示
- 處理 sprite 圖片截取（如巫師職業）或直接下載個別圖示
- 更新技能圖示對應檔案

#### 5. 提交階段
- **重要：必須完成圖片截取後才能提交**
- 使用 `git commit` 提交該職業的技能名稱修正和圖片
- commit 訊息應清楚說明修正的職業、技能數量和圖片處理

### 注意事項
1. **技能繼承**：二轉職業會包含一轉職業的技能，這是預期的行為
2. **逐職業處理**：一次只處理一個職業，避免混亂
3. **用戶確認**：每個職業的技能對應都必須經過用戶確認才能修正
4. **記錄追蹤**：使用 TodoWrite 工具追蹤每個步驟的進度

### 已完成職業更新記錄

#### 劍士系 (2025-08-02)
**騎士 (KN) - 已完成**
- 基礎職業：劍士 (SM) - 同步完成
- 更新數量：劍士 8個技能 + 騎士 6個技能
- 參考網站：https://ro.ntome.com/skill/kn
- 狀態：✅ 完成並測試通過

**十字軍 (CR) - 待處理**
- 基礎職業：劍士 (SM) - 已完成
- 參考網站：https://ro.ntome.com/skill/cr

#### 其他職業系 - 待處理
- 法師系：巫師 (WZ)、賢者 (SA)
- 弓箭手系：獵人 (HT)、詩人 (BA)、舞孃 (DC)  
- 服事系：牧師 (PR)、武僧 (MO)
- 商人系：鐵匠 (BS)、鍊金術師 (AM)
- 盜賊系：刺客 (AS)、流氓 (RG)

### 注意事項
1. **技能繼承**：二轉職業會繼承一轉職業的所有技能，更新時需一併考慮
2. **ID對應**：嚴格按照 ragzero.kr 的 jobId 對應關係
3. **完整性檢查**：每次更新後都要驗證技能模擬器的顯示效果
4. **備份重要**：更新前建議先提交當前進度，避免資料遺失

## 技能圖片處理系統 (2025-08-03)

### 標準化技能圖片修正流程

基於狂擊技能修正成功的經驗，建立了完整的技能圖片處理標準流程：

#### 1. 問題診斷階段
- 識別問題技能（圖片缺失或錯誤顯示）
- 確認技能的中文名稱和技能ID
- 記錄具體問題類型（無圖片/錯誤圖片）

#### 2. 網站分析階段
- 使用 Playwright 訪問 ro.ntome.com 對應職業頁面
- **重要**：ro.ntome.com 的二轉職業頁面包含完整的一轉+二轉技能
- 技能查找策略：
  - 一轉技能：可透過任一對應的二轉職業頁面找到
  - 二轉技能：直接在該職業頁面查找
- 搜尋目標技能的中文名稱
- 提取技能圖片的CSS背景定位資訊 (`background-position`)
- 記錄背景圖片URL和精確座標

#### 3. 座標轉換階段  
- 將CSS的負值座標轉換為正值座標
- 轉換公式：`background-position: -Xpx -Ypx` → 座標 `(X, Y)`
- 計算對應的grid位置：`col = X/26`, `row = Y/26`
- 每個圖示尺寸固定為 26x26px

#### 4. 圖片處理階段
- 下載對應的 sprite 圖片 (sm.png, kn.png, pr.png 等)
- 使用 Canvas API 根據精確座標切割圖片
- 儲存為 26x26px 的 PNG 圖片到 `/public/assets/skill-icons/`

#### 5. 資料更新階段
- 更新 `skill-image-mapping.json` 中的座標資訊
- 確保技能ID、圖片路徑、座標資訊一致
- 更新 metadata 記錄修正時間和原因

#### 6. 驗證階段
- 在技能模擬器中檢查圖片顯示
- 確認圖片內容正確且清晰
- 截圖記錄修正前後對比

### 關鍵技術要點

#### CSS 座標系統理解
```css
/* ro.ntome.com 使用的CSS背景定位 */
.skillimg_sm {
  background-image: url("https://iro.ntome.com/skill/sm.png");
  background-position: -26px 0px; /* 表示圖片位於sprite的(26,0)位置 */
  width: 26px;
  height: 26px;
}
```

#### Sprite 圖片對應表
- `sm.png` - 劍士技能 (劍士、騎士、十字軍共用的一轉技能)
- `kn.png` - 騎士專屬技能  
- `cr.png` - 十字軍專屬技能
- `pr.png` - 牧師技能
- `mo.png` - 武僧技能
- `mg.png` - 法師技能 (法師一轉技能)
- `wz.png` - 巫師技能
- `sa.png` - 賢者技能
- `ac.png` - 弓箭手技能 (弓箭手一轉技能)
- `ht.png` - 獵人技能
- `ba.png` - 詩人技能
- `dc.png` - 舞孃技能
- `mc.png` - 商人技能 (商人一轉技能)
- `bs.png` - 鐵匠技能
- `am.png` - 鍊金術師技能
- `tf.png` - 盜賊技能 (盜賊一轉技能)
- `as.png` - 刺客技能
- `rg.png` - 流氓技能

#### Canvas 切割程式碼範例
```javascript
// 關鍵技術：精確的圖片切割
ctx.drawImage(
  spriteImage,
  sourceX, sourceY, 26, 26,  // source (from sprite)
  0, 0, 26, 26  // destination (to individual file)
);
```

### 成功案例記錄

#### 狂擊技能修正 (SM_BASH) - 2025-08-03
**問題**：狂擊技能無圖片顯示（101 bytes 空檔案）
**解決方案**：
- 原始錯誤座標：(0, 52) - row 2, col 0
- 正確座標：(26, 0) - row 0, col 1  
- CSS參考：`background-position: -26px 0px`
- 結果：成功顯示劍擊衝擊波圖示

**修正腳本**：`/web/scripts/fix-bash-skill.cjs`
**驗證結果**：✅ 技能模擬器中正確顯示

### 工具腳本
- `fix-bash-skill.cjs` - 狂擊技能專用修正腳本（可作為模板）
- `process-skill-images.cjs` - 批量處理技能圖片的基礎腳本
- `correct-skill-mapping.cjs` - 修正座標對應的腳本

### 避免常見錯誤
1. **座標系統混淆**：CSS使用負值座標，需要轉換為正值
2. **Sprite圖片選擇錯誤**：不同職業使用不同的sprite檔案
3. **Grid計算錯誤**：必須使用26px為基準單位
4. **驗證不足**：修正後必須在實際環境中測試顯示效果
5. **職業頁面理解錯誤**：ro.ntome.com 的二轉職業頁面包含該職業系的所有技能（一轉+二轉）

### 職業技能繼承關係說明
**重要**：ro.ntome.com 網站設計邏輯：
- **沒有獨立的一轉職業頁面**（如劍士、法師、弓箭手等）
- **所有技能都包含在二轉職業頁面中**
- 訪問二轉職業頁面（如 `/skill/kn` 騎士）會顯示：
  - 該職業系的所有一轉技能（如劍士技能，使用 sm.png sprite）
  - 該二轉職業的專屬技能（如騎士技能，使用 kn.png sprite）

**實用範例**：
- 要找劍士技能：**必須**去 `/skill/kn`（騎士）或 `/skill/cr`（十字軍）
- 要找法師技能：**必須**去 `/skill/wz`（巫師）或 `/skill/sa`（賢者）
- 要找弓箭手技能：**必須**去 `/skill/ht`（獵人）、`/skill/ba`（詩人）或 `/skill/dc`（舞孃）
- 要找商人技能：**必須**去 `/skill/bs`（鐵匠）或 `/skill/am`（鍊金術師）
- 要找盜賊技能：**必須**去 `/skill/as`（刺客）或 `/skill/rg`（流氓）
- 要找服事技能：**必須**去 `/skill/pr`（牧師）或 `/skill/mo`（武僧）

**網站導覽限制**：
- ❌ 無法訪問 `/skill/sm`（劍士）、`/skill/mg`（法師）等一轉職業頁面
- ✅ 只能透過對應的二轉職業頁面查找所有技能

### 技能圖片品質標準
- 尺寸：26x26px
- 格式：PNG（透明背景）
- 品質：清晰可辨識，符合RO遊戲風格
- 檔案大小：通常300-800 bytes

這個標準化流程確保了技能圖片修正的準確性和一致性，可重複應用到其他需要修正的技能上。

## 合作經驗與最佳實踐 (2025-08-03)

### 項目協作流程優化

#### 步驟化問題解決方法
**經驗教訓**：在處理複雜的批量技能圖片修正時，最有效的方法是：
1. **從單一技能開始驗證**：先處理一個有問題的技能（如狂擊）建立正確流程
2. **驗證流程可行性**：確認方法正確後再批量處理
3. **即時測試反饋**：每個階段都在技能模擬器中實際驗證效果

**成功案例**：狂擊技能修正 → 建立標準流程 → 批量處理22個技能，成功率100%

#### 實際驗證vs推測的重要性
**關鍵發現**：
- ❌ **錯誤方法**：基於推測或舊資料進行座標計算
- ✅ **正確方法**：使用 Playwright 直接從 ro.ntome.com 提取實際CSS資料
- **驗證工具**：`getComputedStyle()` 獲取精確的 `background-position` 值

**實例**：狂擊技能原本錯誤座標 (0, 52)，實際正確座標 (26, 0)

#### 錯誤迭代改進過程
**修正歷程記錄**：
1. 第一次嘗試：使用 grid 推算，結果不正確
2. 第二次嘗試：基於視覺檢查調整，仍有偏差  
3. 第三次嘗試：直接提取CSS `background-position`，完全正確
4. **最終方法**：實際網站CSS分析 + 批量自動化處理

### 技術發現總結

#### CSS座標轉換公式確認
**標準轉換規則**：
```css
/* ro.ntome.com 的CSS */
background-position: -26px -52px;
```
**轉換為實際座標**：
```javascript
const actualX = Math.abs(-26); // = 26
const actualY = Math.abs(-52); // = 52
const gridCol = actualX / 26;  // = 1
const gridRow = actualY / 26;  // = 2
```

#### ro.ntome.com 網站架構特點
**重要發現**：
- **沒有獨立的一轉職業頁面**（/skill/sm、/skill/mg 等不存在）
- **所有技能包含在二轉職業頁面中**（/skill/kn 包含劍士+騎士全部技能）
- **CSS類別規律**：`.skillimg_sm`（劍士系）、`.skillimg_kn`（騎士系）等

#### 完整的 Sprite 文件對應關係表
```
一轉職業（基礎）：
- sm.png  - 劍士技能（劍士、騎士、十字軍共用）
- mg.png  - 法師技能（法師、巫師、賢者共用）
- ac.png  - 弓箭手技能（弓箭手、獵人、詩人、舞孃共用）
- al.png  - 服事技能（服事、牧師、武僧共用）
- mc.png  - 商人技能（商人、鐵匠、鍊金術師共用）
- tf.png  - 盜賊技能（盜賊、刺客、流氓共用）

二轉職業（專屬）：
- kn.png  - 騎士專屬技能
- cr.png  - 十字軍專屬技能  
- wz.png  - 巫師專屬技能
- sa.png  - 賢者專屬技能
- （其他職業類推）
```

#### 品質標準和驗證指標
**圖片品質標準**：
- 尺寸：26x26px（固定）
- 格式：PNG with透明背景
- 檔案大小：300-800 bytes（正常範圍）
- 視覺品質：清晰可辨識，符合RO遊戲風格

**驗證指標**：
- ✅ 檔案大小 > 300 bytes（排除空白圖片）
- ✅ 在技能模擬器中正確顯示
- ✅ 圖示內容與技能功能相符
- ✅ mapping檔案資料完整性

### 工具使用最佳實踐

#### Playwright 批量資料提取最佳方法
**有效模式**：
```javascript
// 批量提取多個技能的CSS資訊
const skillNames = ['技能1', '技能2', '技能3'];
const skillData = [];
const tables = document.querySelectorAll('table');

for (let table of tables) {
  for (let skillName of skillNames) {
    if (table.textContent.includes(skillName)) {
      const imgDiv = table.querySelector('.skillimg');
      // 提取 CSS 資訊...
    }
  }
}
```

#### Canvas圖片處理精確技術
**關鍵程式碼**：
```javascript
// 精確的sprite切割
ctx.drawImage(
  spriteImage,
  sourceX, sourceY, 26, 26,  // source: 從sprite的精確位置
  0, 0, 26, 26              // destination: 輸出到26x26畫布
);
```

#### 檔案組織和 Metadata 管理標準
**skill-image-mapping.json 標準格式**：
```json
{
  "metadata": {
    "createdAt": "ISO時間戳",
    "totalSkills": "總技能數",
    "successCount": "成功處理數", 
    "failCount": "失敗數",
    "note": "處理說明"
  },
  "skills": [
    {
      "skillId": "技能ID",
      "skillName": "中文技能名",
      "iconPath": "skill-icons/檔案名.png",
      "spriteSource": {
        "imageName": "sprite檔案名",
        "gridPosition": { "row": 0, "col": 1, "x": 26, "y": 0 }
      },
      "fileSize": "檔案大小bytes"
    }
  ]
}
```

### 未來職業處理準備

#### 可重用的腳本模板
**範本檔案**：`fix-all-swordsman-knight-skills.cjs`
**使用方法**：
1. 複製腳本並重新命名（如 `fix-all-mage-skills.cjs`）
2. 更新職業技能列表和sprite URL
3. 修改技能ID對應關係
4. 執行並驗證結果

#### 常見問題預防清單
**處理前檢查**：
- [ ] 確認ro.ntome.com對應的職業頁面URL
- [ ] 驗證sprite檔案名稱（mg.png、wz.png等）
- [ ] 確認技能中文名稱與skillId的對應關係
- [ ] 檢查CSS類別名稱（.skillimg_mg、.skillimg_wz等）

**處理後驗證**：
- [ ] 所有圖片檔案大小 > 300 bytes
- [ ] 在技能模擬器中逐一檢查顯示效果
- [ ] mapping檔案metadata正確更新
- [ ] 無console錯誤或載入失敗

#### 職業頁面對應表和處理順序建議
**建議處理順序**（按複雜度遞增）：
1. **十字軍**：/skill/cr（劍士系，模式相同）
2. **巫師**：/skill/wz（法師系，新的sprite）
3. **賢者**：/skill/sa（法師系，確認模式）
4. **獵人**：/skill/ht（弓箭手系，三個二轉職業之一）
5. **詩人**：/skill/ba（弓箭手系）
6. **舞孃**：/skill/dc（弓箭手系）
7. **牧師**：/skill/pr（服事系）
8. **武僧**：/skill/mo（服事系）
9. **鐵匠**：/skill/bs（商人系）
10. **鍊金術師**：/skill/am（商人系）
11. **刺客**：/skill/as（盜賊系）
12. **流氓**：/skill/rg（盜賊系）

**每個職業處理後的標準驗證流程**：
1. 執行圖片修正腳本
2. 檢查所有生成的圖片檔案
3. 在技能模擬器中測試該職業
4. 截圖記錄修正前後對比
5. 更新CLAUDE.md中的處理記錄

這些經驗將大幅提升未來處理其他職業時的效率和準確性。