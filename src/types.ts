export enum BoxOptionType {
    Count,
    SpecificNumber,
    AnyNumber,
    Bonus,
    Formula,
}

export enum PreferenceTypes {
    Boolean,
    Number,
    String
}

export interface EntryBox {
    readonly name: string;
    readonly helpText: string;
    points?: number;
}

export interface CountBox extends EntryBox {
    readonly type: BoxOptionType.Count;
    readonly count: number;
    readonly multiplier: number;
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
    CountBox,
    CountBox,
    CountBox,
    CountBox,
    CountBox,
    CountBox,
    FormulaBox,
    FormulaBox,
    AnyNumberBox,
    AnyNumberBox,
    SpecificValueBox,
    SpecificValueBox,
    SpecificValueBox,
    AnyNumberBox,
    SpecificValueBox,
    CountBox,
    FormulaBox
];

export interface Player {
    name: string;
    score: number;
    boxes: BoxList;
}

export interface Game {
    id?: string;
    dateCreated?: Date;
    complete: boolean;
    players: Player[];
}

export interface BooleanPreference {
    readonly key: string;
    readonly label: string;
    readonly type: PreferenceTypes.Boolean;
    value: boolean;
}

export interface NumberPreference {
    readonly key: string;
    readonly label: string;
    readonly type: PreferenceTypes.Number;
    value: number;
}

export interface StringPreference {
    readonly key: string;
    readonly label: string;
    readonly type: PreferenceTypes.String;
    value: string;
}

export type Preference = BooleanPreference | NumberPreference | StringPreference

export interface Preferences {
    [index: string]: boolean | string | number;
}