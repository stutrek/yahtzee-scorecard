import React from 'react';

import { CountBox } from '../../types';

import styles from './editor.module.css';

interface EntryBoxProps {
    save: Function;
}

interface CountProps extends EntryBoxProps {
    box: CountBox;
}

const CountEntry: React.FC<CountProps> = ({ box, save, children }) => {
    const { multiplier } = box;
    const inputs = [];
    for (let i = 0; i <= box.count; i++) {
        const j = i;
        const isSelected = multiplier * j === box.points;
            inputs.push(<button onClick={() => save(multiplier * j)} key={j} className={isSelected ? styles.selected : undefined}>
            {j} &times; {multiplier} = {multiplier * j}
        </button>);
    }

    return (
        <div className={styles.count}>
            <h3>{box.name}</h3>
            {children}
            <div className={styles.twoColumn}>
            {inputs}
            </div>
            <button onClick={() => save(undefined)}>Clear</button>
        </div>
    );
};

export default CountEntry;
