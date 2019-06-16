import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import editor, { EditorState } from './components/Editor/reducer';

export interface AppState {
    editor: EditorState;
}

export default createStore(combineReducers({ editor }), applyMiddleware(thunk));
