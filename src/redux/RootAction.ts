import { RouterAction, LocationChangeAction } from 'react-router-redux'

import { Actions as ListActions } from './lists/actions'
import { Actions as AuthActions } from './auth/actions'
import { Actions as RegisterActions } from './register/actions'
import { Actions as BoardsActions } from './boards/boardsList/actions'
import { Actions as BoardActions } from './boards/actions'
import { Actions as TestActions } from './testActions'
import { Actions as CardActions } from './cards/actions'

type ReactRouterAction = RouterAction | LocationChangeAction

export type RootAction =
  | ReactRouterAction
  | ListActions[keyof ListActions]
  | AuthActions[keyof AuthActions]
  | RegisterActions[keyof RegisterActions]
  | BoardsActions[keyof BoardsActions]
  | BoardActions[keyof BoardActions]
  | TestActions[keyof TestActions]
  | CardActions[keyof CardActions]
