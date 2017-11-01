import { WSClient } from '../services/websockets'
import store from './store'

import { IList } from './lists/types'
import { actionCreators as listsActionCreators } from './lists/actions'

const { dispatch } = store

export const RealTimeRedux = (websocket: WSClient) => {
    websocket.on('create-list', (payload: IList) => {
        dispatch(listsActionCreators.createBoardListRequestSuccess(payload))
    })

    websocket.on('update-list', (payload: IList) => {
        dispatch(listsActionCreators.updateBoardListRequestSuccess(payload))
    })

    websocket.on('delete-list', (payload: IList) => {
        dispatch(listsActionCreators.deleteBoardListRequestSuccess(payload))
    })
}
