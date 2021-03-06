import { RootAction } from '../RootAction'
import { ICard } from '../cards/types'

import { OPEN_CARD, CLOSE_CARD } from './actions/select'
import { UPDATE_CARD } from './actions/update'

export type State = ICard | null

const defaultValue: State = null

export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {
        case OPEN_CARD:
            return action.card

        case UPDATE_CARD:
            if (state && action.card.id === state.id) {
                return action.card
            } else {
                return state
            }

        case CLOSE_CARD:
            return null

        case UPDATE_CARD:
            return action.card

        default:
            return state
    }
}
