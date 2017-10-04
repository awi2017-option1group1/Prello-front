export const ADD_LIST = 'ADD_LIST'
export const REMOVE_LIST = 'REMOVE_LIST'

export type Actions = {
    ADD_LIST: {
        type: typeof ADD_LIST,
        id: String,
        title: String,
    },
    REMOVE_LIST: {
        type: typeof REMOVE_LIST,
        index: String,
    },
}

export const actionCreators = {
    addList: (id: String, title: String): Actions[typeof ADD_LIST] => ({
        type: ADD_LIST,
        id,
        title,
    }),
    remove: (index: String): Actions[typeof REMOVE_LIST] => ({
        type: REMOVE_LIST,
        index,
    }),
}
