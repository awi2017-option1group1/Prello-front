import { Actions as FetchActions, actionCreators as fetchActionCreators } from './actions/fetchAll'
import { Actions as AssignActions, actionCreators as assignActionCreators } from './actions/assign'
import { Actions as UnassignActions, actionCreators as unassignActionCreators } from './actions/unassign'
import { actionCreators as createAndAssignActionCreators } from './actions/createAndAssign'

export type Actions = 
    FetchActions
    & AssignActions
    & UnassignActions

export const actionCreators = {
    ...fetchActionCreators,
    ...assignActionCreators,
    ...unassignActionCreators,
    ...createAndAssignActionCreators
}
