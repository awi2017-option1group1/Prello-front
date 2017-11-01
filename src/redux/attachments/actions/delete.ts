import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { IAttachment } from '../types'

export const REMOVE_ATTACHMENT = 'REMOVE_ATTACHMENT'
export const REMOVE_ATTACHMENT_ERROR = 'REMOVE_ATTACHMENT_ERROR'
export const REMOVE_ATTACHMENT_SUCCESS = 'REMOVE_ATTACHMENT_SUCCESS'

export type Actions = {
    REMOVE_ATTACHMENT: {   
        type: typeof REMOVE_ATTACHMENT,
    },
    REMOVE_ATTACHMENT_ERROR: {     
        type: typeof REMOVE_ATTACHMENT_ERROR,
        error: string
    },
    REMOVE_ATTACHMENT_SUCCESS: {   
        type: typeof REMOVE_ATTACHMENT_SUCCESS,
        attachment: IAttachment
    },
}

export const actionCreators = {
    // --------------------------------------- //
    //                    SYNC                 //
    // --------------------------------------- //
    removeAttachmentRequest: (): Actions[typeof REMOVE_ATTACHMENT] => ({
        type: REMOVE_ATTACHMENT,
    }),
    removeAttachmentRequestError: (error: string): Actions[typeof REMOVE_ATTACHMENT_ERROR] => ({
        type: REMOVE_ATTACHMENT_ERROR,
        error
    }),
    removeAttachmentRequestSucess: (attachment: IAttachment): Actions[typeof REMOVE_ATTACHMENT_SUCCESS] => ({
        type: REMOVE_ATTACHMENT_SUCCESS,
        attachment
    }),

    // --------------------------------------- //
    //                   ASYNC                 //
    // --------------------------------------- //
    removeBackendAttachment: (attachment: IAttachment) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.removeAttachmentRequest())
            return API.delete('/attachment/', attachment.id).then(
                response => dispatch(actionCreators.removeAttachmentRequestSucess(response.attachment)),
                error => dispatch(actionCreators.removeAttachmentRequestError(error.message)),
            )
        }
    }
}
