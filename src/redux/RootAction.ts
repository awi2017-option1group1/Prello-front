import { RouterAction, LocationChangeAction } from 'react-router-redux'

import { Actions as ListActions } from './lists/actions'
import { Actions as AuthActions } from './auth/actions'
import { Actions as RegisterActions } from './register/actions'
import { Actions as BoardsListActions } from './boardsList/actions'
import { Actions as BoardActions } from './boards/actions'
import { Actions as CheckItemActions } from './checkItems/actions'
import { Actions as CheckItemListActions } from './checkItemsList/actions'
import { Actions as CheckListActions } from './checkLists/actions'
import { Actions as CheckListsListActions } from './checkListsList/actions'
import { Actions as TestActions } from './testActions'
import { Actions as UserActions } from './users/actions'
import { Actions as CardActions } from './cards/actions'
import { Actions as AssigneesActions } from './cards/AssignedUsers/actions'
import { Actions as UiActions } from './ui/actions'
import { Actions as BoardLabelActions } from './tags/boardTags/actions'
import { Actions as CardsLabelActions } from './tags/cardsTags/actions'
import { Actions as ResetPasswordActions } from './resetPassword/actions'
import { Actions as NotificationActions } from './notifications/actions'

type ReactRouterAction = RouterAction | LocationChangeAction

export type RootAction =
  | ReactRouterAction
  | ListActions[keyof ListActions]
  | AuthActions[keyof AuthActions]
  | RegisterActions[keyof RegisterActions]
  | BoardsListActions[keyof BoardsListActions]
  | BoardActions[keyof BoardActions]
  | CheckItemActions[keyof CheckItemActions]
  | CheckItemListActions[keyof CheckItemListActions]
  | CheckListActions[keyof CheckListActions]
  | CheckListsListActions[keyof CheckListsListActions]
  | TestActions[keyof TestActions]
  | UserActions[keyof UserActions]
  | CardActions[keyof CardActions]
  | UiActions[keyof UiActions]
  | BoardLabelActions[keyof BoardLabelActions]
  | CardsLabelActions[keyof CardsLabelActions]
  | ResetPasswordActions[keyof ResetPasswordActions]
  | NotificationActions[keyof NotificationActions]
  | AssigneesActions[keyof AssigneesActions]
