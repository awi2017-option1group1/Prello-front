import { Dispatch, RootState } from '../../RootReducer'
import { API } from '../../../services/http'

import { reorder } from '../../../services/collection'

import { actionCreators as uiActionCreators } from '../../ui/actions'

import { ICard } from '../types'

export const MOVE_CARD = 'MOVE_CARD'
export const MOVE_CARD_SUCCESS = 'MOVE_CARD_SUCCESS'
export const MOVE_CARD_ERROR = 'MOVE_CARD_ERROR'

export type CardList = {
    listId: number
    list: ICard[]
}

export type Actions = {
    MOVE_CARD: {
        type: typeof MOVE_CARD,
        sourceList: CardList
        destinationList: CardList
    },
    MOVE_CARD_ERROR: {
        type: typeof MOVE_CARD_ERROR,
        error: string
    },
    MOVE_CARD_SUCCESS: {
        type: typeof MOVE_CARD_SUCCESS,
        destinationList: CardList
    }
}

export const actionCreators = {
    moveCardRequest: (sourceList: CardList, destinationList: CardList): Actions[typeof MOVE_CARD] => ({
        type: MOVE_CARD,
        sourceList,
        destinationList
    }),
    moveCardRequestError: (error: string): Actions[typeof MOVE_CARD_ERROR] => ({
        type: MOVE_CARD_ERROR,
        error
    }),
    moveCardRequestSuccess: (destinationList: CardList): Actions[typeof MOVE_CARD_SUCCESS] => ({
        type: MOVE_CARD_SUCCESS,
        destinationList
    }),
    moveCard: (
        cardId: number, 
        sourceList: number, 
        sourcePos: number, 
        destinationList: number,
        destinationPos: number
    ) => {
        return (dispatch: Dispatch, getState: () => RootState) => {
            const newSourceList = getState().cards[sourceList].cards.filter(card => card.id !== cardId)
            const cardToMove = getState().cards[sourceList].cards.find(card => card.id === cardId)
            // If we move the card in the same list just reorder, else insert the element in the new list
            let newDestinationList = []
            if (sourceList === destinationList) {
                newDestinationList = reorder(getState().cards[destinationList].cards, sourcePos, destinationPos)
            } else {
                newDestinationList = [
                    ...getState().cards[destinationList].cards.slice(0, destinationPos), 
                    cardToMove!, 
                    ...getState().cards[destinationList].cards.slice(destinationPos)
                ]  
            }
            
            dispatch(actionCreators.moveCardRequest(
                {
                    listId: sourceList,
                    list: newSourceList
                },
                {
                    listId: destinationList,
                    list: newDestinationList
                }
            ))

            // Updated only the elements that have changed
            Promise.all(
                newDestinationList.map((card, index) => {
                    return API.put(`/cards/${card.id}`, { pos: index, listId: destinationList })
                })
            ).then(
                updatedLists => {
                    dispatch(actionCreators.moveCardRequestSuccess({
                        listId: destinationList,
                        list: updatedLists
                    }))
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.moveCardRequestError(error))
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                }
            )
        }
    }
}
