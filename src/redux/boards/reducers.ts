import { RootAction } from '../RootAction'
import { FETCH_BOARD, FETCH_BOARD_ERROR, FETCH_BOARD_SUCCESS } from './actions'

import { IBoard } from './types'

export type State = {
    error: string | null,
    isProcessing: boolean,
    board: IBoard
}

const defaultValue: State = {
    error: null,
    isProcessing: false,
    board: {
        id: -1,
        name: '',
        isPrivate: false
    }
}

export const reducer = (state: State = defaultValue, action: RootAction) => { 
    switch (action.type) {
        case FETCH_BOARD:
            return {
                ...state,
                error: null,
                isProcessing: true,
                board: {
                    ...defaultValue.board,
                    id: action.boardId
                }
            }
        
        case FETCH_BOARD_SUCCESS: 
            return {
                ...state,
                error: null,
                isProcessing: false,
                board: action.board
            }

        case FETCH_BOARD_ERROR:
            return {
                ...state,
                error: action.error,
                isProcessing: false
            }    

        default:
            return state
    }
}
