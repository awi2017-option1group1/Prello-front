import { RouterAction, LocationChangeAction } from 'react-router-redux'

import { Actions as ListActions } from './lists/actions'
import { Actions as LoginActions } from './login/actions'
import { Actions as BoardsActions } from './boards/actions'
import { Actions as BoardActions } from './boards/action'
import { Actions as TestActions } from './testActions'

type ReactRouterAction = RouterAction | LocationChangeAction

export type RootAction =
  | ReactRouterAction
  | ListActions[keyof ListActions]
  | LoginActions[keyof LoginActions]
  | BoardsActions[keyof BoardsActions]
  | BoardActions[keyof BoardActions]
  | TestActions[keyof TestActions]
