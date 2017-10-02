import { createStore, compose, Middleware, applyMiddleware } from 'redux'
import { rootReducer, RootState } from './RootReducer'

function configureStore(initialState?: RootState) {
    const middlewares: Middleware[] = []
    const enhancer = compose(
        applyMiddleware(...middlewares),
    )
    return createStore(rootReducer, initialState!, enhancer)
}
const store = configureStore()
export default store