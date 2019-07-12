import React, { useState, useEffect } from 'react';

import { useCurrentGame } from '../../data/dataHooks';
import { useCount } from '../../data/dexie-hooks';

import db from '../../data/db';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { Game } from '../../types';
import { useDispatch } from 'react-redux';
import { changeGame } from '../Game/actions';


const useHasGamesBefore = (): boolean => {
	const [state, setState] = useState(true);

	const [currentGame] = useCurrentGame();
	const gameCount = useCount(db, db.games);

	useEffect(() => {
		if (currentGame !== undefined && currentGame.dateCreated) {
			console.log(currentGame);
			db.games.where('dateCreated').below(currentGame.dateCreated).count().then(count => {
				setState(count > 0);
			});
		}
	}, [currentGame, gameCount]);

	return state;
}

const useHasGamesAfter = (): boolean => {
	const [state, setState] = useState(true);

	const [currentGame] = useCurrentGame();
	const gameCount = useCount(db, db.games);

	useEffect(() => {
		if (currentGame !== undefined && currentGame.dateCreated) {
			db.games.where('dateCreated').above(currentGame.dateCreated).count().then(count => {
				setState(count > 0);
			});
		}
	}, [currentGame, gameCount]);

	return state;
}


const GameNavigation: React.FC<{}> = () => {
	const [currentGame, _, createNewGame] = useCurrentGame();
	const hasGamesBefore = useHasGamesBefore();
	const hasGamesAfter = useHasGamesAfter();
	const dispatch = useDispatch();

	const navButtons = [];

	if (currentGame && hasGamesBefore) {
		const goToPrevGame = async (event: React.MouseEvent) => {
			if (currentGame.dateCreated === undefined) {
				return;
			}
			const prevGame = await db.games.where('dateCreated').below(currentGame.dateCreated).last();
			if (prevGame && prevGame.id) {
				dispatch(changeGame(prevGame.id));
			}
		}

		navButtons.push(<Button
			onClick={goToPrevGame}
			key="prev"
		>
			Previous
		</Button>);
	}

	if (currentGame && hasGamesAfter) {
		const goToNextGame = async (event: React.MouseEvent) => {
			if (currentGame.dateCreated === undefined) {
				return;
			}
			const nextGame = await db.games.where('dateCreated').above(currentGame.dateCreated).first();
			if (nextGame && nextGame.id) {
				dispatch(changeGame(nextGame.id));
			}
		}	
		navButtons.push(<Button
			onClick={goToNextGame}
			key="next"
		>
			Next
		</Button>);
	}

	const gameHasBeenTouched = currentGame && currentGame.players.find(player => {
		return player.boxes.find(box => 'points' in box && box.points !== undefined)
	}) !== undefined;
	


	return <React.Fragment>
		<MenuItem>
			{navButtons}
		</MenuItem>
		<MenuItem>
			<Button
				disabled={gameHasBeenTouched === false}
				onClick={gameHasBeenTouched ? () => createNewGame() : () => {}}
			>
				New Game
			</Button>
		</MenuItem>

	</React.Fragment>
}

export default GameNavigation;