import thunk from 'redux-thunk'
import * as nock from 'nock'
import configureMockStore from 'redux-mock-store'

import { getBaseUrl } from '../../services/http'
import {    FETCH_USER, 
            FETCH_USER_ERROR, 
            FETCH_USER_SUCCESS, 
            CONFIRM_EMAIL, 
            CONFIRM_EMAIL_ERROR, 
            CONFIRM_EMAIL_SUCCESS } from './actions/fetch'

import { UPDATE_USER, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS } from './actions/update'
import { actionCreators } from './actions'

const userTest = {
    id: 1,
    username: 'test',
    notificationsEnabled: true,
    email: 'test@test.fr',
    password: 'test',
}

const newUserTest = {
    id: 1,
    username: 'test2',
    notificationsEnabled: true,
    email: 'test@test.fr',
    password: 'test',
}

describe('user sync actions', () => {
    it('should create an action to fetch', () => {
        const expectedAction = {
            type: FETCH_USER
        }
        expect(actionCreators.fetchUserRequest()).toEqual(expectedAction)
    })

    it('should create an action to notify a success fetch response', () => {

        const expectedAction = {
            type: FETCH_USER_SUCCESS,
            user: userTest
        }
        expect(actionCreators.fetchUserRequestSuccess(userTest)).toEqual(expectedAction)
    })

    it('should create an action to notify an error fetch response', () => {
        const expectedAction = {
            type: FETCH_USER_ERROR,
            error: 'fail'
        }
        expect(
            actionCreators.fetchUserRequestError('fail')
        ).toEqual(expectedAction)
    })

// ----------------------------------------------

    it('should create an action to confirm the mail', () => {
        const expectedAction = {
            type: CONFIRM_EMAIL
        }
        expect(actionCreators.confirmUserRequest()).toEqual(expectedAction)
    })

    it('should create an action to notify a success confirm response', () => {

        const expectedAction = {
            type: CONFIRM_EMAIL_SUCCESS,
            user: userTest
        }
        expect(actionCreators.confirmUserSuccess(userTest)).toEqual(expectedAction)
    })

    it('should create an action to notify an error confirm response', () => {
        const expectedAction = {
            type: CONFIRM_EMAIL_ERROR,
            error: 'fail'
        }
        expect(
            actionCreators.confirmUserError('fail')
        ).toEqual(expectedAction)
    })
        
// ----------------------------------------------

    it('should create an action to update the user', () => {
        const expectedAction = {
            type: UPDATE_USER
        }
        expect(actionCreators.updateUserRequest()).toEqual(expectedAction)
    })

    it('should create an action to notify a success update', () => {

        const expectedAction = {
            type: UPDATE_USER_SUCCESS,
            user: userTest
        }
        expect(actionCreators.updateUserRequestSuccess(userTest)).toEqual(expectedAction)
    })

    it('should create an action to notify an error update response', () => {
        const expectedAction = {
            type: UPDATE_USER_ERROR,
            error: 'fail'
        }
        expect(
            actionCreators.updateUserRequestError('fail')
        ).toEqual(expectedAction)
    })
})

const mockStore = configureMockStore([thunk])

describe('user async actions', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('should create FETCH_USER_SUCCESS when success register response is received', () => {
        nock(getBaseUrl())
            .get('/users/1')
            .reply(200, userTest)

        const expectedActions = [
            { type: FETCH_USER },
            { type: FETCH_USER_SUCCESS, user: userTest},
        ]
        const store = mockStore({ auth: {user: {uid: 1}} })

        return store.dispatch(actionCreators.fetchUser()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should create FETCH_USER_ERROR when error register response is received', () => {
        nock(getBaseUrl())
            .get('/users/1')
            .reply(404, {error: 'not found'})

        const expectedActions = [
            { type: FETCH_USER },
            { type: FETCH_USER_ERROR, error: 'not found'}
        ]
        const store = mockStore({ auth: {user: {uid: 1}} })

        return store.dispatch(actionCreators.fetchUser()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
            
// ----------------------------------------------

    it('should create CONFIRM_EMAIL_SUCCESS when success register response is received', () => {
        nock(getBaseUrl())
            .post('/users/1/confirm/token')
            .reply(200, userTest)

        const expectedActions = [
            { type: CONFIRM_EMAIL },
            { type: CONFIRM_EMAIL_SUCCESS, user: userTest},
        ]
        const store = mockStore({ auth: {}})

        return store.dispatch(actionCreators.confirmEmail(1, 'token')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should create FETCH_USER_ERROR when error register response is received', () => {
        nock(getBaseUrl())
            .post('/users/1/confirm/token')
            .reply(404, {error: 'not found'})

        const expectedActions = [
            { type: CONFIRM_EMAIL },
            { type: CONFIRM_EMAIL_ERROR, error: 'not found'}
        ]
        const store = mockStore({ auth: {user: {uid: 1}} })

        return store.dispatch(actionCreators.confirmEmail(1, 'token')).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
        
// ----------------------------------------------

    it('should create UPDATE_USER_SUCCESS when success update response is received', () => {
        nock(getBaseUrl())
            .put('/users/1')
            .reply(200, newUserTest)

        const expectedActions = [
            { type: UPDATE_USER },
            { type: UPDATE_USER_SUCCESS, user: newUserTest},
        ]
        const store = mockStore({ auth: {user: {uid: 1}} })

        return store.dispatch(actionCreators.updateUser({username: 'test2'})).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should create FETCH_USER_ERROR when error register response is received', () => {
        nock(getBaseUrl())
            .put('/users/1')
            .reply(404, {error: 'not found'})

        const expectedActions = [
            { type: UPDATE_USER },
            { type: UPDATE_USER_ERROR, error: 'not found'}
        ]
        const store = mockStore({ auth: {user: {uid: 1}} })

        return store.dispatch(actionCreators.updateUser({username: 'test2'})).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
