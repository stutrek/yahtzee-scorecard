import { useState } from 'react';
import { UIPreferences, Game } from '../types';
import createNewGame from './createNewGame';
import db from './db';

let preferenceCache: UIPreferences | undefined = undefined;

export const useUIPreferences = (): [boolean, UIPreferences | undefined, Function] => {
    let [loading, setLoading] = useState(false);
    let [state, setPreferencesState] = useState(preferenceCache);

    const setPreferences = (newPrefs: UIPreferences) => {
        preferenceCache = newPrefs;
        db.preferences.put(newPrefs);
        setPreferencesState(newPrefs);
    };

    if (state === undefined && loading === false) {
        loading = true;
        setLoading(true);
        db.preferences
            .toCollection()
            .first()
            .then(preferences => {
                setLoading(false);
                if (preferences) {
                    setPreferences(preferences);
                } else {
                    setPreferences({
                        showScoresBeforeComplete: false,
                        showBonusBeforeComplete: false,
                    });
                }
            });
    }

    return [loading, state, setPreferences];
};

let currentGameId = sessionStorage.getItem('current-game') || undefined;
let currentGameCache: Game | undefined = undefined;
export const useCurrentGame = (): [Game | undefined, Function, Function] => {
    let [loading, setLoading] = useState(false);
    const [game, setGame] = useState(currentGameCache);

    async function updateGame(newGame: Game): Promise<void> {
        if (newGame.id !== currentGameId) {
            if (newGame.id === undefined) {
                newGame.id = await db.games.add(newGame);
            }
            sessionStorage.setItem('current-game', newGame.id);
        } else {
            db.games.put(newGame);
        }
        setLoading(false);
        setGame(newGame);
    }
    async function newGame(): Promise<void> {
        const game = createNewGame();
        await updateGame(game);
    }

    if (loading === false && game === undefined) {
        setLoading(true);
        if (currentGameId === undefined) {
            db.games
                .toCollection()
                .last()
                .then(game => {
                    if (game === undefined) {
                        newGame();
                    } else {
                        updateGame(game);
                    }
                });
        } else {
            db.games.get(currentGameId).then(game => {
                if (game === undefined) {
                    newGame();
                } else {
                    updateGame(game);
                }
            });
        }
    }

    return [game, updateGame, newGame];
};
