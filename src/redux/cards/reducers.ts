import { RootAction } from '../RootAction'
import { ICard } from '../cards/types'

import { OPEN_CARD, CLOSE_CARD } from './actions/select'

export type State = ICard | null

const defaultValue: State = null

export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {
        case OPEN_CARD:
            return action.card

        case CLOSE_CARD:
            return null

        default:
            return state
    }
}
