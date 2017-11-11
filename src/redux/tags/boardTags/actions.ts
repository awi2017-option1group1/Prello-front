import { Actions as FetchActions, actionCreators as fetchActionCreators } from './actions/fetchAll'
import { Actions as CreateActions, actionCreators as createActionCreators } from './actions/create'
import { Actions as UpdateActions, actionCreators as updateActionCreators } from './actions/update'
import { Actions as DeleteActions, actionCreators as deleteActionCreators } from './actions/delete'

export type Actions = 
    FetchActions
     & CreateActions
     & UpdateActions
     & DeleteActions

export const actionCreators = {
    ...fetchActionCreators,
    ...createActionCreators,
    ...updateActionCreators,
    ...deleteActionCreators
}
