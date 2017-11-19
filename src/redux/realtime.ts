import store from './store'
import { WSClient, Payload } from '../services/websockets'

import { IList } from './lists/types'
import { actionCreators as listsActionCreators } from './lists/actions'

import { ICard } from './cards/types'
import { actionCreators as cardsActionCreators } from './cards/actions'
import { actionCreators as deleteCardsActionCreators } from './cards/actions/delete'
import { actionCreators as assignedCardsActionCreators } from './cards/AssignedUsers/actions'

import { ITag } from './tags/types'
import { actionCreators as boardLabelsActionCreators } from './tags/boardTags/actions'
import { actionCreators as cardLabelsActionCreators } from './tags/cardsTags/actions'

import { IComment } from './comments/types'
import { actionCreators as commentsActionCreators } from './comments/actions'

import { ICheckList } from './checkLists/types'
import { actionCreators as checkListsActionCreators } from './checkLists/actions'

import { ICheckItem } from './checkItems/types'
import { actionCreators as checkItemsActionCreators } from './checkItems/actions'

import { IUser } from './users/types'
import { actionCreators as notificationsActionCreators } from './notifications/actions'

const { dispatch, getState } = store

export const RealTimeBoard = (websocket: WSClient) => {
    // LIST

    websocket.on('create-list', (payload: Payload<{ list: IList }>) => {
        dispatch(listsActionCreators.createBoardListRequestSuccess(payload.list))
    })
    
    websocket.on('update-list', (payload: Payload<{ list: IList }>) => {
        dispatch(listsActionCreators.updateBoardListRequest(payload.list))
    }) 
    
    websocket.on('delete-list', (payload: Payload<{ list: IList }>) => {
        dispatch(listsActionCreators.deleteBoardListRequest(payload.list))
    })

    // CARD

    websocket.on('create-card', (payload: Payload<{ card: ICard, list: IList }>) => {
        dispatch(cardsActionCreators.createCardSuccess(payload.list.id, payload.card))
    })

    websocket.on('update-card', (payload: Payload<{ card: ICard, list: IList }>) => {
        if (getState().cards[payload.list.id].cards.findIndex(c => c.id === payload.card.id) === -1) {
            // This is a trick to handle the card movements
            dispatch(deleteCardsActionCreators.deleteCardRequest(payload.card))
            dispatch(cardsActionCreators.createCardSuccess(payload.list.id, payload.card))
            dispatch(cardsActionCreators.updateCardRequest(payload.card))
        } else {
            dispatch(cardsActionCreators.updateCardRequest(payload.card))
        }
    })

    websocket.on('delete-card', (payload: Payload<{ card: ICard }>) => {
        dispatch(deleteCardsActionCreators.deleteCardRequest(payload.card))
        if (getState().card && getState().card!.id === payload.card.id) {
            dispatch(cardsActionCreators.closeCard())
        }
    })

    websocket.on('assign-label', (payload: Payload<{ card: ICard, tag: ITag }>) => {
        dispatch(cardLabelsActionCreators.assignLabelRequest(payload.card.id, payload.tag))
    })

    websocket.on('unassign-label', (payload: Payload<{ card: ICard, tag: ITag }>) => {
        dispatch(cardLabelsActionCreators.unassignLabelRequest(payload.card.id, payload.tag))
    })

    // LABEL

    websocket.on('create-label', (payload: Payload<{ tag: ITag }>) => {
        dispatch(boardLabelsActionCreators.createLabelSuccess(payload.tag))
    })

    websocket.on('update-label', (payload: Payload<{ tag: ITag }>) => {
        dispatch(boardLabelsActionCreators.updateLabelRequest(payload.tag))
    })

    websocket.on('delete-label', (payload: Payload<{ tag: ITag }>) => {
        dispatch(boardLabelsActionCreators.deleteLabelRequest(payload.tag))
    })

    // COMMENT

    websocket.on('create-comment', (payload: Payload<{ comment: IComment }>) => {
        dispatch(commentsActionCreators.createCommentRequestSuccess(payload.comment))
    })

    websocket.on('update-comment', (payload: Payload<{ comment: IComment }>) => {
        dispatch(commentsActionCreators.updateCommentRequest(payload.comment))
    })

    websocket.on('delete-comment', (payload: Payload<{ comment: IComment }>) => {
        dispatch(commentsActionCreators.deleteCommentRequest(payload.comment))
    })

    // CHECKLIST

    websocket.on('create-checkList', (payload: Payload<{ checkList: ICheckList }>) => {
        dispatch(checkListsActionCreators.createCheckListSuccess(payload.checkList))
    })

    websocket.on('update-checkList', (payload: Payload<{ checkList: ICheckList }>) => {
        dispatch(checkListsActionCreators.updateCheckListRequest(payload.checkList))
    })

    websocket.on('delete-checkList', (payload: Payload<{ checkList: ICheckList }>) => {
        dispatch(checkListsActionCreators.removeCheckListRequest(payload.checkList))
    })

    // CHECK ITEM

    websocket.on('create-checkItem', (payload: Payload<{ checkList: ICheckList, checkItem: ICheckItem }>) => {
        dispatch(checkItemsActionCreators.createCheckItemSuccess(payload.checkList.id, payload.checkItem))
    })

    websocket.on('update-checkItem', (payload: Payload<{ checkList: ICheckList, checkItem: ICheckItem }>) => {
        dispatch(checkItemsActionCreators.updateCheckItemRequest(payload.checkList.id, payload.checkItem))
    })

    websocket.on('delete-checkItem', (payload: Payload<{ checkList: ICheckList, checkItem: ICheckItem }>) => {
        dispatch(checkItemsActionCreators.removeCheckItemRequest(payload.checkList.id, payload.checkItem))
    })

    // MEMBERS

    websocket.on('assign-card-member', (payload: Payload<{ card: ICard, member: IUser }>) => {
        dispatch(assignedCardsActionCreators.assignUserRequest(payload.card.id, payload.member))
    })

    websocket.on('unassign-card-member', (payload: Payload<{ card: ICard, member: IUser }>) => {
        dispatch(assignedCardsActionCreators.unassignUserRequest(payload.card.id, payload.member))
    })
}

export const RealTimeNotification = (websocket: WSClient) => {
    websocket.on('add-notification', (payload: Payload<{}>) => {
        dispatch(notificationsActionCreators.fetchNotifications())
    })

    websocket.on('delete-notifications', (payload: Payload<{}>) => {
        dispatch(notificationsActionCreators.deleteNotificationsRequestSuccess())
    })
}

export const RealTimeRedux = (websocket: WSClient) => {
    RealTimeBoard(websocket)
}   
