import { Dispatch } from '../RootReducer'
import { API } from '../../services/http'

import { FormErrors } from '../forms'

export const SEND_MAIL = 'SEND_MAIL'
export const SEND_MAIL_SUCCESS = 'SEND_MAIL_SUCCESS'
export const SEND_MAIL_ERROR = 'SEND_MAIL_ERROR'

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD' 
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR'

export const CONFIRM_LINK = 'CONFIRM_LINK'
export const CONFIRM_LINK_SUCCESS = 'CONFIRM_LINK_SUCCESS'
export const CONFIRM_LINK_ERROR = 'CONFIRM_LINK_ERROR'

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

    CONFIRM_LINK: {
        type: typeof CONFIRM_LINK
    },
    CONFIRM_LINK_ERROR: {
        type: typeof CONFIRM_LINK_ERROR,
        error: string
    },
    CONFIRM_LINK_SUCCESS: {
        type: typeof CONFIRM_LINK_SUCCESS,
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

    resetPasswordRequest: (): Actions[typeof CONFIRM_LINK] => ({
        type: CONFIRM_LINK
    }),
    resetPasswordRequestError: (errors: FormErrors): Actions[typeof CHANGE_PASSWORD_ERROR] => ({
        type: CHANGE_PASSWORD_ERROR,
        errors
    }),
    resetPasswordRequestSuccess: (bool: boolean): Actions[typeof CHANGE_PASSWORD_SUCCESS] => ({
        type: CHANGE_PASSWORD_SUCCESS,
        bool
    }),

    confirmRequest: (): Actions[typeof CONFIRM_LINK] => ({
        type: CONFIRM_LINK
    }),
    confirmRequestError: (error: string): Actions[typeof CONFIRM_LINK_ERROR] => ({
        type: CONFIRM_LINK_ERROR,
        error
    }),
    confirmRequestSuccess: (bool: boolean): Actions[typeof CONFIRM_LINK_SUCCESS] => ({
        type: CONFIRM_LINK_SUCCESS,
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
    },

    confirmLink: (userID: number, token: string) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.confirmRequest())
            
            return API.get(`/users/${userID}/reset/${token}`).then(
                bool => dispatch(actionCreators.confirmRequestSuccess(bool)),
                error => dispatch(actionCreators.confirmRequestError(error.error))
            )
        }
    }
}
