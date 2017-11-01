import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { IList } from '../types'

export const DELETE_BOARD_LIST = 'DELETE_BOARD_LIST'
export const DELETE_BOARD_LIST_SUCCESS = 'DELETE_BOARD_LIST_SUCCESS'
export const DELETE_BOARD_LIST_ERROR = 'DELETE_BOARD_LIST_ERROR'

export type Actions = {
    DELETE_BOARD_LIST: {
        type: typeof DELETE_BOARD_LIST
    },
    DELETE_BOARD_LIST_ERROR: {
        type: typeof DELETE_BOARD_LIST_ERROR,
        error: string
    },
    DELETE_BOARD_LIST_SUCCESS: {
        type: typeof DELETE_BOARD_LIST_SUCCESS,
        list: IList
    }
}

export const actionCreators = {
    deleteBoardListRequest: (): Actions[typeof DELETE_BOARD_LIST] => ({
        type: DELETE_BOARD_LIST
    }),
    deleteBoardListRequestError: (error: string): Actions[typeof DELETE_BOARD_LIST_ERROR] => ({
        type: DELETE_BOARD_LIST_ERROR,
        error
    }),
    deleteBoardListRequestSuccess: (list: IList): Actions[typeof DELETE_BOARD_LIST_SUCCESS] => ({
        type: DELETE_BOARD_LIST_SUCCESS,
        list
    }),
    deleteBoardList: (list: IList) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.deleteBoardListRequest())
            return API.delete(`/lists/${list.id}`).then(
                response => dispatch(actionCreators.deleteBoardListRequestSuccess(list)),
                error => dispatch(actionCreators.deleteBoardListRequestError(error.error.error))
            )
        }
    }
}
