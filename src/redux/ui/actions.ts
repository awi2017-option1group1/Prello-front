export const SHOW_ALERT_MESSAGE = 'SHOW_ALERT_MESSAGE'
export const HIDE_ALERT_MESSAGE = 'HIDE_ALERT_MESSAGE'

export type Actions = {
    SHOW_ALERT_MESSAGE: {
        type: typeof SHOW_ALERT_MESSAGE,
        payload: {
            msg: string,
            type: string
        }
    },
    HIDE_ALERT_MESSAGE: {
        type: typeof HIDE_ALERT_MESSAGE
    }
}

export const actionCreators = {    
    showAlertMessage: (msg: string, type: string): Actions[typeof SHOW_ALERT_MESSAGE] => ({
        type: SHOW_ALERT_MESSAGE,
        payload: {
            msg,
            type
        }
    }),
    hideAlertMessage: (): Actions[typeof HIDE_ALERT_MESSAGE] => ({
        type: HIDE_ALERT_MESSAGE
    }),

    showSaveMessage: (): Actions[typeof SHOW_ALERT_MESSAGE] => 
        actionCreators.showAlertMessage('Content saved!', 'success'),
    showCanNotSaveMessage: (): Actions[typeof SHOW_ALERT_MESSAGE] => 
        actionCreators.showAlertMessage('Error while saving. The page you see may be outdated. Please reload!', 'error')
}
