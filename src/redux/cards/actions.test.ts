/*
import thunk from 'redux-thunk'
import * as nock from 'nock'
import configureMockStore from 'redux-mock-store'
*/

// import { getBaseUrl } from '../../services/http'

import { 
    CARD_ERROR
} from './actions'
import { actionCreators } from './actions'


describe('Card sync actions', () => {

    it('should return a error action', () => {
        const expectedAction = {
            type: CARD_ERROR,
            error: 'did not created',
        }
        expect(actionCreators.cardError('did not created')).toEqual(expectedAction)
    })
})
