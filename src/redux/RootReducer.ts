import { combineReducers, Dispatch as ReduxDispatch } from 'redux'
import { routerReducer as router, RouterState } from 'react-router-redux'

import { reducer as auth, State as AuthState } from './auth/reducers'
import { reducer as lists, State as ListsState } from './lists/reducers'
import { reducer as register, State as RegisterState } from './register/reducers'
import { reducer as board, State as BoardState } from './boards/reducers'
import { reducer as boardsList, State as BoardsListState } from './boardsList/reducers'
import { reducer as checkList, State as CheckListState } from './checkLists/reducers'
import { reducer as checkItem, State as CheckItemState } from './checkItems/reducers'
import { reducer as cards, State as CardsState } from './cards/cardsLists/reducers'
import { reducer as card, State as CardState } from './cards/reducers'

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
    router: RouterState
    board: BoardState
    lists: ListsState
    auth: AuthState
    boardsList: BoardsListState
    checkList: CheckListState
    checkItem: CheckItemState
    register: RegisterState,
    cards: CardsState,
    card: CardState
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
    checkItem
})
