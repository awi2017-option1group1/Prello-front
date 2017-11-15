import { Dispatch, RootState } from '../../../RootReducer'
import { API } from '../../../../services/http'

import { actionCreators as uiActionCreators } from '../../../ui/actions'

import { IUser } from '../../../users/types'

export const UNASSIGN_USER = 'UNASSIGN_USER'
export const UNASSIGN_USER_ERROR = 'UNASSIGN_USER_ERROR'
export const UNASSIGN_USER_SUCCESS = 'UNASSIGN_USER_SUCCESS'

export type Actions = {
    UNASSIGN_USER: {  
        type: typeof UNASSIGN_USER,
        cardId: number,
        user: IUser
    },
    UNASSIGN_USER_ERROR: {    
        type: typeof UNASSIGN_USER_ERROR
    },
    UNASSIGN_USER_SUCCESS: {    
        type: typeof UNASSIGN_USER_SUCCESS
    }
}

export const actionCreators = {
    unassignUserRequest: (cardId: number, user: IUser): Actions[typeof UNASSIGN_USER] => ({     
        type: UNASSIGN_USER,
        cardId,
        user
    }),
    unassignUserRequestError: (): Actions[typeof UNASSIGN_USER_ERROR] => ({
        type: UNASSIGN_USER_ERROR
    }),
    unassignUserRequestSuccess: (): Actions[typeof UNASSIGN_USER_SUCCESS] => ({
        type: UNASSIGN_USER_SUCCESS
    }),
    unassignUser: (cardID: number, user: IUser) => {     
        return (dispatch: Dispatch, getState: () => RootState) => {
            dispatch(actionCreators.unassignUserRequest(cardID, user))
            return API.delete(`/cards/${cardID}/members/${user.id}`).then(
                cards => {
                    dispatch(actionCreators.unassignUserRequestSuccess())
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.unassignUserRequestError())
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                },
            )
        }
    }
}
