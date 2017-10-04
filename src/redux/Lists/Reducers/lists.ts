import { ADD_LIST, REMOVE_LIST } from '../actions/lists'
import { combineReducers } from 'redux'
import { RootAction } from '../../RootAction'
import { IList } from '../types'

export type State = {
    readonly lists: IList[],
}

export const reducer = combineReducers<RootAction>({
    todos: (state = [], action) => {
        switch (action.type) {

            case ADD_LIST:
                return [...state, {
                    id: action.id,
                    title: action.title,
                }]

            case REMOVE_LIST:
                return

            default:
                return state
    }
  }
})