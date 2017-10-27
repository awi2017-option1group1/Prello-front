import { TEST } from '../testActions'
import { LOGIN_SUCCESS } from './actions'
import { reducer } from './reducers'

describe('Login reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: TEST })).toEqual({
            user: null,
            isAuthenticated: null
        })
    })

    it('should handle LOGIN_SUCCESS', () => {
        expect(
            reducer(
                undefined, 
                { 
                    type: LOGIN_SUCCESS, 
                    user: {
                        uid: 1,
                        email: 'titi@photon.fr',
                        username: 'toto'
                    }
                }
            )
        ).toEqual({
            user: {
                uid: 1,
                email: 'titi@photon.fr',
                username: 'toto'
            },
            isAuthenticated: true
        })

        expect(
            reducer(
                {
                    user: null,
                    isAuthenticated: false
                }, 
                { 
                    type: LOGIN_SUCCESS, 
                    user: {
                        uid: 1,
                        email: 'titi@photon.fr',
                        username: 'toto'
                    }
                }
            )
        ).toEqual({
            user: {
                uid: 1,
                email: 'titi@photon.fr',
                username: 'toto'
            },
            isAuthenticated: true
        })
    })
})
