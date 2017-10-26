import { CREATE_BOARD, REMOVE_BOARD, FETCH_BOARD_SUCCESS } from './actions'
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
                    userRole: action.userRole,
                }

            case FETCH_BOARD_SUCCESS:
                return {
                    board: action.board,
                    lists: state.lists

                }

            case REMOVE_BOARD:
                return null

            default:
                return state
    }
}
