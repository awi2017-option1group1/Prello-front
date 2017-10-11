import { IList } from '../lists/types'

export const ADD_BOARD = 'ADD_BOARD'
export const REMOVE_SINGLE_BOARD = 'REMOVE_SINGLE_BOARD'

export type Actions = {
    ADD_BOARD: {
        type: typeof ADD_BOARD,
        id: number,
        title: string,
        isPrivate: boolean,
        lists: IList[],
    },
    REMOVE_SINGLE_BOARD: {
        type: typeof REMOVE_SINGLE_BOARD,
        index: number,
    },
}

export const actionCreators = {
    addBoard: (id: number, title: string, isPrivate: boolean, lists: IList[]): Actions[typeof ADD_BOARD] => ({
        type: ADD_BOARD,
        id,
        title,
        isPrivate,
        lists,
    }),
    removeBoard: (index: number): Actions[typeof REMOVE_SINGLE_BOARD] => ({
        type: REMOVE_SINGLE_BOARD,
        index,
    }),
}
