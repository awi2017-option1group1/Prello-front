import { Dispatch } from '../RootReducer'
import { API } from '../../services/http'

import { FormErrors } from '../forms'

export const SEND_MAIL = 'SEND_MAIL'
export const SEND_MAIL_SUCCESS = 'SEND_MAIL_SUCCESS'
export const SEND_MAIL_ERROR = 'SEND_MAIL_ERROR'

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD' 
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR'

export type Actions = {
    SEND_MAIL: {
        type: typeof SEND_MAIL
    },
    SEND_MAIL_ERROR: {
        type: typeof SEND_MAIL_ERROR,
        errors: FormErrors
    },
    SEND_MAIL_SUCCESS: {
        type: typeof SEND_MAIL_SUCCESS,
        bool: boolean
    },
    CHANGE_PASSWORD: {
        type: typeof CHANGE_PASSWORD
    },
    CHANGE_PASSWORD_ERROR: {
        type: typeof CHANGE_PASSWORD_ERROR,
        errors: FormErrors
    },
    CHANGE_PASSWORD_SUCCESS: {
        type: typeof CHANGE_PASSWORD_SUCCESS,
        bool: boolean
    },
    
}

export const actionCreators = {
    sendMailRequest: (): Actions[typeof SEND_MAIL] => ({
        type: SEND_MAIL
    }),
    sendMailRequestError: (errors: FormErrors): Actions[typeof SEND_MAIL_ERROR] => ({
        type: SEND_MAIL_ERROR,
        errors
    }),
    sendMailRequestSuccess: (bool: boolean): Actions[typeof SEND_MAIL_SUCCESS] => ({
        type: SEND_MAIL_SUCCESS,
        bool
    }),

    resetPasswordRequest: (): Actions[typeof CHANGE_PASSWORD] => ({
        type: CHANGE_PASSWORD
    }),
    resetPasswordRequestError: (errors: FormErrors): Actions[typeof CHANGE_PASSWORD_ERROR] => ({
        type: CHANGE_PASSWORD_ERROR,
        errors
    }),
    resetPasswordRequestSuccess: (bool: boolean): Actions[typeof CHANGE_PASSWORD_SUCCESS] => ({
        type: CHANGE_PASSWORD_SUCCESS,
        bool
    }),

    sendMail: (email: string) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.sendMailRequest())
            return API.post(`/users/forgot`, {email: email}).then(
                bool => dispatch(actionCreators.sendMailRequestSuccess(bool)),
                error => dispatch(actionCreators.sendMailRequestError(error.error.error))
            )
        }
    },

    resetPassword: (password: string, userID: number, token: string) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.sendMailRequest())
            
            return API.post(`/users/${userID}/reset/${token}`, {password: password}).then(
                bool => dispatch(actionCreators.sendMailRequestSuccess(bool)),
                error => dispatch(actionCreators.sendMailRequestError(error.error.error))
            )
        }
    }
}
