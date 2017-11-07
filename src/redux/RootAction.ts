import { RouterAction, LocationChangeAction } from 'react-router-redux'

import { Actions as ListActions } from './lists/actions'
import { Actions as AuthActions } from './auth/actions'
import { Actions as RegisterActions } from './register/actions'
import { Actions as BoardsListActions } from './boardsList/actions'
import { Actions as BoardActions } from './boards/actions'
import { Actions as TestActions } from './testActions'

type ReactRouterAction = RouterAction | LocationChangeAction

export type RootAction =
  | ReactRouterAction
  | ListActions[keyof ListActions]
  | AuthActions[keyof AuthActions]
  | RegisterActions[keyof RegisterActions]
  | BoardsListActions[keyof BoardsListActions]
  | BoardActions[keyof BoardActions]
  | TestActions[keyof TestActions]
