import { Actions as FetchActions, actionCreators as fetchActionCreators } from './actions/fetch'
import { Actions as FetchAllActions, actionCreators as fetchAllActionCreators } from './actions/fetchAll'
import { Actions as SelectActions, actionCreators as selectActionCreators } from './actions/select'
import { Actions as MoveActions, actionCreators as moveActionCreators } from './actions/move'
import { Actions as CreateActions, actionCreators as createActionCreators } from './actions/create'
import { Actions as UpdateActions, actionCreators as updateActionCreators } from './actions/update'
import { Actions as DeleteActions, actionCreators as deleteActionCreators } from './actions/delete'

export type Actions = 
    FetchActions
    & FetchAllActions
    & SelectActions
    & MoveActions
    & CreateActions
    & UpdateActions
    & DeleteActions

export const actionCreators = {
    ...fetchActionCreators,
    ...fetchAllActionCreators,
    ...selectActionCreators,
    ...moveActionCreators,
    ...createActionCreators,
    ...updateActionCreators,
    ...deleteActionCreators,
}
