import { Dispatch, RootState } from '../../RootReducer'
import { API } from '../../../services/http'

import { IUser } from '../types'

export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'

export type Actions = {
    FETCH_USER: {
        type: typeof FETCH_USER
    },
    FETCH_USER_ERROR: {
        type: typeof FETCH_USER_ERROR,
        error: string
    },
    FETCH_USER_SUCCESS: {
        type: typeof FETCH_USER_SUCCESS,
        user: IUser
    }
}

export const actionCreators = {
    fetchUserRequest: (): Actions[typeof FETCH_USER] => ({
        type: FETCH_USER
    }),
    fetchUserRequestError: (error: string): Actions[typeof FETCH_USER_ERROR] => ({
        type: FETCH_USER_ERROR,
        error
    }),
    fetchUserRequestSuccess: (user: IUser): Actions[typeof FETCH_USER_SUCCESS] => ({
        type: FETCH_USER_SUCCESS,
        user
    }),
    fetchUser: () => {
        return (dispatch: Dispatch, getState: () => RootState) => {
            dispatch(actionCreators.fetchUserRequest())
            const userId = getState().auth.user!.uid
            return API.get(`/users/${userId}`).then(
                user => dispatch(actionCreators.fetchUserRequestSuccess(user)),
                error => dispatch(actionCreators.fetchUserRequestError(error.error.error))
            )
        }
    }
}
