import { Actions as FetchActions, actionCreators as fetchActionCreators } from './actions/fetch'
import { Actions as CreateActions, actionCreators as createActionCreators } from './actions/create'
import { Actions as DeleteActions, actionCreators as deleteActionCreators } from './actions/delete'

export type Actions = 
    FetchActions
    & CreateActions
    & DeleteActions

export const actionCreators = {
    ...fetchActionCreators,
    ...createActionCreators,
    ...deleteActionCreators
}
