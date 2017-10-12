import { createStore, compose, Middleware, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { rootReducer, RootState } from './RootReducer'

function configureStore(initialState?: RootState) {
    const middlewares: Middleware[] = [thunk]
    const enhancer = compose(
        applyMiddleware(...middlewares),
    )
    return createStore(rootReducer, initialState!, enhancer)
}

const store = configureStore()

export default store
