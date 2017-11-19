import { Dispatch, RootState } from '../../RootReducer'
import { wsClient } from '../../../services/websockets'

import { ICard } from '../types'

export const OPEN_CARD = 'OPEN_CARD'
export const CLOSE_CARD = 'CLOSE_CARD'

export type Actions = {
    OPEN_CARD: {   
        type: typeof OPEN_CARD,
        card: ICard
    },
    CLOSE_CARD: {   
        type: typeof CLOSE_CARD
    }
}

export const actionCreators = {
    closeCard: () => {
        return (dispatch: Dispatch, getState: () => RootState) => {
            wsClient.emit('remove-connection', { object: 'card', id: getState().card!.id })
            dispatch({
                type: CLOSE_CARD
            })
        }
    },
    openCard: (card: ICard): Actions[typeof OPEN_CARD] => {
        wsClient.emit('request-connection', { object: 'card', id: card.id })
        return {
            type: OPEN_CARD,
            card
        }
    }
}
