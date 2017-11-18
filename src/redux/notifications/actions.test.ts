import thunk from 'redux-thunk'
import * as nock from 'nock'

import configureMockStore from 'redux-mock-store'
import { getBaseUrl } from '../../services/http'

import { FETCH_NOTIFICATIONS, FETCH_NOTIFICATIONS_ERROR, FETCH_NOTIFICATIONS_SUCCESS } from './actions/fetchAll'
import {    DELETE_NOTIFICATIONS, 
            DELETE_NOTIFICATIONS_ERROR, 
            DELETE_NOTIFICATIONS_SUCCESS } from './actions/delete'

import { actionCreators } from './actions'

import { INotification } from './types'

const notifModel: INotification = {
    id: 1,
    about: 1,
    from: 2,
    type: 'update',
    userId: 1
}

describe('Notifications sync actions', () => {

    /*---------------- FETCH NOTIFS ----------------*/
    it('should create an action FFETCH_BOARD', () => {
        const expectedAction = {
            type: FETCH_NOTIFICATIONS,
        }
        expect(actionCreators.fetchNotificationsRequest()).toEqual(expectedAction)
    })

    it('should create an action FETCH_NOTIFICATIONS_ERROR', () => {
        const expectedAction = {
            type: FETCH_NOTIFICATIONS_ERROR,
            error: 'error message'
        }
        expect(actionCreators.fetchNotificationsRequestError('error message')).toEqual(expectedAction)
    })

    it('should create an action FETCH_NOTIFICATIONS_SUCCESS', () => {
        const expectedAction = {
            type: FETCH_NOTIFICATIONS_SUCCESS,
            notifications: [notifModel]
        }
        expect(actionCreators.fetchNotificationsRequestSuccess([notifModel])).toEqual(expectedAction)
    })

    /*---------------- DELETE NOTIF ----------------*/
    it('should create an action DELETE_NOTIFICATIONS', () => {
        const expectedAction = {
            type: DELETE_NOTIFICATIONS,
        }
        expect(actionCreators.deleteNotificationsRequest()).toEqual(expectedAction)
    })

    it('should create an action DELETE_NOTIFICATIONS_ERROR', () => {
        const expectedAction = {
            type: DELETE_NOTIFICATIONS_ERROR,
            error: 'error message'
        }
        expect(actionCreators.deleteNotificationsRequestError('error message')).toEqual(expectedAction)
    })

    it('should create an action DELETE_NOTIFICATIONS_SUCCESS', () => {
        const expectedAction = {
            type: DELETE_NOTIFICATIONS_SUCCESS
        }
        expect(actionCreators.deleteNotificationsRequestSuccess()).toEqual(expectedAction)
    })
})

const mockStore = configureMockStore([thunk])
describe('Notifications async actions', () => {
    afterEach(() => {
        nock.cleanAll()
    })
    
    it('should create FETCH_NOTIFICATIONS_SUCCESS', () => {
        nock(getBaseUrl())
        .get('/users/1/notifications')
        .reply(200, [notifModel])

        const expectedActions = [
            { type: FETCH_NOTIFICATIONS },
            { type: FETCH_NOTIFICATIONS_SUCCESS,
                notifications: [notifModel]
            }
        ]
        const store = mockStore({auth: {user: {uid: 1}}})

        return store.dispatch(actionCreators.fetchNotifications()).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })
    
    it('should create FETCH_NOTIFICATIONS_ERROR', () => {
        nock(getBaseUrl())
        .get('/users/1/notifications')
        .reply(404, {error: 'not found'})

        const expectedActions = [
            { type: FETCH_NOTIFICATIONS },
            { type: FETCH_NOTIFICATIONS_ERROR,
                error: 'not found'
            }
        ]

        const store = mockStore({auth: {user: {uid: 1}}})

        return store.dispatch(actionCreators.fetchNotifications()).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })

    it('should create FETCH_NOTIFICATIONS_SUCCESS', () => {
        nock(getBaseUrl())
        .delete('/users/1/notifications')
        .reply(200)

        const expectedActions = [
            { type: DELETE_NOTIFICATIONS },
            { type: DELETE_NOTIFICATIONS_SUCCESS
            }
        ]
        const store = mockStore({auth: {user: {uid: 1}}})

        return store.dispatch(actionCreators.deleteAllFromUser()).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })
    
    it('should create DELETE_NOTIFICATIONS_ERROR', () => {
        nock(getBaseUrl())
        .delete('/users/1/notifications')
        .reply(404, {error: 'not found'})

        const expectedActions = [
            { type: DELETE_NOTIFICATIONS },
            { type: DELETE_NOTIFICATIONS_ERROR,
                error: 'not found'
            }
        ]

        const store = mockStore({auth: {user: {uid: 1}}})

        return store.dispatch(actionCreators.deleteAllFromUser()).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })
})
