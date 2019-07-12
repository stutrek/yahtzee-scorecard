import React from 'react';

import { useDispatch } from 'react-redux';
import { openEditor } from '../Editor/actions';

import parser from '../../data/parser';

import { Player, FormulaBox, EntryBox } from '../../types';

import styles from './game.module.css';


interface FormulaBoxProps {
    player: Player;
	box: FormulaBox;
}

interface BoxProps {
    playerIndex: number;
	box: EntryBox;
	row: number
}

export const FormulaBoxView: React.FC<FormulaBoxProps> = ({ player, box }) => {
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

export const BoxView: React.FC<BoxProps> = ({playerIndex, box, row}) => {
    const dispatch = useDispatch();
	return (
		<div
			className={styles.cell}
			key={playerIndex}
			onClick={() => dispatch(openEditor({ player: playerIndex, box: row }))}
		>
			<span>{box.points}</span>
		</div>
	);
}