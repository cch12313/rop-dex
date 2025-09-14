import { describe, expect, test } from 'vitest'
import { getStatUpgradeCost, calculateStatPointsUsed } from '~/composables/useStat'

describe('role stat tests', () => {
  test.each([
    [1, 1],
    [5, 1],
    [10, 1],
    [11, 2],
    [20, 2],
    [21, 3],
    [30, 3]
  ])('current stat point is %i, upgrade should cost %i', (current, expected) => {
    expect(getStatUpgradeCost(current)).toBe(expected)
  });

  //todo refactor
  test('累計消耗點數計算', () => {
    // 基礎測試
    expect(calculateStatPointsUsed(1)).toBe(0)   // 起始值不消耗
    expect(calculateStatPointsUsed(2)).toBe(1)   // 1→2: 1點
    expect(calculateStatPointsUsed(10)).toBe(9)  // 1→10: 9點
    
    // 跨區間測試
    expect(calculateStatPointsUsed(11)).toBe(10) // 1→11: 10點
    expect(calculateStatPointsUsed(21)).toBe(30) // 1→21: 30點
  })

    //todo refactor
  test('實際遊戲場景測試', () => {
    // 常見的配點組合測試
    const str30Cost = calculateStatPointsUsed(30) // STR 30
    const agi20Cost = calculateStatPointsUsed(20) // AGI 20
    const vit15Cost = calculateStatPointsUsed(15) // VIT 15
    
    // 使用實際計算結果作為期望值
    expect(str30Cost).toBe(57)  // STR 1→30
    expect(agi20Cost).toBe(28)  // AGI 1→20 
    expect(vit15Cost).toBe(18)  // VIT 1→15
    
    // 總消耗：57 + 28 + 18 = 103 點
    const totalUsed = str30Cost + agi20Cost + vit15Cost
    expect(totalUsed).toBe(103)
  })
})