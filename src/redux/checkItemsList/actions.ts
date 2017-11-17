import { Actions as FetchAllActions, actionCreators as fetchActionCreators } from './actions/fetchAll'

export type Actions =
    FetchAllActions

export const actionCreators = {
    ...fetchActionCreators,
}
