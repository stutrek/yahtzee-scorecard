import React from 'react';
import styles from './App.module.css';
import Game from './components/Game';
import Editor from './components/Editor';

import { useSelector } from 'react-redux';
import { AppState } from './store';

import { useUIPreferences, useCurrentGame } from './data/dataHooks';

import parser from './data/parser';

const App: React.FC = () => {
    const [prefsLoading, preferences] = useUIPreferences();
    const [game, updateGame] = useCurrentGame();
    
    const editorState = useSelector((state: AppState) => state.editor);

    parser.preferences = preferences;

    if (prefsLoading || game === undefined) {
        return <div className="App">Loading...</div>;
    }

    return (
        <div className={styles.app}>
            <Game game={game} />
            {editorState.open && (
                <Editor
                    player={editorState.player}
                    box={editorState.box}
                    game={game}
                    updateGame={updateGame}
                />
            )}
        </div>
    );
};

export default App;
