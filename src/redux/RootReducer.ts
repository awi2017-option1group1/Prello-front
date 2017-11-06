import { combineReducers, Dispatch as ReduxDispatch } from 'redux'
import { routerReducer as router, RouterState } from 'react-router-redux'
import { reducer as lists, State as ListsState } from './lists/reducers'
import { reducer as login, State as LoginState } from './auth/reducers'
import { reducer as boards, State as BoardsState } from './boards/boardsList/reducers'
import { reducer as board, State as BoardState } from './boards/reducers'
import { reducer as comment, State as CommentState } from './comments/reducers'
// import { reducer as comments, State as CommentsState } from './comments/commentsList/reducers'

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
    router: RouterState,
    boards: BoardsState,
    board: BoardState,
    comment: CommentState,
    // comments: CommentsState,
    todos: ListsState,
    login: LoginState
}

export type Dispatch = ReduxDispatch<RootState>

export const rootReducer = combineReducers<RootState>({
    router,
    lists,
    boards,
    board,
    comment,
    // comments,
    login
})
