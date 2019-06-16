import React from 'react';

import { SpecificValueBox } from '../../types';

import styles from './editor.module.css';

interface EntryBoxProps {
    save: Function;
}

interface SpecificValueProps extends EntryBoxProps {
    box: SpecificValueBox;
}

const SpecificValueEntry: React.FC<SpecificValueProps> = ({ box, save }) => {
    return (
        <div className={styles.specificValue}>
            <h3>{box.name}</h3>
            <button onClick={() => save(0)}>0</button>
            <button onClick={() => save(box.value)}>{box.value}</button>
            <button onClick={() => save(undefined)}>Clear</button>
        </div>
    );
};

export default SpecificValueEntry;
