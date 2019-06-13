import Dexie from 'dexie';
import 'dexie-observable';

import { Game, UIPreferences } from '../types';

class YahtzeeDB extends Dexie {
    games: Dexie.Table<Game, string>;
    preferences: Dexie.Table<UIPreferences, number>;

    constructor(dbName: string) {
        super(dbName);

        this.version(1).stores({
            games: '$$id',
            preferences: '++',
        });

        this.games = this.table('games');
        this.preferences = this.table('preferences');
    }
}

export default new YahtzeeDB('yahtzee-scoresheet');
