import { ADD_BOARD, REMOVE_SINGLE_BOARD } from './actions'
import { RootAction } from '../../RootAction'
import { IBoard } from '../types'

export type State = IBoard[]

const defaultValue: State = [] 
export const reducer = (state: State = defaultValue, action: RootAction) => {
        switch (action.type) {

            case ADD_BOARD:
                return [...state, {
                    title: action.title,
                    isPrivate: action.isPrivate,
                }]

            case REMOVE_SINGLE_BOARD:
                return [
                    ...state.slice(0, action.index),
                    ...state.slice(action.index + 1)
                ]

            default:
                return state
    }
  }
