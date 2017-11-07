import { Actions as FetchAllActions, actionCreators as fetchActionCreators } from './actions/fetchAll'
import { Actions as CreateActions, actionCreators as createActionCreators } from './actions/create'

export type Actions =
    FetchAllActions
    & CreateActions

export const actionCreators = {
    ...fetchActionCreators,
    ...createActionCreators,
}
