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
    closeCard: (): Actions[typeof CLOSE_CARD] => ({
        type: CLOSE_CARD,
    }),
    openCard: (card: ICard): Actions[typeof OPEN_CARD] => ({
        type: OPEN_CARD,
        card
    })
}
