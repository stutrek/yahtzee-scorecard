import React from 'react';

import { DieCountBox } from '../../types';

import styles from './editor.module.css';

interface EntryBoxProps {
    save: Function;
}

interface DieCountProps extends EntryBoxProps {
    box: DieCountBox;
}

const DieCountEntry: React.FC<DieCountProps> = ({ box, save }) => {
    const { multiplier } = box;
    return (
        <div className={styles.dieCount}>
            <h3>{box.name}</h3>
            <button onClick={() => save(0)}>0</button>
            <button onClick={() => save(multiplier)}>
                1 &times; {multiplier} = {multiplier}
            </button>
            <button onClick={() => save(2 * multiplier)}>
                2 &times; {multiplier} = {2 * multiplier}
            </button>
            <button onClick={() => save(3 * multiplier)}>
                3 &times; {multiplier} = {3 * multiplier}
            </button>
            <button onClick={() => save(3 * multiplier)}>
                4 &times; {multiplier} = {4 * multiplier}
            </button>
            <button onClick={() => save(5 * multiplier)}>
                5 &times; {multiplier} = {5 * multiplier}
            </button>
            <button onClick={() => save(6 * multiplier)}>
                6 &times; {multiplier} = {6 * multiplier}
            </button>
            <button onClick={() => save(undefined)}>Clear</button>
        </div>
    );
};

export default DieCountEntry;
