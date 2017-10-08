import { combineReducers, Dispatch as ReduxDispatch } from 'redux'
import { routerReducer as router, RouterState } from 'react-router-redux'
import { reducer as lists, State as ListsState } from './Lists/Reducers/lists'
import { reducer as login, State as LoginState } from './Login/reducers'

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
    router: RouterState
    todos: ListsState,
    login: LoginState
}

export type Dispatch = ReduxDispatch<RootState>

export const rootReducer = combineReducers<RootState>({
    router,
    lists,
    login
})
