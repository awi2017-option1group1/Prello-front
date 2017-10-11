import { ADD_LIST, REMOVE_LIST } from './actions'
import { RootAction } from '../RootAction'
import { IList } from '../lists/types'

export type State = IList[]

const defaultValue: State = []

export const reducer = (state: State = defaultValue, action: RootAction) => {
        switch (action.type) {

            case ADD_LIST:
                return [...state, {
                    id: action.id,
                    title: action.title,
                }]

            case REMOVE_LIST:
                return [
                    ...state.slice(0, action.index),
                    ...state.slice(action.index + 1)
                ]

            default:
                return state
    }
  }
