import { TEST } from '../testActions'
import { LOGIN_REQUEST, LOGIN_RESPONSE_SUCCESS, LOGIN_RESPONSE_ERROR } from './actions'
import { reducer } from './reducers'

describe('Login reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: TEST })).toEqual({
            token: null,
            error: null,
            isProcessing: false,
            isAuthenticated: false
        })
    })

    it('should handle LOGIN_REQUEST', () => {
        expect(reducer(undefined, { type: LOGIN_REQUEST })).toEqual({
            token: null,
            error: null,
            isProcessing: true,
            isAuthenticated: false
        })
    })

    it('should handle LOGIN_RESPONSE_SUCCESS', () => {
        expect(
            reducer(
                undefined, 
                { 
                    type: LOGIN_RESPONSE_SUCCESS, 
                    token: '...' 
                }
            )
        ).toEqual({
            token: '...',
            isAuthenticated: true,
            error: null,
            isProcessing: false
        })

        expect(
            reducer(
                {
                    token: null,
                    isAuthenticated: false,
                    error: null,
                    isProcessing: true
                }, 
                { 
                    type: LOGIN_RESPONSE_SUCCESS, 
                    token: '...' 
                }
            )
        ).toEqual({
            token: '...',
            isAuthenticated: true,
            error: null,
            isProcessing: false
        })
    })

    it('should handle LOGIN_RESPONSE_ERROR', () => {
        expect(
            reducer(
                undefined, 
                { 
                    type: LOGIN_RESPONSE_ERROR, 
                    error: 'Error'
                }
            )
        ).toEqual({
            token: null,
            error: 'Error',
            isProcessing: false,
            isAuthenticated: false
        })

        expect(
            reducer(
                {
                    token: null,
                    isAuthenticated: false,
                    error: null,
                    isProcessing: true
                }, 
                { 
                    type: LOGIN_RESPONSE_ERROR, 
                    error: 'Error 2'
                }
            )
        ).toEqual({
            token: null,
            error: 'Error 2',
            isProcessing: false,
            isAuthenticated: false
        })
    })
})
