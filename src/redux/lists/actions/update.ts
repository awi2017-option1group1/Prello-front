import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { IList } from '../types'

export const UPDATE_BOARD_LIST = 'UPDATE_BOARD_LIST'
export const UPDATE_BOARD_LIST_SUCCESS = 'UPDATE_BOARD_LIST_SUCCESS'
export const UPDATE_BOARD_LIST_ERROR = 'UPDATE_BOARD_LIST_ERROR'

export type Actions = {
    UPDATE_BOARD_LIST: {
        type: typeof UPDATE_BOARD_LIST
    },
    UPDATE_BOARD_LIST_ERROR: {
        type: typeof UPDATE_BOARD_LIST_ERROR,
        error: string
    },
    UPDATE_BOARD_LIST_SUCCESS: {
        type: typeof UPDATE_BOARD_LIST_SUCCESS,
        list: IList
    }
}

export const actionCreators = {
    updateBoardListRequest: (): Actions[typeof UPDATE_BOARD_LIST] => ({
        type: UPDATE_BOARD_LIST
    }),
    updateBoardListRequestError: (error: string): Actions[typeof UPDATE_BOARD_LIST_ERROR] => ({
        type: UPDATE_BOARD_LIST_ERROR,
        error
    }),
    updateBoardListRequestSuccess: (list: IList): Actions[typeof UPDATE_BOARD_LIST_SUCCESS] => ({
        type: UPDATE_BOARD_LIST_SUCCESS,
        list
    }),
    updateBoardList: (currentList: IList, newValues: Partial<IList>) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.updateBoardListRequest())
            return API.put(`/lists/${currentList.id}`, newValues).then(
                list => dispatch(actionCreators.updateBoardListRequestSuccess(list)),
                error => dispatch(actionCreators.updateBoardListRequestError(error.error.error))
            )
        }
    }
}
