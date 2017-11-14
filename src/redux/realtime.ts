import store from './store'
import { WSClient, Payload } from '../services/websockets'

import { IList } from './lists/types'
import { actionCreators as listsActionCreators } from './lists/actions'

import { ICard } from './cards/types'
import { actionCreators as cardsActionCreators } from './cards/actions'
import { actionCreators as deleteCardsActionCreators } from './cards/actions/delete'

import { ITag } from './tags/types'
import { actionCreators as boardLabelsActionCreators } from './tags/boardTags/actions'
import { actionCreators as cardLabelsActionCreators } from './tags/cardsTags/actions'

const { dispatch, getState } = store

const isMyAction = <T>(action: Payload<T>) => {
    return getState().auth.user!.uid === action.requester.uid
}

const onlyIfNotMyAction = <T>(action: (payload: Payload<T>) => void) => (payload: Payload<T>) => {
    if (isMyAction(payload)) {
        return
    } else {
        action(payload)
    }
}

export const RealTimeBoard = (websocket: WSClient) => {
    // LIST

    websocket.on('create-list', onlyIfNotMyAction(
        (payload: Payload<IList>) => {
            dispatch(listsActionCreators.createBoardListRequestSuccess(payload))
        })
    )

    websocket.on('update-list', onlyIfNotMyAction(
        (payload: Payload<IList>) => {
            dispatch(listsActionCreators.updateBoardListRequest(payload))
        }) 
    )

    websocket.on('delete-list', onlyIfNotMyAction(
        (payload: Payload<IList>) => {
            dispatch(listsActionCreators.deleteBoardListRequest(payload))
        })
    )

    // CARD

    websocket.on('create-card', onlyIfNotMyAction(
        (payload: Payload<ICard & { list: IList }>) => {
            const cardList = payload.list.id
            const card = payload
            delete card.list
            dispatch(cardsActionCreators.createCardSuccess(cardList, card))
        })
    )

    websocket.on('update-card', onlyIfNotMyAction(
        (payload: Payload<ICard>) => {
            dispatch(cardsActionCreators.updateCardRequest(payload))
        })
    )

    websocket.on('delete-card', onlyIfNotMyAction(
        (payload: Payload<ICard>) => {
            dispatch(deleteCardsActionCreators.deleteCardRequest(payload))
        })
    )

    websocket.on('assign-label', onlyIfNotMyAction(
        (payload: Payload<{ card: ICard, tag: ITag }>) => {
            dispatch(cardLabelsActionCreators.assignLabelRequest(payload.card.id, payload.tag))
        })
    )

    websocket.on('unassign-label', onlyIfNotMyAction(
        (payload: Payload<{ card: ICard, tag: ITag }>) => {
            dispatch(cardLabelsActionCreators.unassignLabelRequest(payload.card.id, payload.tag))
        })
    )

    // LABEL

    websocket.on('create-label', onlyIfNotMyAction(
        (payload: Payload<ITag>) => {
            dispatch(boardLabelsActionCreators.createLabelSuccess(payload))
        })
    )

    websocket.on('update-label', onlyIfNotMyAction(
        (payload: Payload<ITag>) => {
            dispatch(boardLabelsActionCreators.updateLabelRequest(payload))
        })
    )

    websocket.on('delete-label', onlyIfNotMyAction(
        (payload: Payload<ITag>) => {
            dispatch(boardLabelsActionCreators.deleteLabelRequest(payload))
        })
    )
}

export const RealTimeRedux = (websocket: WSClient) => {
    RealTimeBoard(websocket)
}   
