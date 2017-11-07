import { LOGIN_SUCCESS, actionCreators } from './actions'

describe('Login sync actions', () => {
    it('should create an action to notify a success login', () => {
        const expectedAction = {
            type: LOGIN_SUCCESS,
            user: {
                uid: 1,
                email: 'titi@photon.fr',
                username: 'toto'
            }
        }
        expect(actionCreators.loginSuccess({
            uid: 1,
            email: 'titi@photon.fr',
            username: 'toto'
        })).toEqual(expectedAction)
    })
})
