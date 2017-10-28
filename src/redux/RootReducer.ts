import { combineReducers, Dispatch as ReduxDispatch } from 'redux'
import { routerReducer as router, RouterState } from 'react-router-redux'

import { reducer as auth, State as AuthState } from './auth/reducers'
import { reducer as lists, State as ListsState } from './lists/reducers'
import { reducer as register, State as RegisterState } from './register/reducers'
import { reducer as boards, State as BoardsState } from './boards/boardsList/reducers'
import { reducer as board, State as BoardState } from './boards/reducers'

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
    router: RouterState
    boards: BoardsState
    board: BoardState
    lists: ListsState
    auth: AuthState
    register: RegisterState
}

export type Dispatch = ReduxDispatch<RootState>

export const rootReducer = combineReducers<RootState>({
    router,
    boards,
    board,
    lists,
    auth,
    register
})
