import { Dispatch } from '../../../RootReducer'
import { API } from '../../../../services/http'

import { ITag } from '../../types'

export const FETCH_BOARD_LABELS = 'FETCH_BOARD_LABELS'
export const FETCH_BOARD_LABELS_ERROR = 'FETCH_BOARD_LABELS_ERROR'
export const FETCH_BOARD_LABELS_SUCCESS = 'FETCH_BOARD_LABELS_SUCCESS'

export type Actions = {
    FETCH_BOARD_LABELS: {  
        type: typeof FETCH_BOARD_LABELS
    },
    FETCH_BOARD_LABELS_ERROR: {
        type: typeof FETCH_BOARD_LABELS_ERROR,
        error: string
    },
    FETCH_BOARD_LABELS_SUCCESS: {    
        type: typeof FETCH_BOARD_LABELS_SUCCESS,
        labels: ITag[]
    }
}

export const actionCreators = {
    fetchBoardLabelsRequest: (): Actions[typeof FETCH_BOARD_LABELS] => ({     
        type: FETCH_BOARD_LABELS
    }),
    fetchBoardLabelsRequestError: (error: string): Actions[typeof FETCH_BOARD_LABELS_ERROR] => ({
        type: FETCH_BOARD_LABELS_ERROR,
        error
    }),
    fetchBoardLabelsRequestSuccess: (labels: ITag[]): Actions[typeof FETCH_BOARD_LABELS_SUCCESS] => ({
        type: FETCH_BOARD_LABELS_SUCCESS,
        labels
    }),
    fetchBoardLabels: (boardId: number) => {     
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchBoardLabelsRequest())
            return API.get(`/boards/${boardId}/labels`).then(
                labels => dispatch(actionCreators.fetchBoardLabelsRequestSuccess(labels)),
                error => dispatch(actionCreators.fetchBoardLabelsRequestError(error.message)),
            )
        }
    }
}
