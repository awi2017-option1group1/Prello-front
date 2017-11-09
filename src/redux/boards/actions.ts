import { Actions as FetchActions, actionCreators as fetchActionCreators } from './actions/fetch'
import { Actions as ModalActions, actionCreators as modalActionCreators } from './actions/openModal'
import { Actions as UpdateActions, actionCreators as updateActionCreators } from './actions/update'

export type Actions =
    FetchActions
    & UpdateActions
    & ModalActions

export const actionCreators = {
    ...fetchActionCreators,
    ...updateActionCreators,
    ...modalActionCreators
}
