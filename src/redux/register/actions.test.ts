import thunk from 'redux-thunk'
import * as nock from 'nock'
import configureMockStore from 'redux-mock-store'

import { getBaseUrl } from '../../services/http'
import { REGISTER_REQUEST, REGISTER_RESPONSE_SUCCESS, REGISTER_RESPONSE_ERROR, actionCreators } from './actions'

describe('Register sync actions', () => {
    it('should create an action to register', () => {
        const expectedAction = {
            type: REGISTER_REQUEST
        }
        expect(actionCreators.registerRequest()).toEqual(expectedAction)
    })

    it('should create an action to notify a success register response', () => {
        const expectedAction = {
            type: REGISTER_RESPONSE_SUCCESS
        }
        expect(actionCreators.registerSuccess()).toEqual(expectedAction)
    })

    it('should create an action to notify an error register response', () => {
        const expectedAction = {
            type: REGISTER_RESPONSE_ERROR,
            errors: [{  field: 'email', message: 'Email already used' }]
        }
        expect(
            actionCreators.registerError([{  field: 'email', message: 'Email already used' }])
        ).toEqual(expectedAction)
    })
})

const mockStore = configureMockStore([thunk])

describe('Register async actions', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('should create REGISTER_RESPONSE_SUCCESS when success register response is received', () => {
        nock(getBaseUrl())
            .post('/register')
            .reply(200, { token: '...' })

        const expectedActions = [
            { type: REGISTER_REQUEST },
            { type: REGISTER_RESPONSE_SUCCESS },
            { type: '@@router/CALL_HISTORY_METHOD', payload: { method: 'push', args: ['/register/success'] } }
        ]
        const store = mockStore({ auth: {} })

        return store.dispatch(actionCreators.register('email', 'username', 'password')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should create REGISTER_RESPONSE_ERROR when error register response is received', () => {
        nock(getBaseUrl())
            .post('/register')
            .reply(401, { errors: [{  field: 'email', message: 'Email already used' }] })

        const expectedActions = [
            { type: REGISTER_REQUEST },
            { type: REGISTER_RESPONSE_ERROR, errors: [{  field: 'email', message: 'Email already used' }] }
        ]
        const store = mockStore({ auth: {} })

        return store.dispatch(actionCreators.register('email', 'username', 'password')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
