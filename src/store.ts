import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import editor, { EditorState } from './components/Editor/reducer';
import game, { GameState } from './components/Game/reducer';

export interface AppState {
    editor: EditorState;
    gameState: GameState 
}

export default createStore(combineReducers({ editor, game }), applyMiddleware(thunk));
