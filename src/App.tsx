import React from 'react';
import styles from './App.module.css';
import Game from './components/Game';

import { useUIPreferences, useCurrentGame } from './data/dataHooks';

const App: React.FC = () => {
    const [prefsLoading, preferences] = useUIPreferences();
    const [game] = useCurrentGame();

    if (prefsLoading || game === undefined) {
        return <div className="App">Loading...</div>;
    }

    return (
        <div className={styles.app}>
            <Game game={game} />
        </div>
    );
};

export default App;
