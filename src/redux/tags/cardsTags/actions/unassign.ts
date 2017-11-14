import { Dispatch, RootState } from '../../../RootReducer'
import { API } from '../../../../services/http'

import { actionCreators as uiActionCreators } from '../../../ui/actions'

import { ITag } from '../../types'

export const UNASSIGN_LABEL = 'UNASSIGN_LABEL'
export const UNASSIGN_LABEL_ERROR = 'UNASSIGN_LABEL_ERROR'
export const UNASSIGN_LABEL_SUCCESS = 'UNASSIGN_LABEL_SUCCESS'

export type Actions = {
    UNASSIGN_LABEL: {  
        type: typeof UNASSIGN_LABEL,
        cardId: number,
        label: ITag
    },
    UNASSIGN_LABEL_ERROR: {    
        type: typeof UNASSIGN_LABEL_ERROR
    },
    UNASSIGN_LABEL_SUCCESS: {    
        type: typeof UNASSIGN_LABEL_SUCCESS
    }
}

export const actionCreators = {
    unassignLabelRequest: (cardId: number, label: ITag): Actions[typeof UNASSIGN_LABEL] => ({     
        type: UNASSIGN_LABEL,
        cardId,
        label
    }),
    unassignLabelRequestError: (): Actions[typeof UNASSIGN_LABEL_ERROR] => ({
        type: UNASSIGN_LABEL_ERROR
    }),
    unassignLabelRequestSuccess: (): Actions[typeof UNASSIGN_LABEL_SUCCESS] => ({
        type: UNASSIGN_LABEL_SUCCESS
    }),
    unassignLabel: (cardId: number, label: ITag) => {     
        return (dispatch: Dispatch, getState: () => RootState) => {
            dispatch(actionCreators.unassignLabelRequest(cardId, label))
            return API.delete(`/cards/${cardId}/labels/${label.id}`).then(
                cards => {
                    dispatch(actionCreators.unassignLabelRequestSuccess())
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.unassignLabelRequestError())
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                },
            )
        }
    }
}
