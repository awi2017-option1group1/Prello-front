import { Dispatch, RootState } from '../../../RootReducer'
import { API } from '../../../../services/http'

import { actionCreators as uiActionCreators } from '../../../ui/actions'

import { ITag } from '../../types'

export const CREATE_LABEL = 'CREATE_LABEL'
export const CREATE_LABEL_SUCCESS = 'CREATE_LABEL_SUCCESS'
export const CREATE_LABEL_ERROR = 'CREATE_LABEL_ERROR'

export type Actions = {
    CREATE_LABEL: {   
        type: typeof CREATE_LABEL,
        label: Partial<ITag>
    },
    CREATE_LABEL_SUCCESS: {   
        type: typeof CREATE_LABEL_SUCCESS,
        label: ITag
    },
    CREATE_LABEL_ERROR: {     
        type: typeof CREATE_LABEL_ERROR
    }
}

export const actionCreators = {
    createLabelRequest: (label: Partial<ITag>): Actions[typeof CREATE_LABEL] => ({
        type: CREATE_LABEL,
        label
    }),
    createLabelSuccess: (label: ITag): Actions[typeof CREATE_LABEL_SUCCESS] => ({
        type: CREATE_LABEL_SUCCESS,
        label
    }),
    createLabelError: (error: string): Actions[typeof CREATE_LABEL_ERROR] => ({
        type: CREATE_LABEL_ERROR
    }),
    createLabel: (boardId: number, values: Partial<ITag>) => {    
        return (dispatch: Dispatch, getState: () => RootState) => {
            dispatch(actionCreators.createLabelRequest(values))
            return API.post(`/boards/${boardId}/labels`, values).then(
                label => {
                    dispatch(actionCreators.createLabelSuccess(label))
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.createLabelError(error.message))
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                }
            )
        }
    }
}
