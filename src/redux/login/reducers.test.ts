import { TEST } from '../testActions'
import { LOGIN_REQUEST, LOGIN_RESPONSE_SUCCESS, LOGIN_RESPONSE_ERROR } from './actions'
import { reducer } from './reducers'

describe('Login reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: TEST })).toEqual({
            content: {},
            error: null,
            isProcessing: false
        })
    })

    it('should handle LOGIN_REQUEST', () => {
        expect(reducer(undefined, { type: LOGIN_REQUEST })).toEqual({
            content: {},
            error: null,
            isProcessing: true
        })
    })

    it('should handle LOGIN_RESPONSE_SUCCESS', () => {
        expect(
            reducer(
                undefined, 
                { 
                    type: LOGIN_RESPONSE_SUCCESS, 
                    content: { user: 1 } 
                }
            )
        ).toEqual({
            content: { user: 1 },
            error: null,
            isProcessing: false
        })

        expect(
            reducer(
                {
                    content: {},
                    error: null,
                    isProcessing: true
                }, 
                { 
                    type: LOGIN_RESPONSE_SUCCESS, 
                    content: { user: 2 } 
                }
            )
        ).toEqual({
            content: { user: 2 },
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
            content: {},
            error: 'Error',
            isProcessing: false
        })

        expect(
            reducer(
                {
                    content: {},
                    error: null,
                    isProcessing: true
                }, 
                { 
                    type: LOGIN_RESPONSE_ERROR, 
                    error: 'Error 2'
                }
            )
        ).toEqual({
            content: {},
            error: 'Error 2',
            isProcessing: false
        })
    })
})
