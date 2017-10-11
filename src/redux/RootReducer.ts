import { combineReducers, Dispatch as ReduxDispatch } from 'redux'
import { routerReducer as router, RouterState } from 'react-router-redux'
import { reducer as lists, State as ListsState } from './lists/reducers'
import { reducer as login, State as LoginState } from './login/reducers'
import { reducer as boards, State as BoardsState } from './boards/reducers'
import { reducer as board, State as BoardState } from './boards/reducer'

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
    router: RouterState,
    boards: BoardsState,
    board: BoardState,
    todos: ListsState,
    login: LoginState
}

export type Dispatch = ReduxDispatch<RootState>

export const rootReducer = combineReducers<RootState>({
    router,
    lists,
    boards,
    board,
    login
})
