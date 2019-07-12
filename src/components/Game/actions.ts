export enum actionTypes {
    CHANGE_GAME = 'CHANGE_GAME',
}

export interface ChangeGameAction {
	readonly type: actionTypes.CHANGE_GAME,
	payload: string
}

export function changeGame(newId: string): ChangeGameAction {
	return {
		type: actionTypes.CHANGE_GAME,
		payload: newId
	}
}