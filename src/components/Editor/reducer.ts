import { actionTypes, ActionInterfaces } from './actions';

export interface EditorState {
    open: boolean;
    player: number;
    box: number;
}

const initialState: EditorState = {
    open: false,
    player: -1,
    box: -1,
};

export default function(state = initialState, action: ActionInterfaces) {
    switch (action.type) {
        case actionTypes.OPEN_EDITOR:
            return {
                open: true,
                player: action.payload.player,
                box: action.payload.box,
            };

        case actionTypes.CLOSE_EDITOR:
            return {
                open: false,
                player: -1,
                box: -1,
            };
    }
    return state;
}
