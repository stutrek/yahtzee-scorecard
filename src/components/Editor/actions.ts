import { EntryBox, FormulaBox } from '../../types';

export enum actionTypes {
    OPEN_EDITOR = 'OPEN_EDITOR',
    CLOSE_EDITOR = 'CLOSE_EDITOR',
}

interface OpenPayload {
    player: number;
    box: number;
}

interface OpenEditorAction {
    type: actionTypes.OPEN_EDITOR;
    payload: OpenPayload;
}

interface CloseEditorAction {
    type: actionTypes.CLOSE_EDITOR;
}

interface SavePayload {
    game: number;
    player: number;
    box: number;
    value?: number;
}

export type ActionInterfaces = OpenEditorAction | CloseEditorAction;

export const openEditor = (payload: OpenPayload): OpenEditorAction => ({
    type: actionTypes.OPEN_EDITOR,
    payload,
});

export const closeEditor = (): CloseEditorAction => ({
    type: actionTypes.CLOSE_EDITOR,
});

export const save = (dispatch: Function) => async (payload: SavePayload): Promise<void> => {
    dispatch({
        type: actionTypes.CLOSE_EDITOR,
    });
};
