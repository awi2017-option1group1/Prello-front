import { actionCreators as AssignActionCreators,
    ASSIGN_USER, ASSIGN_USER_ERROR, ASSIGN_USER_SUCCESS} from './actions/assign'
import { actionCreators as UnassignActionCreators,
    UNASSIGN_USER, UNASSIGN_USER_ERROR, UNASSIGN_USER_SUCCESS} from './actions/unassign'
import { actionCreators as FetchAllActionCreators,
    FETCH_ASSIGNEES_LIST, FETCH_ASSIGNEES_LIST_ERROR, FETCH_ASSIGNEES_LIST_SUCCESS} from './actions/fetchAll'

import { IUser } from './../../users/types'

/*
import thunk from 'redux-thunk'
import * as nock from 'nock'
import configureMockStore from 'redux-mock-store'
import { getBaseUrl } from '../../services/http'
*/

describe('AssignUsers sync actions', () => {

    const userDefault: IUser = {
        id: 4,
        fullName: 'JeanJacquesRousseau',
        username: 'JJR',
        bio: new Text('ItIsMeMario'),
        notificationEnabled: true,
        email: 'jeanjacquesrousseau@gmail.com',
        password: 'jeanjacques',
        uuidToken: null,
        boardRole: [],
        teamRole: []
    }

    it('should create an action ASSIGN_USER', () => {
        const expectedAction = {
            type: ASSIGN_USER,
            user: {
                id: 4,
                fullName: 'JeanJacquesRousseau',
                username: 'JJR',
                bio: new Text('ItIsMeMario'),
                notificationEnabled: true,
                email: 'jeanjacquesrousseau@gmail.com',
                password: 'jeanjacques',
                uuidToken: null,
                boardRole: [],
                teamRole: []
            },
            cardId: 9
        }
        expect(AssignActionCreators.assignUserRequest(9, userDefault)).toEqual(expectedAction)
    })

    it('should create an action ASSIGN_USER_SUCCESS', () => {
        const expectedAction = {
            type: ASSIGN_USER_SUCCESS
        }
        expect(AssignActionCreators.assignUserRequestSuccess()).toEqual(expectedAction)
    })

    it('should create an action ASSIGN_USER_ERROR', () => {
        const expectedAction = {
            type: ASSIGN_USER_ERROR
        }
        expect(AssignActionCreators.assignUserRequestError()).toEqual(expectedAction)
    })

    it('should create an action UNASSIGN_USER', () => {
        const expectedAction = {
            type: UNASSIGN_USER,
            user: {
                id: 4,
                fullName: 'JeanJacquesRousseau',
                username: 'JJR',
                bio: new Text('ItIsMeMario'),
                notificationEnabled: true,
                email: 'jeanjacquesrousseau@gmail.com',
                password: 'jeanjacques',
                uuidToken: null,
                boardRole: [],
                teamRole: []
            },
            cardId: 9
        }
        expect(UnassignActionCreators.unassignUserRequest(9, userDefault)).toEqual(expectedAction)
    })

    it('should create an action UNASSIGN_USER_SUCCESS', () => {
        const expectedAction = {
            type: UNASSIGN_USER_SUCCESS
        }
        expect(UnassignActionCreators.unassignUserRequestSuccess()).toEqual(expectedAction)
    })

    it('should create an action UNASSIGN_USER_ERROR', () => {
        const expectedAction = {
            type: UNASSIGN_USER_ERROR
        }
        expect(UnassignActionCreators.unassignUserRequestError()).toEqual(expectedAction)
    })

    it('should create an action FETCH_ASSIGNEES_LIST', () => {
        const expectedAction = {
            type: FETCH_ASSIGNEES_LIST,
            cardID: 9
        }
        expect(FetchAllActionCreators.fetchAssigneesListRequest(9)).toEqual(expectedAction)
    })

    it('should create an action FETCH_ASSIGNEES_LIST_SUCCESS', () => {
        const expectedAction = {
            type: FETCH_ASSIGNEES_LIST_SUCCESS,
            cardID: 9,
            assignees: [{
                id: 4,
                fullName: 'JeanJacquesRousseau',
                username: 'JJR',
                bio: new Text('ItIsMeMario'),
                notificationEnabled: true,
                email: 'jeanjacquesrousseau@gmail.com',
                password: 'jeanjacques',
                uuidToken: null,
                boardRole: [],
                teamRole: []
            }]
        }
        expect(FetchAllActionCreators.fetchAssigneesListRequestSuccess(9, [userDefault])).toEqual(expectedAction)
    })

    it('should create an action FETCH_ASSIGNEES_LIST_ERROR', () => {
        const expectedAction = {
            type: FETCH_ASSIGNEES_LIST_ERROR,
            cardID: 9,
            error: 'errorMessage'
        }
        expect(FetchAllActionCreators.fetchAssigneesListRequestError(9, 'errorMessage')).toEqual(expectedAction)
    })

})
