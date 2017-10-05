import { LOGIN } from '../actions'
import { combineReducers } from 'redux'
import { RootAction } from '../../RootAction'

export type State = {
}

export const reducer = combineReducers<RootAction>({
    login: (state = [], action) => {
        switch (action.type) {

            case LOGIN:
                // TODO : Link with API
                return state

            default:
                return state
    }
  }
})
