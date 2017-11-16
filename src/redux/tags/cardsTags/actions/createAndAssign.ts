import { Dispatch } from '../../../RootReducer'
import { API } from '../../../../services/http'

import { actionCreators as cardLabelActionCreators } from '../actions'
import { actionCreators as boardLabelActionCreators } from '../../boardTags/actions'
import { actionCreators as uiActionCreators } from '../../../ui/actions'

import { ITag } from '../../types'

export const actionCreators = {
    createAndAssignLabel: (boardId: number, cardId: number, newLabel: Partial<ITag>) => {     
        return async (dispatch: Dispatch) => {
            dispatch(cardLabelActionCreators.assignLabelRequest(cardId, newLabel as ITag))
            dispatch(boardLabelActionCreators.createLabelRequest(newLabel))
            try {
                const label = await API.post(`/boards/${boardId}/labels`, newLabel)
                await API.post(`/cards/${cardId}/labels`, { labelId: label.id })

                dispatch(boardLabelActionCreators.createLabelSuccess(label))
                dispatch(cardLabelActionCreators.assignLabelRequestSuccess())
                dispatch(uiActionCreators.showSaveMessage())
            } catch (error) {
                dispatch(boardLabelActionCreators.createLabelError(error.message))
                dispatch(cardLabelActionCreators.assignLabelRequestError())
                dispatch(uiActionCreators.showCanNotSaveMessage())
            }
        }
    }
}
