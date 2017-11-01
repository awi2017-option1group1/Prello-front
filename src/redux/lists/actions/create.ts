import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { IList } from '../types'

export const CREATE_BOARD_LIST = 'CREATE_BOARD_LIST'
export const CREATE_BOARD_LIST_SUCCESS = 'CREATE_BOARD_LIST_SUCCESS'
export const CREATE_BOARD_LIST_ERROR = 'CREATE_BOARD_LIST_ERROR'

export type Actions = {
    CREATE_BOARD_LIST: {
        type: typeof CREATE_BOARD_LIST
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
    createBoardListRequest: (): Actions[typeof CREATE_BOARD_LIST] => ({
        type: CREATE_BOARD_LIST
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
            dispatch(actionCreators.createBoardListRequest())
            return API.post(`/boards/${boardId}/lists`).then(
                list => dispatch(actionCreators.createBoardListRequestSuccess(list)),
                error => dispatch(actionCreators.createBoardListRequestError(error.error.error))
            )
        }
    }
}
