import { combineReducers, Dispatch as ReduxDispatch } from 'redux'
import { routerReducer as router, RouterState } from 'react-router-redux'

import { reducer as auth, State as AuthState } from './auth/reducers'
import { reducer as lists, State as ListsState } from './lists/reducers'
import { reducer as register, State as RegisterState } from './register/reducers'
import { reducer as board, State as BoardState } from './boards/reducers'
import { reducer as boardsList, State as BoardsListState } from './boardsList/reducers'
import { reducer as checkList, State as CheckListState } from './checkLists/reducers'
import { reducer as checkItem, State as CheckItemState } from './checkItems/reducers'
import { reducer as user, State as UserState } from './users/reducers'
import { reducer as checkItems, State as CheckItemListState } from './checkItemsList/reducers'
import { reducer as cards, State as CardsState } from './cards/cardsLists/reducers'
import { reducer as card, State as CardState } from './cards/reducers'
import { reducer as ui, State as UiState } from './ui/reducers'
import { reducer as cardsLabel, State as CardsLabelState } from './tags/cardsTags/reducers'
import { reducer as boardLabel, State as BoardLabelState } from './tags/boardTags/reducers'
import { reducer as assignees, State as AssigneesState } from './cards/AssignedUsers/reducers'

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
    router: RouterState
    board: BoardState
    lists: ListsState
    auth: AuthState
    boardsList: BoardsListState
    checkList: CheckListState
    checkItem: CheckItemState
    user: UserState
    checkItems: CheckItemListState
    register: RegisterState,
    cards: CardsState,
    card: CardState
    ui: UiState
    cardsLabel: CardsLabelState
    boardLabel: BoardLabelState
    assignees: AssigneesState
}

export type Dispatch = ReduxDispatch<RootState>

export const rootReducer = combineReducers<RootState>({
    router,
    board,
    lists,
    cards,
    card,
    auth,
    register,
    boardsList,
    checkList,
    checkItem,
    user,
    ui,
    cardsLabel,
    boardLabel,
    assignees,
    checkItems
})
