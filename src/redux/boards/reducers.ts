import { CREATE_BOARD, REMOVE_BOARD } from './actions'
import { RootAction } from '../RootAction'
import { IList } from '../lists/types'
import { ITag } from '../tags/types'

export type State = {
    id: number,
    title: string,
    isPrivate: boolean,
    lists: IList[],
    tags: ITag[],
}

const defaultValue: State = {
    id: -1,
    title: '',
    isPrivate: false,
    lists: [],
    tags: [],
}
export const reducer = (state: State = defaultValue, action: RootAction) => { 
        switch (action.type) {
            case CREATE_BOARD:
                return {
                    title: action.title,
                    isPrivate: action.isPrivate,
                    lists: action.lists,
                    tags: action.tags,
                }

            case REMOVE_BOARD:
                return null

            default:
                return state
    }
}
