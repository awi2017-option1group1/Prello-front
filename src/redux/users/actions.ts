import { Actions as FetchActions, actionCreators as fetchActionCreators } from './actions/fetch'
import { Actions as UpdateActions, actionCreators as updateActionCreators } from './actions/update'

export type Actions =
    FetchActions
    & UpdateActions

export const actionCreators = {
    ...fetchActionCreators,
    ...updateActionCreators,
}
