import { Dispatch } from '../RootReducer'
import { API } from '../../services/http'

import { IList } from './types'

export const FETCH_BOARD_LISTS = 'FETCH_BOARD_LISTS'
export const FETCH_BOARD_LISTS_SUCCESS = 'FETCH_BOARD_LISTS_SUCCESS'
export const FETCH_BOARD_LISTS_ERROR = 'FETCH_BOARD_LISTS_ERROR'

export const CREATE_BOARD_LIST = 'CREATE_BOARD_LIST'
export const CREATE_BOARD_LIST_SUCCESS = 'CREATE_BOARD_LIST_SUCCESS'
export const CREATE_BOARD_LIST_ERROR = 'CREATE_BOARD_LIST_ERROR'

export const UPDATE_BOARD_LIST = 'UPDATE_BOARD_LIST'
export const UPDATE_BOARD_LIST_SUCCESS = 'UPDATE_BOARD_LIST_SUCCESS'
export const UPDATE_BOARD_LIST_ERROR = 'UPDATE_BOARD_LIST_ERROR'

export const DELETE_BOARD_LIST = 'DELETE_BOARD_LIST'
export const DELETE_BOARD_LIST_SUCCESS = 'DELETE_BOARD_LIST_SUCCESS'
export const DELETE_BOARD_LIST_ERROR = 'DELETE_BOARD_LIST_ERROR'

export type Actions = {
    FETCH_BOARD_LISTS: {
        type: typeof FETCH_BOARD_LISTS
    },
    FETCH_BOARD_LISTS_ERROR: {
        type: typeof FETCH_BOARD_LISTS_ERROR,
        error: string
    },
    FETCH_BOARD_LISTS_SUCCESS: {
        type: typeof FETCH_BOARD_LISTS_SUCCESS,
        lists: IList[]
    },

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
    },

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
    },

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
    fetchBoardListsRequest: (): Actions[typeof FETCH_BOARD_LISTS] => ({
        type: FETCH_BOARD_LISTS
    }),
    fetchBoardListsRequestError: (error: string): Actions[typeof FETCH_BOARD_LISTS_ERROR] => ({
        type: FETCH_BOARD_LISTS_ERROR,
        error
    }),
    fetchBoardListsRequestSuccess: (lists: IList[]): Actions[typeof FETCH_BOARD_LISTS_SUCCESS] => ({
        type: FETCH_BOARD_LISTS_SUCCESS,
        lists
    }),
    fetchBoardLists: (boardId: number) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchBoardListsRequest())
            return API.get(`/boards/${boardId}/lists`).then(
                lists => dispatch(actionCreators.fetchBoardListsRequestSuccess(lists)),
                error => dispatch(actionCreators.fetchBoardListsRequestError(error.error.error))
            )
        }
    },
    
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
    },

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
    },

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
