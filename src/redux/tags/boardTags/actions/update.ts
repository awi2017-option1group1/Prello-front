import { Dispatch } from '../../../RootReducer'
import { API } from '../../../../services/http'

import { actionCreators as uiActionCreators } from '../../../ui/actions'

import { ITag } from '../../types'

export const UPDATE_LABEL = 'UPDATE_LABEL'
export const UPDATE_LABEL_ERROR = 'UPDATE_LABEL_ERROR'
export const UPDATE_LABEL_SUCCESS = 'UPDATE_LABEL_SUCCESS'

export type Actions = {
    UPDATE_LABEL: {  
        type: typeof UPDATE_LABEL,
        label: ITag
    },
    UPDATE_LABEL_ERROR: {    
        type: typeof UPDATE_LABEL_ERROR
    },
    UPDATE_LABEL_SUCCESS: {    
        type: typeof UPDATE_LABEL_SUCCESS
    }
}

export const actionCreators = {
    updateLabelRequest: (label: ITag): Actions[typeof UPDATE_LABEL] => ({     
        type: UPDATE_LABEL,
        label
    }),
    updateLabelRequestError: (): Actions[typeof UPDATE_LABEL_ERROR] => ({
        type: UPDATE_LABEL_ERROR
    }),
    updateLabelRequestSuccess: (): Actions[typeof UPDATE_LABEL_SUCCESS] => ({
        type: UPDATE_LABEL_SUCCESS
    }),
    updateLabel: (currentLabel: ITag, newValues: Partial<ITag>) => {     
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.updateLabelRequest(
                Object.assign({}, currentLabel, newValues)
            ))
            return API.put(`/labels/${currentLabel.id}`, newValues).then(
                label => {
                    dispatch(actionCreators.updateLabelRequestSuccess())
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.updateLabelRequestError())
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                },
            )
        }
    }
}
