import { LOGIN } from '../actions'
import { RootAction } from '../../RootAction'

export type State = {
}

export const reducer = (state: State, action: RootAction) => {
    switch (action.type) {
        case LOGIN:
            // TODO : Link with API
            return state

        default:
            return state
    }
}
