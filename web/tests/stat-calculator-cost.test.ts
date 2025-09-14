import {describe, expect, test} from 'vitest'
import {getStatUpgradeCost, calculateStatPointsUsed} from '~/composables/useStat'

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