import { Game, Player, BoxOptionType, BoxList } from '../types';

const getInitialBoxes = (): BoxList => [
    {
        name: 'Ones',
        helpText: 'Sum of all 1s',
        count: 5,
        multiplier: 1,
        type: BoxOptionType.Count,
    },
    {
        name: 'Twos',
        helpText: 'Sum of all 2s',
        count: 5,
        multiplier: 2,
        type: BoxOptionType.Count,
    },
    {
        name: 'Threes',
        helpText: 'Sum of all 3s',
        count: 5,
        multiplier: 3,
        type: BoxOptionType.Count,
    },
    {
        name: 'Fours',
        helpText: 'Sum of all 4s',
        count: 5,
        multiplier: 4,
        type: BoxOptionType.Count,
    },
    {
        name: 'Fives',
        helpText: 'Sum of all 5s',
        count: 5,
        multiplier: 5,
        type: BoxOptionType.Count,
    },
    {
        name: 'Sixes',
        helpText: 'Sum of all 6s',
        count: 5,
        multiplier: 6,
        type: BoxOptionType.Count,
    },
    {
        name: 'Upper Total',
        helpText: '',
        type: BoxOptionType.Formula,
        formula: 'SUM(A1:A6)',
        calculateIf: `
        OR(
            PREFS("showScoresBeforeComplete"), 
            COUNTA(A1:A6) = 6
        )`,
    },
    {
        name: 'Bonus',
        helpText: '63 or greater on top earns a 35 bonus',
        type: BoxOptionType.Formula,
        formula: `IF(
            ISBLANK(A7), 
            NULL, 
            IF(A7 > 62, 35, 0)
        )`,
    },
    {
        name: 'Three of a Kind',
        helpText: 'Sum of all five dice',
        type: BoxOptionType.AnyNumber,
        max: 30,
        min: 6,
    },
    {
        name: 'Four of a Kind',
        helpText: 'Sum of all five dice',
        type: BoxOptionType.AnyNumber,
        max: 30,
        min: 6,
    },
    {
        name: 'Full House',
        helpText: 'Three of one number and two of a second',
        type: BoxOptionType.SpecificNumber,
        value: 25,
    },
    {
        name: 'Small Straight',
        helpText: 'Any four dice in a row',
        type: BoxOptionType.SpecificNumber,
        value: 30,
    },
    {
        name: 'Large Straight',
        helpText: 'Five dice in a row',
        type: BoxOptionType.SpecificNumber,
        value: 40,
    },
    {
        name: 'Chance',
        helpText: 'Sum of all dice, no requirements',
        type: BoxOptionType.AnyNumber,
        max: 30,
        min: 6,
    },
    {
        name: 'Yahtzee',
        helpText: 'Five of a kind',
        type: BoxOptionType.SpecificNumber,
        value: 50,
    },
    {
        name: 'Yahtzee Bonus',
        helpText:
            'For additional yahtzees, score in any bottom box, or the top value matching the dice. Add one to this box too.',
        type: BoxOptionType.Count,
        count: 13,
        multiplier: 100
    },
    {
        name: 'Total',
        helpText: '',
        type: BoxOptionType.Formula,
        formula: 'SUM(A7:A16)',
        calculateIf: `
        OR(
            PREFS("showScoresBeforeComplete"), 
            COUNTA(A7:A16) = 10
        )`,
    },
];

export default (): Game => {
    const players = [1, 2, 3, 4].map(
        (number): Player => ({
            name: `Player ${number}`,
            score: 0,
            boxes: getInitialBoxes(),
        })
    );
    return {
        complete: false,
        players,
    };
};
