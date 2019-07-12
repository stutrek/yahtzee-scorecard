import { useState } from 'react';
import { Preference, Preferences, Game } from '../types';
import createNewGame from './createNewGame';
import createDefaultPrefs from './createDefaultPrefs';
import {useItemById, useTable} from './dexie-hooks';
import db from './db';
import { useDispatch, useSelector } from 'react-redux';
import { changeGame } from '../components/Game/actions';

export const usePreferenceArray = (): [boolean, Preference[] | undefined, Function] => {

    const [loading, prefArray] = useTable(db, db.preferences);
    const setPreference = async (key: string, value: string | number | boolean) => {
        const pref = await db.preferences.get(key);
        if (pref !== undefined) {
            pref.value = value;
            db.preferences.put(pref, key);
        }
    }

    if (loading === false && (prefArray === undefined || prefArray.length === 0)) {
        db.preferences.bulkPut(createDefaultPrefs());
    }

    return [loading, prefArray, setPreference];
  
}

export const usePreferences = (): [boolean, Preferences, Function] => {

    const [loading, prefArray, setPreference] = usePreferenceArray();

    if (prefArray === undefined) {
        return [true, {}, setPreference];
    }

    const prefs: Preferences = {};

    if (prefArray && prefArray.length !== 0) {
        for (const pref of prefArray) {
            prefs[pref.key] = pref.value;
        }
    }

    return [loading, prefs, setPreference];
};

let currentGameId = sessionStorage.getItem('current-game') || undefined;
let creating = false;

export const useCurrentGame = (): [Game | undefined, Function, Function] => {

    const dispatch = useDispatch();
    const gameId = useSelector((state: any) => state.game.gameId);
    
    async function updateGame(newGame: Game): Promise<void> {
        if (newGame.id !== currentGameId) {
            if (newGame.id === undefined) {
                newGame.dateCreated = new Date();
                newGame.id = await db.games.add(newGame);
            }
            dispatch(changeGame(newGame.id));
            sessionStorage.setItem('current-game', newGame.id);
        } else {
            await db.games.put(newGame, newGame.id);
        }
    }
    
    async function newGame(): Promise<void> {
        const game = createNewGame();
        await updateGame(game);
    }

    if (gameId === undefined && creating === false) {
        creating = true;
        db.games
        .toCollection()
        .last()
        .then(game => {
            if (game === undefined) {
                newGame();
            } else {
                updateGame(game);
            }
            creating = false;
        });

    }
    const [loading, game] = useItemById(db, db.games, gameId || '-1');

    if (loading === false && game === undefined && creating === false) {
        creating = true;
        newGame();
    }

    return [game, updateGame, newGame];
};
