import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { actionCreators as uiActionCreators } from '../../ui/actions'

import { IList } from '../types'

export const CREATE_BOARD_LIST = 'CREATE_BOARD_LIST'
export const CREATE_BOARD_LIST_SUCCESS = 'CREATE_BOARD_LIST_SUCCESS'
export const CREATE_BOARD_LIST_ERROR = 'CREATE_BOARD_LIST_ERROR'

export type Actions = {
    CREATE_BOARD_LIST: {
        type: typeof CREATE_BOARD_LIST,
        list: Partial<IList>
    },
    CREATE_BOARD_LIST_ERROR: {
        type: typeof CREATE_BOARD_LIST_ERROR,
        error: string
    },
    CREATE_BOARD_LIST_SUCCESS: {
        type: typeof CREATE_BOARD_LIST_SUCCESS,
        list: IList
    }
}

export const actionCreators = {    
    createBoardListRequest: (list: Partial<IList>): Actions[typeof CREATE_BOARD_LIST] => ({
        type: CREATE_BOARD_LIST,
        list
    }),
    createBoardListRequestError: (error: string): Actions[typeof CREATE_BOARD_LIST_ERROR] => ({
        type: CREATE_BOARD_LIST_ERROR,
        error
    }),
    createBoardListRequestSuccess: (list: IList): Actions[typeof CREATE_BOARD_LIST_SUCCESS] => ({
        type: CREATE_BOARD_LIST_SUCCESS,
        list
    }),
    createBoardList: (boardId: number) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.createBoardListRequest({
                name: 'EmptyName'
            }))
            return API.post(`/boards/${boardId}/lists`).then(
                list => {
                    dispatch(actionCreators.createBoardListRequestSuccess(list))
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.createBoardListRequestError(error.error.error))
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                }
            )
        }
    }
}
