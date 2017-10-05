import { LOGIN } from '../actions'
import { combineReducers } from 'redux'
import { RootAction } from '../../RootAction'

export type State = {
}

export const reducer = combineReducers<RootAction>({
    login: (state = [], action) => {
        switch (action.type) {

            case LOGIN:
                console.log('Login', action.email, action.password)
                return state

            default:
                return state
    }
  }
})
