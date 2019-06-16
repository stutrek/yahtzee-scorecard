export enum BoxOptionType {
    DieCount,
    SpecificNumber,
    AnyNumber,
    Bonus,
    Formula,
}

export interface EntryBox {
    name: string;
    helpText: string;
    points?: number;
}

export interface DieCountBox extends EntryBox {
    readonly type: BoxOptionType.DieCount;
    multiplier: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface SpecificValueBox extends EntryBox {
    readonly type: BoxOptionType.SpecificNumber;
    value: number;
}

export interface AnyNumberBox extends EntryBox {
    readonly type: BoxOptionType.AnyNumber;
}

export interface BonusBox extends EntryBox {
    readonly type: BoxOptionType.Bonus;
}

export interface FormulaBox {
    name: string;
    helpText: string;
    readonly type: BoxOptionType.Formula;
    formula: string;
    calculateIf?: string;
}

export type BoxList = [
    DieCountBox,
    DieCountBox,
    DieCountBox,
    DieCountBox,
    DieCountBox,
    DieCountBox,
    FormulaBox,
    FormulaBox,
    AnyNumberBox,
    AnyNumberBox,
    SpecificValueBox,
    SpecificValueBox,
    SpecificValueBox,
    AnyNumberBox,
    SpecificValueBox,
    BonusBox,
    FormulaBox
];

export interface Player {
    name: string;
    score: number;
    boxes: BoxList;
}

export interface Game {
    id?: string;
    complete: boolean;
    players: Player[];
}

export interface UIPreferences {
    [index: string]: boolean | string | number;
    showScoresBeforeComplete: boolean;
}
