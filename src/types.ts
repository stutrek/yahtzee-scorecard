export enum BoxOptionType {
    DieCount,
    SpecificNumber,
    AnyNumber,
    Bonus,
    Formula,
}

export interface EntryBox {
    readonly name: string;
    readonly helpText: string;
    points?: number;
}

export interface DieCountBox extends EntryBox {
    readonly type: BoxOptionType.DieCount;
    readonly multiplier: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface SpecificValueBox extends EntryBox {
    readonly type: BoxOptionType.SpecificNumber;
    value: number;
}

export interface AnyNumberBox extends EntryBox {
    readonly type: BoxOptionType.AnyNumber;
    readonly max: number;
    readonly min: number;
}

export interface BonusBox extends EntryBox {
    readonly type: BoxOptionType.Bonus;
}

export interface FormulaBox {
    readonly name: string;
    readonly helpText: string;
    readonly type: BoxOptionType.Formula;
    readonly formula: string;
    readonly calculateIf?: string;
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
