import { Dispatch, RootState } from '../../../RootReducer'
import { API } from '../../../../services/http'

import { actionCreators as uiActionCreators } from '../../../ui/actions'

import { ITag } from '../../types'

export const ASSIGN_LABEL = 'ASSIGN_LABEL'
export const ASSIGN_LABEL_ERROR = 'ASSIGN_LABEL_ERROR'
export const ASSIGN_LABEL_SUCCESS = 'ASSIGN_LABEL_SUCCESS'

export type Actions = {
    ASSIGN_LABEL: {  
        type: typeof ASSIGN_LABEL,
        cardId: number,
        label: ITag
    },
    ASSIGN_LABEL_ERROR: {    
        type: typeof ASSIGN_LABEL_ERROR
    },
    ASSIGN_LABEL_SUCCESS: {    
        type: typeof ASSIGN_LABEL_SUCCESS
    }
}

export const actionCreators = {
    assignLabelRequest: (cardId: number, label: ITag): Actions[typeof ASSIGN_LABEL] => ({     
        type: ASSIGN_LABEL,
        cardId,
        label
    }),
    assignLabelRequestError: (): Actions[typeof ASSIGN_LABEL_ERROR] => ({
        type: ASSIGN_LABEL_ERROR
    }),
    assignLabelRequestSuccess: (): Actions[typeof ASSIGN_LABEL_SUCCESS] => ({
        type: ASSIGN_LABEL_SUCCESS
    }),
    assignLabel: (cardId: number, label: ITag) => {     
        return (dispatch: Dispatch, getState: () => RootState) => {
            // If the label is already assigned to the card do nothing
            if (getState().cardsLabel[cardId].labels.find(l => l.id === label.id)) {
                return
            }

            dispatch(actionCreators.assignLabelRequest(cardId, label))
            return API.post(`/cards/${cardId}/labels`, { labelId: label.id }).then(
                cards => {
                    dispatch(actionCreators.assignLabelRequestSuccess())
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.assignLabelRequestError())
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                },
            )
        }
    }
}
