import {describe, expect, test} from 'vitest'
import {getStatUpgradeCost, calculateStatPointsUsed} from '~/composables/useStat'

describe('role stat tests', () => {
    test.each([
        [1, 2],
        [10, 2],
        [11, 3],
        [20, 3],
        [21, 4],
        [30, 4]
    ])('current stat point is %i, upgrade should cost %i', (current, expected) => {
        expect(getStatUpgradeCost(current)).toBe(expected)
    });

    test.each([
        [1, 0], // no cost when no use
        [2, 1],
        [10, 9],
        [12, 12],
        [22, 33],
    ])('when stat is %i, total cost is %i', (currentStat, expected) => {
        expect(calculateStatPointsUsed(currentStat)).toBe(expected)
    })
})