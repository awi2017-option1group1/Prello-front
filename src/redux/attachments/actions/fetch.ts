import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { IAttachment } from '../types'

export const ATTACHMENT_SUCCESS = 'ATTACHMENT_SUCCESS'
export const ATTACHMENT_ERROR = 'ATTACHMENT_ERROR'

export const FETCH_ATTACHMENT = 'FETCH_ATTACHMENT'
export const FETCH_ATTACHMENT_SUCCESS = 'FETCH_ATTACHMENT_SUCCESS'

export type Actions = {
    ATTACHMENT_ERROR: {    
        type: typeof ATTACHMENT_ERROR,
        error: string,
    },
    ATTACHMENT_SUCCESS: {
        type: typeof ATTACHMENT_SUCCESS,
        successMessage: string,
    },
    FETCH_ATTACHMENT: {  
        type: typeof FETCH_ATTACHMENT,
    },
    FETCH_ATTACHMENT_SUCCESS: {    
        type: typeof FETCH_ATTACHMENT_SUCCESS,
        attachment: IAttachment,
    }
}

export const actionCreators = {
    // --------------------------------------- //
    //                    SYNC                 //
    // --------------------------------------- //
    attachmentError: (error: string): Actions[typeof ATTACHMENT_ERROR] => ({      
        type: ATTACHMENT_ERROR,
        error,
    }),
    attachmentSuccess: (successMessage: string): Actions[typeof ATTACHMENT_SUCCESS] => ({
        type: ATTACHMENT_SUCCESS,
        successMessage,
    }),

    fetchAttachmentRequest: (): Actions[typeof FETCH_ATTACHMENT] => ({     
        type: FETCH_ATTACHMENT,
    }),
    fetchAttachmentSuccess: (attachment: IAttachment):       
    Actions[typeof FETCH_ATTACHMENT_SUCCESS] => ({
        type: FETCH_ATTACHMENT_SUCCESS,
        attachment,
    }),

    // --------------------------------------- //
    //                   ASYNC                 //
    // --------------------------------------- //
    fetchAttachment: (attachment: IAttachment) => {     
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchAttachmentRequest())
            return API.get(`/cards/${attachment.cardId}`).then(
                response => dispatch(actionCreators.fetchAttachmentSuccess(response.attachment)),
                error => dispatch(actionCreators.attachmentError(error.message)),
            )
        }
    }
}
