import { Dispatch, RootState } from '../../RootReducer'
import { API } from '../../../services/http'

import { IUser } from '../types'

export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'

export const CONFIRM_EMAIL = 'CONFIRM_EMAIL'
export const CONFIRM_EMAIL_ERROR = 'CONFIRM_EMAIL_ERROR'
export const CONFIRM_EMAIL_SUCCESS = 'CONFIRM_EMAIL_SUCCESS'

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
    },

    CONFIRM_EMAIL: {
        type: typeof CONFIRM_EMAIL
    },
    CONFIRM_EMAIL_ERROR: {
        type: typeof CONFIRM_EMAIL_ERROR
        error: string
    },
    CONFIRM_EMAIL_SUCCESS: {
        type: typeof CONFIRM_EMAIL_SUCCESS,
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

    confirmUserRequest: (): Actions[typeof CONFIRM_EMAIL] => ({
        type: CONFIRM_EMAIL
    }),
    confirmUserError: (error: string): Actions[typeof CONFIRM_EMAIL_ERROR] => ({
        type: CONFIRM_EMAIL_ERROR,
        error: error
    }),
    confirmUserSuccess: (user: IUser): Actions[typeof CONFIRM_EMAIL_SUCCESS] => ({
        type: CONFIRM_EMAIL_SUCCESS,
        user: user
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
    },

    confirmEmail: (userID: number, uuidToken: string) => {
        return (dispatch: Dispatch, getState: () => RootState) => {
            dispatch(actionCreators.confirmUserRequest())
            return API.post(`/users/${userID}/confirm/${uuidToken}`).then(
                user => dispatch(actionCreators.confirmUserSuccess(user)),
                error => dispatch(actionCreators.confirmUserError(error))
            )
        }
    }
}
