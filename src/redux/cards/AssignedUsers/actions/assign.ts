import { Dispatch, RootState } from '../../../RootReducer'
import { API } from '../../../../services/http'

import { actionCreators as uiActionCreators } from '../../../ui/actions'

import { IUser } from '../../../users/types'

export const ASSIGN_USER = 'ASSIGN_USER'
export const ASSIGN_USER_ERROR = 'ASSIGN_USER_ERROR'
export const ASSIGN_USER_SUCCESS = 'ASSIGN_USER_SUCCESS'

export type Actions = {
    ASSIGN_USER: {  
        type: typeof ASSIGN_USER,
        cardId: number,
        user: IUser
    },
    ASSIGN_USER_ERROR: {    
        type: typeof ASSIGN_USER_ERROR
    },
    ASSIGN_USER_SUCCESS: {    
        type: typeof ASSIGN_USER_SUCCESS
    }
}

export const actionCreators = {
    assignUserRequest: (cardId: number, user: IUser): Actions[typeof ASSIGN_USER] => ({     
        type: ASSIGN_USER,
        cardId,
        user
    }),
    assignUserRequestError: (): Actions[typeof ASSIGN_USER_ERROR] => ({
        type: ASSIGN_USER_ERROR
    }),
    assignUserRequestSuccess: (): Actions[typeof ASSIGN_USER_SUCCESS] => ({
        type: ASSIGN_USER_SUCCESS
    }),
    assignUser: (cardID: number, user: IUser) => {     
        return (dispatch: Dispatch, getState: () => RootState) => {
            // If the user is already assigned to the card do nothing
            if (getState().assignees[cardID].assignees.find(l => l.id === user.id)) {
                return
            }

            dispatch(actionCreators.assignUserRequest(cardID, user))
            return API.post(`/cards/${cardID}/members`, { userId: user.id }).then(
                cards => {
                    dispatch(actionCreators.assignUserRequestSuccess())
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.assignUserRequestError())
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                },
            )
        }
    }
}
