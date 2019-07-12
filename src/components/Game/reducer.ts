import { actionTypes, ChangeGameAction } from './actions';

export interface GameState {
    gameId: string | undefined;
}

const initialState: GameState = {
    gameId: sessionStorage.getItem('current-game') || undefined,
};

export default function(state = initialState, action: ChangeGameAction) {
    switch (action.type) {
        case actionTypes.CHANGE_GAME:
			sessionStorage.setItem('current-game', action.payload);
            return {
                gameId: action.payload,
            };

    }
    return state;
}
