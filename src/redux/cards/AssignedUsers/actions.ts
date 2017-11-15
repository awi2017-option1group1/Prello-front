import { Actions as UsersActions, actionCreators as UsersActionCreators } from './actions/fetchAll'
import { Actions as AssignActions, actionCreators as AssignCreators } from './actions/assign'
import { Actions as UnassignActions, actionCreators as UnassignCreators } from './actions/unassign'

export type Actions = UsersActions
    & AssignActions
    & UnassignActions

export const actionCreators = { 
    ...UsersActionCreators,
    ...AssignCreators,
    ...UnassignCreators,
}
