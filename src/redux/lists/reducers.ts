import { ADD_LIST, REMOVE_LIST } from './actions'
import { RootAction } from '../RootAction'
import { IList } from '../lists/types'

export type State = IList

const defaultValue: State = {
    id: -1,
    title: '',
    rank: -1,
    cards: [],    
}

export const reducer = (state: State = defaultValue, action: RootAction) => {
        switch (action.type) {

            case ADD_LIST: 
                state.cards = [...state.cards, {
                    id: action.id,
                    description: action.description, 
                    dueTime: action.dueTime,
                    attachments: action.attachments,
                    comments: action.comments,
                    tasksLists: action.tasksLists,
                    tags: action.tags,
                }]
                return state

            case REMOVE_LIST:
                state.cards = [
                    ...state.cards.slice(0, action.index),
                    ...state.cards.slice(action.index + 1)
                ]
                return state

            default:
                return state
    }
  }
