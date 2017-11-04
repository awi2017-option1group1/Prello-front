import { RouterAction, LocationChangeAction } from 'react-router-redux'

import { Actions as ListActions } from './lists/actions'
import { Actions as LoginActions } from './auth/actions'
import { Actions as BoardsActions } from './boards/boardsList/actions'
import { Actions as BoardActions } from './boards/actions'
import { Actions as TestActions } from './testActions'
import { Actions as CommentActions } from './comments/actions'
import { Actions as CommentsActions } from './comments/commentsList/actions'

type ReactRouterAction = RouterAction | LocationChangeAction

export type RootAction =
  | ReactRouterAction
  | ListActions[keyof ListActions]
  | LoginActions[keyof LoginActions]
  | BoardsActions[keyof BoardsActions]
  | BoardActions[keyof BoardActions]
  | TestActions[keyof TestActions]
  | CommentActions[keyof CommentActions]
  | CommentsActions[keyof CommentsActions]
