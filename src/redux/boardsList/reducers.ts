import { FETCH_BOARDS, FETCH_BOARDS_ERROR, FETCH_BOARDS_SUCCESS } from './actions/fetchAll'
import { CREATE_BOARD, CREATE_BOARD_ERROR, CREATE_BOARD_SUCCESS } from './actions/create'
import { RootAction } from '../RootAction'
import { IBoard } from '../boards/types'

export type State = {
    error: string | null,
    isProcessing: boolean,
    boards: IBoard[],
}

const defaultValue: State = {
    error: null,
    isProcessing: false,
    boards: []
}

export const reducer = (state: State = defaultValue, action: RootAction) => {
        switch (action.type) {
            case FETCH_BOARDS:
                return {
                    ...state,
                    error: null,
                    isProcessing: true,
                }

            case FETCH_BOARDS_SUCCESS:
                return {
                    ...state,
                    error: null,
                    isProcessing: false,
                    boards: action.boards
                }

            case FETCH_BOARDS_ERROR:
                return {
                    ...state,
                    error: action.error,
                    isProcessing: false
                }

            case CREATE_BOARD:
                return {
                    ...state,
                    error: null,
                    isProcessing: true,
                    boards: state.boards.concat(action.board as IBoard)
                }

            case CREATE_BOARD_SUCCESS:
                return {
                    ...state,
                    error: null,
                    isProcessing: false,
                    boards: state.boards
                        .filter(b => b.id !== null && b.id !== undefined)
                        .concat(action.board as IBoard)
                }

            case CREATE_BOARD_ERROR:
                return {
                    ...state,
                    isProcessing: false,
                    error: action.error
                }

            default:
                return state
    }
  }
