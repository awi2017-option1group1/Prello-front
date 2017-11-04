import { CREATE_COMMENT } from './actions'
import { RootAction } from '../RootAction'
import { IUser } from '../users/types'

export type State = {
    id: number,
    content: string,
    createdDate: Date,
    user: IUser
}

const defaultValue: State = {
    id: -1,
    content: '',
    createdDate: new Date(),
    user: new User()
}

export const reducer = (state: State = defaultValue, action: RootAction) => { 
        switch (action.type) {
            case CREATE_COMMENT:
                return {
                    content: action.content,
                    isPrivate: action.isPrivate,
                    lists: action.lists,
                    tags: action.tags,
                    userRole: action.userRole,
                }

            case REMOVE_COMMENT:
                return null

            default:
                return state
    }
}
