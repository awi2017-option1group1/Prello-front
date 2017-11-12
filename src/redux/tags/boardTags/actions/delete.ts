import { Dispatch } from '../../../RootReducer'
import { API } from '../../../../services/http'

import { actionCreators as uiActionCreators } from '../../../ui/actions'

import { ITag } from '../../types'

export const DELETE_LABEL = 'DELETE_LABEL'
export const DELETE_LABEL_ERROR = 'DELETE_LABEL_ERROR'
export const DELETE_LABEL_SUCCESS = 'DELETE_LABEL_SUCCESS'

export type Actions = {
    DELETE_LABEL: {  
        type: typeof DELETE_LABEL,
        label: ITag
    },
    DELETE_LABEL_ERROR: {    
        type: typeof DELETE_LABEL_ERROR
    },
    DELETE_LABEL_SUCCESS: {    
        type: typeof DELETE_LABEL_SUCCESS
    }
}

export const actionCreators = {
    deleteLabelRequest: (label: ITag): Actions[typeof DELETE_LABEL] => ({     
        type: DELETE_LABEL,
        label
    }),
    deleteLabelRequestError: (): Actions[typeof DELETE_LABEL_ERROR] => ({
        type: DELETE_LABEL_ERROR
    }),
    deleteLabelRequestSuccess: (): Actions[typeof DELETE_LABEL_SUCCESS] => ({
        type: DELETE_LABEL_SUCCESS
    }),
    deleteLabel: (label: ITag) => {     
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.deleteLabelRequest(label))
            return API.delete(`/labels/${label.id}`).then(
                response => {
                    dispatch(actionCreators.deleteLabelRequestSuccess())
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.deleteLabelRequestError())
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                },
            )
        }
    }
}
