import { IAttachment } from '../attachments/types'
import { IComment } from '../comments/types'
import { ITasksList } from '../taskLists/types'
import { ITag } from '../tags/types'
import { ICard } from '../cards/types'

export const LIST_SUCCESS = 'LIST_SUCCESS'
export const LIST_ERROR = 'LIST_ERROR'

export const ADD_ELEMENT_LIST = 'ADD_ELEMENT_LIST'
export const ADD_ELEMENT_LIST_SUCCESS = 'ADD_ELEMENT_LIST_SUCCESS'

export const REMOVE_ELEMENT_LIST = 'REMOVE_ELEMENT_LIST'
export const REMOVE_ELEMENT_LIST_SUCCESS = 'REMOVE_ELEMENT_LIST_SUCCESS'

export const UPDATE_INFORMATIONS_LIST = 'UPDATE_INFORMATIONS_LIST'

export const CREATE_LIST = 'CREATE_LIST'
export const REMOVE_LIST = 'REMOVE_LIST'

export type Actions = {

    LIST_SUCCESS: {
        type: typeof LIST_SUCCESS,
        message: string,
    },
    LIST_ERROR: {
        type: typeof LIST_ERROR,
        error: string,
    },

    CREATE_LIST: {
        type: typeof CREATE_LIST,
        title: string, 
        rank: number,
        cards: ICard[],
    },

    ADD_ELEMENT_LIST: {
        type: typeof ADD_ELEMENT_LIST,
        id: number,
        description: string, 
        dueTime: Date,
        attachments: IAttachment[],
        comments: IComment[],
        tasksLists: ITasksList[],
        tags: ITag[],
    },
    ADD_ELEMENT_LIST_SUCCESS: {
        type: typeof ADD_ELEMENT_LIST_SUCCESS,
        id: number,
        description: string, 
        dueTime: Date,
        attachments: IAttachment[],
        comments: IComment[],
        tasksLists: ITasksList[],
        tags: ITag[],
    },

    REMOVE_ELEMENT_LIST: {
        type: typeof REMOVE_ELEMENT_LIST,
        index: number,
    },
    REMOVE_ELEMENT_LIST_SUCCESS: {
        type: typeof REMOVE_ELEMENT_LIST_SUCCESS,
        id: number,
        title: string, 
        rank: number,
        cards: ICard[],
    },

    UPDATE_INFORMATIONS_LIST: {
        type: typeof UPDATE_INFORMATIONS_LIST,
        title: string, 
        rank: number,
        cards: ICard[],
    },

}

export const actionCreators = {
    createList: (title: string, rank: number, cards: ICard[]): Actions[typeof CREATE_LIST] => ({
        type: CREATE_LIST,
        title,
        rank,
        cards,
    }),
    UpdateInformationsList: (   title: string, 
                                rank: number, 
                                cards: ICard[]): Actions[typeof UPDATE_INFORMATIONS_LIST] => ({
        type: UPDATE_INFORMATIONS_LIST,
        title,
        rank,
        cards
    }),
    removeElementFromList: (index: number): Actions[typeof REMOVE_ELEMENT_LIST] => ({
        type: REMOVE_ELEMENT_LIST,
        index,
    }),
}
