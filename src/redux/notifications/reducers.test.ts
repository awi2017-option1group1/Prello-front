import { TEST } from '../testActions'
import { reducer } from './reducers'

import { FETCH_NOTIFICATIONS, FETCH_NOTIFICATIONS_ERROR, FETCH_NOTIFICATIONS_SUCCESS } from './actions/fetchAll'
import {    DELETE_NOTIFICATIONS,
            DELETE_NOTIFICATIONS_ERROR,
            DELETE_NOTIFICATIONS_SUCCESS } from './actions/delete'

import { INotification } from './types'

const notifModel: INotification = {
    id: 1,
    about: 1,
    from: 2,
    type: 'update',
    userId: 1
}

const newNotif: INotification = {
    id: 2,
    about: 2,
    from: 1,
    type: 'new',
    userId: 2
}

const defaultValue = {
    error: null,
    isProcessing: false,
    notifications: []
}

describe('Register reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: TEST })).toEqual(defaultValue)
    })

    it('should handle FETCH_NOTIFICATIONS', () => {
        expect(reducer(undefined, { type: FETCH_NOTIFICATIONS })).toEqual({
            error: null,
            isProcessing: true,
            notifications: []
        })
    })

    it('should handle FETCH_NOTIFICATIONS_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_NOTIFICATIONS_SUCCESS,
                    notifications: [newNotif]
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            notifications: [newNotif]
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: true,
                    notifications: []
                },
                {
                    type: FETCH_NOTIFICATIONS_SUCCESS,
                    notifications: [newNotif]
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            notifications: [newNotif]
        })
    })

    it('should handle FETCH_NOTIFICATIONS_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_NOTIFICATIONS_ERROR,
                    error: 'not found',
                }
            )
        ).toEqual({
            error: 'not found',
            isProcessing: false,
            notifications: []
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: true,
                    notifications: []
                },
                {
                    type: FETCH_NOTIFICATIONS_ERROR,
                    error: 'not found',
                }
            )
        ).toEqual({
            error: 'not found',
            isProcessing: false,
            notifications: [],
        })
    })

    it('should handle DELETE_NOTIFICATIONS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: DELETE_NOTIFICATIONS
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            notifications: []
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: false,
                    notifications: [notifModel]
                },
                {
                    type: DELETE_NOTIFICATIONS
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            notifications: [notifModel]
        })
    })

    it('should handle DELETE_NOTIFICATIONS_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: DELETE_NOTIFICATIONS_ERROR,
                    error: 'not found'
                }
            )
        ).toEqual({
            error: 'not found',
            isProcessing: false,
            notifications: []
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: false,
                    notifications: [notifModel]
                },
                {
                    type: DELETE_NOTIFICATIONS_ERROR,
                    error: 'not found'
                }
            )
        ).toEqual({
            error: 'not found',
            isProcessing: false,
            notifications: [notifModel]
        })
    })

    it('should handle DELETE_NOTIFICATIONS_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: DELETE_NOTIFICATIONS_SUCCESS
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            notifications: []
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: false,
                    notifications: [notifModel]
                },
                {
                    type: DELETE_NOTIFICATIONS_SUCCESS
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            notifications: []
        })
    })
})
