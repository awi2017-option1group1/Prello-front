import { CREATE_COMMENT } from './actions'
import { RootAction } from '../RootAction'

export type State = {
    id: number,
    content: string,
    createdDate: Date,
    userId: number
}

const defaultValue: State = {
    id: -1,
    content: '',
    createdDate: new Date(),
    userId : -1
}

export const reducer = (state: State = defaultValue, action: RootAction) => { 
        switch (action.type) {
            case CREATE_COMMENT:
                return {
                    id: action.content,
                    createdDate: action.isPrivate,
                    userId: action.userId
                }

            case REMOVE_COMMENT:
                return {}

            default:
                return state
    }
}
