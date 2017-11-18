import { RootAction } from '../RootAction'
import { FETCH_BOARD, FETCH_BOARD_ERROR, FETCH_BOARD_SUCCESS, FETCH_BOARD_USERS_SUCCESS } from './actions/fetch'
import {
    UPDATE_BOARD,
    UPDATE_BOARD_SUCCESS,
    UPDATE_BOARD_ERROR,
    UPDATE_BOARD_USERS_SUCCESS,
    REMOVE_BOARD_USER_SUCCESS
} from './actions/update'
import { OPEN_CREATE_CARD_MODEL, CLOSE_CREATE_CARD_MODAL } from './actions/openModal'

import { IBoard } from './types'
import { IUser } from '../users/types'
import { IList } from '../lists/types'

export type State = {
    error: string | null,
    isProcessing: boolean,
    board: IBoard,
    listToAppendCard: IList | null
    users: IUser[]
}

const defaultValue: State = {
    error: null,
    isProcessing: false,
    board: {
        id: -1,
        name: '',
        isPrivate: false
    },
    listToAppendCard: null,
    users: []
}

export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {
        case FETCH_BOARD:
            return {
                ...state,
                error: null,
                isProcessing: true,
            }

        case FETCH_BOARD_SUCCESS:
            return {
                ...state,
                error: null,
                isProcessing: false,
                board: action.board
            }

        case FETCH_BOARD_USERS_SUCCESS:
            return {
                ...state,
                error: null,
                isProcessing: false,
                users: action.users
            }

        case FETCH_BOARD_ERROR:
            return {
                ...state,
                error: action.error,
                isProcessing: false
            }

        case UPDATE_BOARD:
            return {
                ...state,
                error: null,
                isProcessing: true,
            }

        case UPDATE_BOARD_SUCCESS:
            return {
                ...state,
                error: null,
                isProcessing: false,
                board: action.board
            }

        case UPDATE_BOARD_USERS_SUCCESS:
            return {
                ...state,
                error: null,
                isProcessing: false,
                users: state.users.concat(action.user)
            }

        case REMOVE_BOARD_USER_SUCCESS:
            return {
                ...state,
                error: null,
                isProcessing: false,
                users: state.users.filter(u => u.id !== action.user.id)
            }

        case UPDATE_BOARD_ERROR:
            return {
                ...state,
                error: action.error,
                isProcessing: false
            }

        case OPEN_CREATE_CARD_MODEL:
            return {
                ...state,
                listToAppendCard: action.list
            }

        case CLOSE_CREATE_CARD_MODAL:
            return {
                ...state,
                listToAppendCard: null
            }

        default:
            return state
    }
}
