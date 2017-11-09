import { Dispatch, RootState } from '../../RootReducer'
import { API } from '../../../services/http'

import { IUser } from '../types'

export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR'

export type Actions = {
    UPDATE_USER: {
        type: typeof UPDATE_USER
    },
    UPDATE_USER_ERROR: {
        type: typeof UPDATE_USER_ERROR,
        error: string
    },
    UPDATE_USER_SUCCESS: {
        type: typeof UPDATE_USER_SUCCESS,
        user: IUser
    }
}

export const actionCreators = {
    updateUserRequest: (): Actions[typeof UPDATE_USER] => ({
        type: UPDATE_USER
    }),
    updateUserRequestError: (error: string): Actions[typeof UPDATE_USER_ERROR] => ({
        type: UPDATE_USER_ERROR,
        error
    }),
    updateUserRequestSuccess: (user: IUser): Actions[typeof UPDATE_USER_SUCCESS] => ({
        type: UPDATE_USER_SUCCESS,
        user
    }),
    updateUser: (newValues: Partial<IUser>) => {
        return (dispatch: Dispatch, getState: () => RootState) => {
            dispatch(actionCreators.updateUserRequest())
            const userId = getState().auth.user!.uid
            return API.put(`/users/${userId}`, newValues).then(
                user => dispatch(actionCreators.updateUserRequestSuccess(user)),
                error => dispatch(actionCreators.updateUserRequestError(error.error.error))
            )
        }
    }
}
