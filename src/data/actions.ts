import db from './db';
import { Game } from '../types';
import createNewGame from './createNewGame';

export const createGame = async (): Promise<Game> => {
    const game = createNewGame();
    const id = await db.games.add(game);
    game.id = id;
    return game;
};
