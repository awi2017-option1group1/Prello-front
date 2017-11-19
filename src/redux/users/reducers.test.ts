import { TEST } from '../testActions'
import { reducer } from './reducers'

import {    
    FETCH_USER, 
    FETCH_USER_ERROR, 
    FETCH_USER_SUCCESS 
} from './actions/fetch'
import { UPDATE_USER, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS } from './actions/update'

describe('User reducer', () => {

    const userTest = {
        id: 1,
        username: 'test',
        notificationsEnabled: true,
        email: 'test@test.fr',
        password: 'test',
    }

    const userDefault = {
        id: -1,
        username: '',
        email: '',
        password: '',
        notificationsEnabled: false,
    }

    const newUser = {
        id: 1,
        username: 'test2',
        notificationsEnabled: true,
        email: 'test@test.fr',
        password: 'test',
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: TEST })).toEqual({
            error: null,
            isProcessing: false,
            user: userDefault
        })
    })

    it('should handle FETCH_USER', () => {
        expect(reducer(undefined, { type: FETCH_USER })).toEqual({
            error: null,
            isProcessing: true,
            user: userDefault
        })
    })

    it('should handle FETCH_USER_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_USER_SUCCESS,
                    user: newUser
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            user: newUser,
        })

        expect(
            reducer(
                {
                    error: 'ID requested',
                    isProcessing: true,
                    user: userTest,
                    },
                {
                    type: FETCH_USER_SUCCESS,
                    user: newUser
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            user: newUser
        })
    })

    it('should handle FETCH_USER_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_USER_ERROR,
                    error: 'not found',
                }
            )
        ).toEqual({
            error: 'not found',
            isProcessing: false,
            user: userDefault
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: true,
                    user: userDefault
                },
                {
                    type: FETCH_USER_ERROR,
                    error: 'not found',
                }
            )
        ).toEqual({
            error: 'not found',
            isProcessing: false,
            user: userDefault
        })
    })

    it('should handle UPDATE_USER', () => {
        expect(
            reducer(
                undefined,
                {
                    type: UPDATE_USER
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            user: userDefault
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: true,
                    user: userTest
                },
                {
                    type: UPDATE_USER
                }
            )
        ).toEqual({
            error: null,
            isProcessing: true,
            user: userTest
        })
    })

    it('should handle UPDATE_USER_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: UPDATE_USER_ERROR,
                    error: 'not found'
                }
            )
        ).toEqual({
            error: 'not found',
            isProcessing: false,
            user: userDefault
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: true,
                    user: userTest
                },
                {
                    type: UPDATE_USER_ERROR,
                    error: 'not found'
                }
            )
        ).toEqual({
            error: 'not found',
            isProcessing: true,
            user: userTest
        })
    })

    it('should handle UPDATE_USER_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: UPDATE_USER_SUCCESS,
                    user: newUser
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            user: newUser
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: false,
                    user: userTest
                },
                {
                    type: UPDATE_USER_SUCCESS,
                    user: newUser
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            user: newUser
        })
    })

}) 
