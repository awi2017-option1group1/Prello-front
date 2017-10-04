import { RouterAction, LocationChangeAction } from 'react-router-redux'
import { Actions as ListAction } from './Lists/actions/lists'

type ReactRouterAction = RouterAction | LocationChangeAction

export type RootAction =
  | ReactRouterAction
  | ListAction
