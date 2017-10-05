import { combineReducers } from 'redux'
import { routerReducer as router, RouterState } from 'react-router-redux'
import { reducer as lists, State as ListsState } from './Lists/Reducers/lists'
import { reducer as login } from './Login/reducers'

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
    router: RouterState
    todos: ListsState
}

export const rootReducer = combineReducers<RootState>({
    router,
    lists,
    login
})
