import { combineReducers, Dispatch as ReduxDispatch } from 'redux'
import { routerReducer as router, RouterState } from 'react-router-redux'

import { reducer as auth, State as AuthState } from './auth/reducers'
import { reducer as lists, State as ListsState } from './lists/reducers'
import { reducer as register, State as RegisterState } from './register/reducers'
import { reducer as board, State as BoardState } from './boards/reducers'
import { reducer as comment, State as CommentState } from './comments/reducers'
// import { reducer as comments, State as CommentsState } from './comments/commentsList/reducers'
import { reducer as checkList, State as CheckListState } from './checkLists/reducers'
import { reducer as checkItem, State as CheckItemState } from './checkItems/reducers'

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
    router: RouterState,
    boards: BoardsState,
    board: BoardState,
    comment: CommentState,
    // comments: CommentsState,
    todos: ListsState,
    login: LoginState
    router: RouterState
    board: BoardState
    lists: ListsState
    auth: AuthState
    register: RegisterState
    checkList: CheckListState
    checkItem: CheckItemState
}

export type Dispatch = ReduxDispatch<RootState>

export const rootReducer = combineReducers<RootState>({
    router,
    board,
    comment,
    // comments,
    login
    lists,
    auth,
    register,
    checkList,
    checkItem
})
