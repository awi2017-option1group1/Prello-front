import { IList } from '../../lists/types'

export const OPEN_CREATE_CARD_MODEL = 'OPEN_CREATE_CARD_MODEL'
export const CLOSE_CREATE_CARD_MODAL = 'CLOSE_CREATE_CARD_MODAL'

export type Actions = {
    OPEN_CREATE_CARD_MODEL: {
        type: typeof OPEN_CREATE_CARD_MODEL,
        list: IList
    },
    CLOSE_CREATE_CARD_MODAL: {
        type: typeof CLOSE_CREATE_CARD_MODAL
    }
}

export const actionCreators = {
    openCreateCardModal: (list: IList): Actions[typeof OPEN_CREATE_CARD_MODEL] => ({
        type: OPEN_CREATE_CARD_MODEL,
        list
    }),
    closeCreateCardModal: (): Actions[typeof CLOSE_CREATE_CARD_MODAL] => ({
        type: CLOSE_CREATE_CARD_MODAL
    })
}
