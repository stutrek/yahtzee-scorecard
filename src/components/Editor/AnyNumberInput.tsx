import React, { useState } from 'react';

import { AnyNumberBox } from '../../types';

import styles from './editor.module.css';

interface EntryBoxProps {
    save: Function;
}

interface AnyNumberProps extends EntryBoxProps {
    box: AnyNumberBox;
}
const AnyNumberEntry: React.FC<AnyNumberProps> = ({ box, save }) => {
    const [valueEntered, updateValue] = useState();

    const keyIsValid = (key: number) => {
        if (valueEntered * 10 + key > box.max) {
            return false;
        }
        if (key < box.min && key * 10 > box.max) {
            return false;
        }
        return true;
    };

    const handleClick = (key: number) => {
        let newVal;
        if (keyIsValid(key) === false) {
            return;
        }
        if (valueEntered) {
            newVal = valueEntered * 10 + key;
        } else {
            newVal = key;
        }

        updateValue(newVal);

        if (newVal >= box.min && newVal * 10 > box.max) {
            save(newVal);
        }
    };

    const backspace = () => {
        if (valueEntered === undefined || valueEntered < 10) {
            updateValue(undefined);
        }
        const value = Math.floor(valueEntered / 10);
        updateValue(value);
    };

    const saveIfValid = () => {
        if (valueEntered >= box.min && valueEntered <= box.max) {
            save(valueEntered);
        }
    };

    return (
        <div className={styles.anyNumber}>
            <h3>{box.name}</h3>
            <h4>{valueEntered}</h4>
            <div className={styles.keypad}>
                <button onClick={() => handleClick(1)}>1</button>
                <button onClick={() => handleClick(2)}>2</button>
                <button onClick={() => handleClick(3)}>3</button>
                <button onClick={() => handleClick(4)}>4</button>
                <button onClick={() => handleClick(5)}>5</button>
                <button onClick={() => handleClick(6)}>6</button>
                <button onClick={() => handleClick(7)}>7</button>
                <button onClick={() => handleClick(8)}>8</button>
                <button onClick={() => handleClick(9)}>9</button>
                <button onClick={() => handleClick(9)}>0</button>
                <button onClick={backspace}>⌫</button>
            </div>
            <button onClick={() => saveIfValid}>Save</button>
            <button onClick={() => save(undefined)}>Clear</button>
        </div>
    );
};
export default AnyNumberEntry;
