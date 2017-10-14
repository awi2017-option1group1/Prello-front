import { TEST } from '../testActions'
import { REGISTER_REQUEST, REGISTER_RESPONSE_ERROR, REGISTER_RESPONSE_SUCCESS } from './actions'
import { reducer } from './reducers'

describe('Register reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: TEST })).toEqual({
            errors: [],
            isProcessing: false
        })
    })

    it('should handle REGISTER_REQUEST', () => {
        expect(reducer(undefined, { type: REGISTER_REQUEST })).toEqual({
            errors: [],
            isProcessing: true
        })
    })

    it('should handle REGISTER_RESPONSE_SUCCESS', () => {
        expect(
            reducer(
                undefined, 
                { 
                    type: REGISTER_RESPONSE_SUCCESS
                }
            )
        ).toEqual({
            errors: [],
            isProcessing: false
        })

        expect(
            reducer(
                {
                    errors: [],
                    isProcessing: true
                }, 
                { 
                    type: REGISTER_RESPONSE_SUCCESS
                }
            )
        ).toEqual({
            errors: [],
            isProcessing: false
        })
    })

    it('should handle REGISTER_RESPONSE_ERROR', () => {
        expect(
            reducer(
                undefined, 
                { 
                    type: REGISTER_RESPONSE_ERROR, 
                    errors: [{  field: 'email', message: 'Email already used' }]
                }
            )
        ).toEqual({
            errors: [{  field: 'email', message: 'Email already used' }],
            isProcessing: false
        })

        expect(
            reducer(
                {
                    errors: [],
                    isProcessing: true
                }, 
                { 
                    type: REGISTER_RESPONSE_ERROR, 
                    errors: [{  field: 'email', message: 'Email already used' }]
                }
            )
        ).toEqual({
            errors: [{  field: 'email', message: 'Email already used' }],
            isProcessing: false
        })
    })
})
