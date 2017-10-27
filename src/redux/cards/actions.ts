import { Dispatch } from '../RootReducer'
import { API } from '../../services/http'

import { ICard } from '../cards/types'
/* import { ITag } from '../tags/types'
import { IAttachment } from '../attachments/types'
import { IComment } from '../comments/types'
import { ITasksList } from '../taskLists/types'
import { IUser } from '../users/types' */

export const CARD_SUCCESS = 'CARD_SUCCESS'
export const CARD_ERROR = 'CARD_ERROR'

export const FETCH_CARD = 'FETCH_CARD'
export const FETCH_CARD_SUCCESS = 'FETCH_CARD_SUCCESS'

export const CREATE_CARD = 'CREATE_CARD'
export const CREATE_CARD_SUCCESS = 'CREATE_CARD_SUCCESS'

export const REMOVE_CARD = 'REMOVE_CARD'

export const UPDATE_CARD = 'UPDATE_CARD'


export type Actions = {

    CARD_ERROR: {
        type: typeof CARD_ERROR,
        error: string,
    },
    CARD_SUCCESS: {
        type: typeof CARD_SUCCESS,
        successMessage: string,
    },

    FETCH_CARD: {
        type: typeof FETCH_CARD,
        id: string
    },
    FETCH_CARD_SUCCESS: {
        type: typeof FETCH_CARD_SUCCESS,
        card: ICard,
    },

    CREATE_CARD: {
        type: typeof CREATE_CARD,
        card: ICard,
        /* name: string,
        desc: string, 
        due: string,
        dueComplete: string,
        pos: number,
        tags: ITag[],
        members: IUser[],
        tasksList: ITasksList[],
        comments: IComment[],
        attachments: IAttachment[],*/
    },
    CREATE_CARD_SUCCESS: {
        type: typeof CREATE_CARD_SUCCESS,
        card: ICard,
    },

    REMOVE_CARD: {
        type: typeof REMOVE_CARD,
    },

    UPDATE_CARD: {
        type: typeof UPDATE_CARD,
        card: ICard,
    }
}

export const actionCreators = {
    // --------------------------------------- //
    //                    SYNC                 //
    // --------------------------------------- //

    cardError: (error: string): Actions[typeof CARD_ERROR] => ({
        type: CARD_ERROR,
        error,
    }),
    cardSuccess: (successMessage: string): Actions[typeof CARD_SUCCESS] => ({
        type: CARD_SUCCESS,
        successMessage,
    }),

    fetchCardRequest: (id: string): Actions[typeof FETCH_CARD] => ({
        type: FETCH_CARD,
        id,
    }),
    fetchCardSuccess: (card: ICard):
    Actions[typeof FETCH_CARD_SUCCESS] => ({
        type: FETCH_CARD_SUCCESS,
        card,
    }),
    createCardRequest: (card: ICard) :
    Actions[typeof CREATE_CARD] => ({
        type: CREATE_CARD,
        card
    }),
    /* createCardRequest: (   name: string,
                            desc: string, 
                            due: string,
                            dueComplete: string,
                            pos: number,
                            tags: ITag[],
                            members: IUser[],
                            tasksList: ITasksList[],
                            comments: IComment[],
                            attachments: IAttachment[]) :
    Actions[typeof CREATE_CARD] => ({
            type: CREATE_CARD,
            name,
            desc,
            due,
            dueComplete,
            pos,
            tags,
            members,
            tasksList,
            comments,
            attachments,
    }),*/
    createCardSuccess: (card: ICard):
    Actions[typeof CREATE_CARD_SUCCESS] => ({
        type: CREATE_CARD_SUCCESS,
        card,
    }),
    removeCardRequest: (id: number): Actions[typeof REMOVE_CARD] => ({
        type: REMOVE_CARD,
    }),

    updateCardRequest: (card: ICard): Actions[typeof UPDATE_CARD] => ({
        type: UPDATE_CARD,
        card,
    }),

    // --------------------------------------- //
    //                   ASYNC                 //
    // --------------------------------------- //
    createBackendCard: (card: ICard) => {
        return (dispatch: Dispatch) => {
            // dispatch(actionCreators.createCardRequest(card.name, "", "", "", card.list.cards.length + 1, [], [], [], [], []))
            dispatch(actionCreators.createCardRequest(card))
            return API.post(`/lists/${card.list.id}/cards`, card).then(
                response => dispatch(actionCreators.createCardSuccess(response.card)),
                error => dispatch(actionCreators.cardError(error.message)),
            )
        }
    },

    removeBackendCard: (id: number) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.removeCardRequest(id))
            return API.delete('/cards/', id).then(
                response => dispatch(actionCreators.cardSuccess(response.message)),
                error => dispatch(actionCreators.cardError(error.message)),
            )
        }
    },

    updateBackendCard: (card: ICard) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.updateCardRequest(card))
            return API.put(`/cards/${card.id}`, card).then(
                response => dispatch(actionCreators.createCardSuccess(response.card)),
                error => dispatch(actionCreators.cardError(error.message)),
            )
        }
    },

    fetchCard: (cardId: string) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchCardRequest(cardId))
            return API.get(`/cards/${cardId}`).then(
                response => dispatch(actionCreators.fetchCardSuccess(response)),
                error => dispatch(actionCreators.cardError(error.message)),
            )
        }
    }
}
