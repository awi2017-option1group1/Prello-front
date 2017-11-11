import { RootAction } from '../RootAction'

import { IAlert } from './types'
import { SHOW_ALERT_MESSAGE, HIDE_ALERT_MESSAGE } from './actions'

export type State = {
    alert: IAlert
}

const defaultValue: State = {
    alert: {
        show: false,
        msg: '',
        type: 'info'
    }
}

export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {
        case SHOW_ALERT_MESSAGE:
            return {
                ...state,
                alert: {
                    show: true,
                    msg: action.payload.msg,
                    type: action.payload.type,
                }
            }

        case HIDE_ALERT_MESSAGE:
            return {
                ...state,
                alert: defaultValue.alert,
            }

        default:
            return state
    }
}
