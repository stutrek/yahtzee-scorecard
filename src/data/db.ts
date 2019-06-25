import Dexie from 'dexie';
import 'dexie-observable';

import { Game, Preference } from '../types';

class YahtzeeDB extends Dexie {
    games: Dexie.Table<Game, string>;
    preferences: Dexie.Table<Preference, string>;

    constructor(dbName: string) {
        super(dbName);

        this.version(1).stores({
            games: '$$id',
            preferences: 'key',
        });

        this.games = this.table('games');
        this.preferences = this.table('preferences');
    }
}

export default new YahtzeeDB('yahtzee-scoresheet');
