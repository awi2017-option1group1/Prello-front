import { RouterAction, LocationChangeAction } from 'react-router-redux'

import { Actions as ListActions } from './Lists/actions/lists'
import { Actions as LoginActions } from './Login/actions'

type ReactRouterAction = RouterAction | LocationChangeAction

export type RootAction =
  | ReactRouterAction
  | ListActions[keyof ListActions]
  | LoginActions[keyof LoginActions]
