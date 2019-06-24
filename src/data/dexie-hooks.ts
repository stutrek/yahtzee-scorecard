import { useState, useEffect, useMemo } from 'react';
import Dexie from 'dexie';

type TableHook<T> = [boolean, undefined | T[]];
type ItemHook<T> = [boolean, undefined | T];

interface IDatabaseChangeMock {
    table: string;
    key: string | number;
}

interface Listeners {}

const dbs: Map<Dexie, Function[]> = new Map();

const addListener = (db: Dexie, listener: Function): void => {
    if (!dbs.get(db)) {
        dbs.set(db, []);
        db.on('changes', changes => {
            const listeners = dbs.get(db);
            if (!listeners) {
                return;
            }
            for (const listener of listeners) {
                listener(changes);
            }
        });
    }
    const arr = dbs.get(db);
    if (!arr) {
        return;
    }
    arr.push(listener);
};

const removeListener = (db: Dexie, listener: Function) => {
    const listeners = dbs.get(db);
    if (!listeners) {
        return;
    }
    dbs.set(db, listeners.filter(cb => cb !== listener));
};

export const useItemById = <T>(
    db: Dexie,
    table: Dexie.Table<T, any>,
    id: string | number | undefined
): ItemHook<T> => {

    if (db.table(table.name) !== table) {
        throw new Error(`useItemById was provided a table (${table.name}) that does not belong to the provided DB.`);
    }

    const [value, setValue] = useState<T | undefined>();
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleChange = async (changes: IDatabaseChangeMock[]) => {
            for (const change of changes) {
                if (change.key === id) {
                    const newValue = await table.get(id);
                    setValue(newValue);
                }
            }
        };
        addListener(db, handleChange);
        return () => removeListener(db, handleChange);
    }, [db, table, id]);

    useMemo(() => {
        setLoading(true);
        table.get(id).then(newValue => {
            if (newValue) {
                setValue(newValue);
            }
            setLoading(false);
        });
      
    }, [table, id]);

    return [loading, value];
};

export const useTable = <T>(
    db: Dexie,
    table: Dexie.Table<T, any>
    // initialValue: T
): TableHook<T> => {
    if (db.table(table.name) !== table) {
        throw new Error(`useTable was provided a table (${table.name}) that does not belong to the provided DB.`);
    }

    const [values, setValues] = useState<T[] | undefined>();
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleChange = async (changes: IDatabaseChangeMock[]) => {
            for (const change of changes) {
                if (change.table === table.name) {
                    const newValues = await table.toArray();
                    setValues(newValues);
                    return;
                }
            }
        };
        addListener(db, handleChange);
        return () => removeListener(db, handleChange);
    }, [db, table]);

    useMemo(() => {
        setLoading(true);
        table.toArray().then(items => {
            setValues(items);
            setLoading(false);
        });
    }, [table]);

    return [loading, values];
};
