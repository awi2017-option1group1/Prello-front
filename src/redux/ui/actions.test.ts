import { HIDE_ALERT_MESSAGE, SHOW_ALERT_MESSAGE, actionCreators } from './actions'

describe('ui sync actions', () => {
    it('should create an action to show an alert', () => {
        const expectedAction = {
            type: SHOW_ALERT_MESSAGE,        
            payload: {
                msg: 'test',
                type: 'success'
            }
        }
        expect(actionCreators.showAlertMessage('test', 'success')).toEqual(expectedAction)
    })

    it('should create an action to hide message', () => {
        const expectedAction = {
            type: HIDE_ALERT_MESSAGE
        }
        expect(actionCreators.hideAlertMessage()).toEqual(expectedAction)
    })
})
