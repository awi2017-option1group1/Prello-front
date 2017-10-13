export const ADD_LIST = 'ADD_LIST'
export const REMOVE_LIST = 'REMOVE_LIST'

export type Actions = {
    ADD_LIST: {
        type: typeof ADD_LIST,
        id: number,
        title: string,
        rank: string,
    },
    REMOVE_LIST: {
        type: typeof REMOVE_LIST,
        index: number,
    },
}

export const actionCreators = {
    addList: (id: number, title: string, rank: string): Actions[typeof ADD_LIST] => ({
        type: ADD_LIST,
        id,
        title,
        rank,
    }),
    remove: (index: number): Actions[typeof REMOVE_LIST] => ({
        type: REMOVE_LIST,
        index,
    }),
}
