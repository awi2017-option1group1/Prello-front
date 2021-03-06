import { Actions as FetchActions, actionCreators as fetchActionCreators } from './actions/fetch'
import { Actions as CreateActions, actionCreators as createActionCreators } from './actions/create'
import { Actions as UpdateActions, actionCreators as updateActionCreators } from './actions/update'
import { Actions as MoveActions, actionCreators as moveActionCreators } from './actions/move'
import { Actions as DeleteActions, actionCreators as deleteActionCreators } from './actions/delete'

export type Actions = 
    FetchActions
    & CreateActions
    & UpdateActions
    & MoveActions
    & DeleteActions

export const actionCreators = {
    ...fetchActionCreators,
    ...createActionCreators,
    ...updateActionCreators,
    ...moveActionCreators,
    ...deleteActionCreators
}
