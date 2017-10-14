import thunk from 'redux-thunk'
import * as nock from 'nock'
import configureMockStore from 'redux-mock-store'

import { getBaseUrl } from '../../services/http'
import { LOGIN_REQUEST, LOGIN_RESPONSE_ERROR, LOGIN_RESPONSE_SUCCESS, actionCreators } from './actions'

describe('Login sync actions', () => {
    it('should create an action to login', () => {
        const expectedAction = {
            type: LOGIN_REQUEST
        }
        expect(actionCreators.loginRequest()).toEqual(expectedAction)
    })

    it('should create an action to notify a success login response', () => {
        const expectedAction = {
            type: LOGIN_RESPONSE_SUCCESS,
            token: '...'
        }
        expect(actionCreators.loginSuccess('...')).toEqual(expectedAction)
    })

    it('should create an action to notify an error login response', () => {
        const expectedAction = {
            type: LOGIN_RESPONSE_ERROR,
            error: 'Error Test'
        }
        expect(actionCreators.loginError('Error Test')).toEqual(expectedAction)
    })
})

const mockStore = configureMockStore([thunk])

describe('Login async actions', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('should create LOGIN_RESPONSE_SUCCESS when success login response is received', () => {
        nock(getBaseUrl())
            .post('/login')
            .reply(200, { token: '...' })

        const expectedActions = [
            { type: LOGIN_REQUEST },
            { type: LOGIN_RESPONSE_SUCCESS, token: '...' },
            { type: '@@router/CALL_HISTORY_METHOD', payload: { method: 'push', args: ['/'] } }
        ]
        const store = mockStore({ login: {} })

        return store.dispatch(actionCreators.login('email', 'password')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should create LOGIN_RESPONSE_ERROR when error login response is received', () => {
        nock(getBaseUrl())
            .post('/login')
            .reply(401, { message: 'Error' })

        const expectedActions = [
            { type: LOGIN_REQUEST },
            { type: LOGIN_RESPONSE_ERROR, error: 'Error' }
        ]
        const store = mockStore({ login: {} })

        return store.dispatch(actionCreators.login('email', 'password')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
