import React from 'react';
import styles from './game.module.css';

import { Game, Player, BoxOptionType } from '../../types';

interface GameProps {
    game: Game;
}
interface PlayersProps {
    players: Player[];
    row: number;
}

const Row: React.FC<PlayersProps> = ({ players, row }) => {
    return (
        <React.Fragment>
            <div className={styles.label}>
                <span>{players[0].boxes[row].name}</span>
            </div>
            {players.map((player, i) => {
                const box = player.boxes[row];
                switch (box.type) {
                    case BoxOptionType.Formula:
                        return (
                            <div className={styles.formula} key={i}>
                                <span>F</span>
                            </div>
                        );
                    default:
                        return (
                            <div className={styles.cell} key={i}>
                                <span>{box.points}</span>
                            </div>
                        );
                }
            })}
        </React.Fragment>
    );
};

const GameComponent: React.FC<GameProps> = ({ game }) => {
    return (
        <div className={styles.game}>
            {game.players[0].boxes.map((box, i) => (
                <Row players={game.players} row={i} key={i} />
            ))}
        </div>
    );
};

export default GameComponent;
