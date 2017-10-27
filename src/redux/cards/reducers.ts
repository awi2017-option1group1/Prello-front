import { CREATE_CARD, REMOVE_CARD, FETCH_CARD_SUCCESS } from './actions'
import { RootAction } from '../RootAction'
import { ICard } from '../cards/types'

/* import { ITag } from '../tags/types'
import { IAttachment } from '../attachments/types'
import { IComment } from '../comments/types'
import { ITasksList } from '../taskLists/types'
import { IUser } from '../users/types' */

export type State = {
    id: number,
    card: ICard | null
    /* 
    name: string,
    desc: string, 
    due: string,
    dueComplete: string,
    pos: number,
    tags: ITag[],
    members: IUser[],
    tasksList: ITasksList[],
    comments: IComment[],
    attachments: IAttachment[],*/
}

const defaultValue: State = {
    id: -1,
    card: null
    /* name: '',
    desc: '',
    due: '',
    dueComplete: '',
    pos: -1,
    members: [],
    tags: [],
    tasksList: [],
    comments: [],
    attachments: [],*/
}
export const reducer = (state: State = defaultValue, action: RootAction) => {
        switch (action.type) {
            case CREATE_CARD:
                return {
                    card: action.card
                    /* name: action.name,
                    desc: action.desc, 
                    due: action.due,
                    dueComplete: action.dueComplete,
                    pos: action.pos,
                    tags: action.tags,
                    members: action.members,
                    tasksList: action.tasksList,
                    comments: action.comments,
                    attachments: action.attachments, */
                }

            case FETCH_CARD_SUCCESS:
                return {
                    card: action.card
                }

            case REMOVE_CARD:
                return null

            default:
                return state
    }
}
