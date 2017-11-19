import { Actions as FetchActions, actionCreators as fetchActionCreators } from './actions/fetch'
import { Actions as ModalActions, actionCreators as modalActionCreators } from './actions/openModal'
import { Actions as UpdateActions, actionCreators as updateActionCreators } from './actions/update'
import { Actions as DeleteActions, actionCreators as deleteActionCreators } from './actions/delete'

export type Actions =
    FetchActions
    & UpdateActions
    & ModalActions
    & DeleteActions

export const actionCreators = {
    ...fetchActionCreators,
    ...updateActionCreators,
    ...modalActionCreators,
    ...deleteActionCreators
}
