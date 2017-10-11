import { IList } from '../lists/types'
import { ITag } from '../tags/types'

export const CREATE_BOARD = 'CREATE_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'

export type Actions = {
    CREATE_BOARD: {
        type: typeof CREATE_BOARD,
        id: number,
        title: string,
        isPrivate: boolean,
        lists: IList[],
        tags: ITag[],
    },
    REMOVE_BOARD: {
        type: typeof REMOVE_BOARD,
    },
}

export const actionCreators = {
    createBoard: (id: number, title: string, isPrivate: boolean, lists: IList[], tags: ITag[]): 
    Actions[typeof CREATE_BOARD] => ({
        type: CREATE_BOARD,
        id,
        title,
        isPrivate,
        lists,
        tags,
    }),
    removeBoard: (index: number): Actions[typeof REMOVE_BOARD] => ({
        type: REMOVE_BOARD,
    }),
}
