import React, { SyntheticEvent } from 'react';

import { Game, BoxOptionType } from '../../types';

import AnyNumberInput from './AnyNumberInput';
import CountCountInput from './CountInput';
import SpecificValueInput from './SpecificValueInput';

import { useDispatch } from 'react-redux';
import { closeEditor } from './actions';
import produce from 'immer';

import styles from './editor.module.css';

interface EditorContainerProps {
    player: number;
    box: number;
    game: Game;
    updateGame: Function;
}

const EditorContainer: React.FC<EditorContainerProps> = ({
    player: playerId,
    box: boxId,
    game,
    updateGame,
}) => {
    const dispatch = useDispatch();

    if (game === undefined) {
        return <div />;
    }

    const box = game.players[playerId].boxes[boxId];

    if (box.type === BoxOptionType.Formula) {
        return null;
    }

    const save = (value: number) => {
        const newGame = produce(game, draftGame => {
            if (draftGame.players[playerId].boxes[boxId].type !== BoxOptionType.Formula) {
                //@ts-ignore
                draftGame.players[playerId].boxes[boxId].points = value;
            }
        });
        updateGame(newGame);
        dispatch(closeEditor());
    };

    let Component: React.FC<any> | undefined = undefined;
    switch (box.type) {
        case BoxOptionType.AnyNumber:
            Component = AnyNumberInput;
            break;
        case BoxOptionType.Count:
            Component = CountCountInput;
            break;
        case BoxOptionType.SpecificNumber:
            Component = SpecificValueInput;
            break;
    }

    if (Component === undefined) {
        return null;
    }

    const closeOnDirectClick = (event: SyntheticEvent) => {
        if (event.target === event.currentTarget) {
            dispatch(closeEditor());
        }
    }

    return (
        <div className={styles.container} onClick={closeOnDirectClick}>
            <Component box={box} save={save}>
                <button className={styles.close} onClick={() => dispatch(closeEditor())}>&times;</button>
                <div className={styles.helpText}>
                    {box.helpText}
                </div>
            </Component>
        </div>
    );
};

export default EditorContainer;
