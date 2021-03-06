import { Dispatch, RootState } from '../../RootReducer'
import { API } from '../../../services/http'

import { actionCreators as uiActionCreators } from '../../ui/actions'

import { ICard } from '../types'

export const CREATE_CARD = 'CREATE_CARD'
export const CREATE_CARD_SUCCESS = 'CREATE_CARD_SUCCESS'
export const CREATE_CARD_ERROR = 'CREATE_CARD_ERROR'

export type Actions = {
    CREATE_CARD: {   
        type: typeof CREATE_CARD,
        card: Partial<ICard>,
        listId: number
    },
    CREATE_CARD_SUCCESS: {   
        type: typeof CREATE_CARD_SUCCESS,
        card: ICard,
        listId: number
    },
    CREATE_CARD_ERROR: {     
        type: typeof CREATE_CARD_ERROR,
        error: string
    }
}

export const actionCreators = {
    createCardRequest: (listId: number, card: Partial<ICard>): Actions[typeof CREATE_CARD] => ({
        type: CREATE_CARD,
        card,
        listId
    }),
    createCardSuccess: (listId: number, card: ICard): Actions[typeof CREATE_CARD_SUCCESS] => ({
        type: CREATE_CARD_SUCCESS,
        card,
        listId
    }),
    createCardError: (error: string): Actions[typeof CREATE_CARD_ERROR] => ({
        type: CREATE_CARD_ERROR,
        error
    }),
    createCard: (values: Partial<ICard>) => {    
        return (dispatch: Dispatch, getState: () => RootState) => {
            const listId = getState().board.listToAppendCard!.id
            dispatch(actionCreators.createCardRequest(listId, values))
            return API.post(`/lists/${listId}/cards`, values).then(
                card => {
                    dispatch(actionCreators.createCardSuccess(listId, card))
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.createCardError(error.message))
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                },
            )
        }
    }
}
