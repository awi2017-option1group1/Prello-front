import { Dispatch, RootState } from '../../RootReducer'
import { API } from '../../../services/http'

import { reorder } from '../../../services/collection'

import { actionCreators as uiActionCreators } from '../../ui/actions'

import { IList } from '../types'

export const MOVE_BOARD_LIST = 'MOVE_BOARD_LIST'
export const MOVE_BOARD_LIST_SUCCESS = 'MOVE_BOARD_LIST_SUCCESS'
export const MOVE_BOARD_LIST_ERROR = 'MOVE_BOARD_LIST_ERROR'

export type Actions = {
    MOVE_BOARD_LIST: {
        type: typeof MOVE_BOARD_LIST,
        lists: IList[]
    },
    MOVE_BOARD_LIST_ERROR: {
        type: typeof MOVE_BOARD_LIST_ERROR,
        error: string
    },
    MOVE_BOARD_LIST_SUCCESS: {
        type: typeof MOVE_BOARD_LIST_SUCCESS,
        lists: IList[]
    }
}

export const actionCreators = {
    moveBoardListRequest: (newLists: IList[]): Actions[typeof MOVE_BOARD_LIST] => ({
        type: MOVE_BOARD_LIST,
        lists: newLists
    }),
    moveBoardListRequestError: (error: string): Actions[typeof MOVE_BOARD_LIST_ERROR] => ({
        type: MOVE_BOARD_LIST_ERROR,
        error
    }),
    moveBoardListRequestSuccess: (newLists: IList[]): Actions[typeof MOVE_BOARD_LIST_SUCCESS] => ({
        type: MOVE_BOARD_LIST_SUCCESS,
        lists: newLists
    }),
    moveBoardList: (source: number, destination: number) => {
        return (dispatch: Dispatch, getState: () => RootState) => {
            const newLists = reorder(getState().lists.lists, source, destination)
            dispatch(actionCreators.moveBoardListRequest(newLists))

            // Only update the lists that have new index
            Promise.all(
                newLists.map((list, index) => {
                    return API.put(`/lists/${list.id}`, { pos: index })
                })
            ).then(
                updatedLists => {
                    dispatch(actionCreators.moveBoardListRequestSuccess(updatedLists))
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.moveBoardListRequestError(error))
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                }
            )
        }
    }
}
