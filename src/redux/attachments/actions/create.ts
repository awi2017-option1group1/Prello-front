import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { IAttachment } from '../types'

export const CREATE_ATTACHMENT = 'CREATE_ATTACHMENT'
export const CREATE_ATTACHMENT_SUCCESS = 'CREATE_ATTACHMENT_SUCCESS'
export const CREATE_ATTACHMENT_ERROR = 'CREATE_ATTACHMENT_ERROR'

export type Actions = {
    CREATE_ATTACHMENT: {   
        type: typeof CREATE_ATTACHMENT,
    },
    CREATE_ATTACHMENT_SUCCESS: {   
        type: typeof CREATE_ATTACHMENT_SUCCESS,
        attachment: IAttachment,
    },
    CREATE_ATTACHMENT_ERROR: {     
        type: typeof CREATE_ATTACHMENT_ERROR,
        error: string
    }
}

export const actionCreators = {
    // --------------------------------------- //
    //                    SYNC                 //
    // --------------------------------------- //
    createAttachmentRequest: ():  
    Actions[typeof CREATE_ATTACHMENT] => ({
        type: CREATE_ATTACHMENT,
    }),
    createAttachmentSuccess: (attachment: IAttachment):    
    Actions[typeof CREATE_ATTACHMENT_SUCCESS] => ({
        type: CREATE_ATTACHMENT_SUCCESS,
        attachment,
    }),
    createAttachmentError: (error: string):    
    Actions[typeof CREATE_ATTACHMENT_ERROR] => ({
        type: CREATE_ATTACHMENT_ERROR,
        error,
    }),

    // --------------------------------------- //
    //                   ASYNC                 //
    // --------------------------------------- //
    createBackendAttachments: (attachment: IAttachment) => {    
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.createAttachmentRequest())
            return API.post(`/cards/${attachment.card.id}/attachments`, attachment).then(
                response => dispatch(actionCreators.createAttachmentSuccess(response.attachment)),
                error => dispatch(actionCreators.createAttachmentError(error.message)),
            )
        }
    }
}
