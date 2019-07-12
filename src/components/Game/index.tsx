import React from 'react';
import styles from './game.module.css';

import { Game, Player, BoxOptionType, FormulaBox } from '../../types';

import { useDispatch } from 'react-redux';

import PreferencesCell from '../Preferences/Cell';
import { FormulaBoxView, BoxView } from './Boxes';

interface GameProps {
    game: Game;
}

interface PlayersProps {
    players: Player[];
    row: number;
}


const Row: React.FC<PlayersProps> = ({ players, row }) => {
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <div className={styles.label}>
                <span>{players[0].boxes[row].name}</span>
            </div>
            {players.map((player, i) => {
                const box = player.boxes[row];
                switch (box.type) {
                    case BoxOptionType.Formula:
                        return <FormulaBoxView player={player} box={box} key={i} />;

                    default:
                        return <BoxView playerIndex={i} box={box} row={row} key={i} />
                        
                }
            })}
        </React.Fragment>
    );
};

const GameComponent: React.FC<GameProps> = ({ game }) => {
    return (
        <div className={styles.game}>
            <div>
                <PreferencesCell />
            </div>
            {game.players.map((player, i) => (
                <div className={styles.playerName} key={i}>
                    <span>{player.name}</span>
                </div>
            ))}
            {game.players[0].boxes.map((box, i) => (
                <Row players={game.players} row={i} key={i} />
            ))}
        </div>
    );
};

export default GameComponent;
