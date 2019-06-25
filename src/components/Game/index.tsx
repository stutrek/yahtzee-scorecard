import React from 'react';
import styles from './game.module.css';

import { Game, Player, BoxOptionType, FormulaBox } from '../../types';
import parser from '../../data/parser';

import { useDispatch } from 'react-redux';
import { openEditor } from '../Editor/actions';

import PreferencesCell from '../Preferences/Cell';

interface GameProps {
    game: Game;
}

interface PlayersProps {
    players: Player[];
    row: number;
}

interface FormulaBoxProps {
    player: Player;
    box: FormulaBox;
}

const FormulaBoxView: React.FC<FormulaBoxProps> = ({ player, box }) => {
    parser.player = player;
    const shouldShow = box.calculateIf ? parser.parse(box.calculateIf).result : true;
    if (shouldShow === false) {
        return <div className={styles.formulaEmpty} />;
    }
    const result = parser.parse(box.formula).result;
    return (
        <div className={styles.formula}>
            <span>{result}</span>
        </div>
    );
};

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
                        return (
                            <div
                                className={styles.cell}
                                key={i}
                                onClick={() => dispatch(openEditor({ player: i, box: row }))}
                            >
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
