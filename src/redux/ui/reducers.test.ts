import { TEST } from '../testActions'
import { SHOW_ALERT_MESSAGE, HIDE_ALERT_MESSAGE } from './actions'
import { reducer } from './reducers'

describe('UI reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: TEST })).toEqual({
            alert: {
                show: false,
                msg: '',
                type: 'info'
            }
        })
    })

    it('should handle SHOW_ALERT_MESSAGE', () => {
        expect(reducer(undefined, { 
            type: SHOW_ALERT_MESSAGE, 
            payload: {
                msg: 'test', 
                type: 'success'
            } 
        })).toEqual({alert: {
            show: true,
            msg: 'test',
            type: 'success'
        }})
    })

    it('should handle HIDE_ALERT_MESSAGE', () => {
        expect(
            reducer(
                undefined, 
                { 
                    type: HIDE_ALERT_MESSAGE
                }
            )
        ).toEqual({
            alert: {
                show: false,
                msg: '',
                type: 'info'
            }
        })
    })
})
