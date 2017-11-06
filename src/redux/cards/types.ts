import { IAttachment } from '../attachments/types'
import { IComment } from '../comments/types'
import { ITasksList } from '../taskLists/types'
import { ITag } from '../tags/types'
import { IUser } from '../users/types'

export type ICard = {
    id: number,
    name: string,
    desc: string, 
    due: Date,
    dueComplete: Date,
    pos: number,
    tags: ITag[],
    members: IUser[],
    tasksList: ITasksList[],
    comments: IComment[],
    attachments: IAttachment[],
    listId: number
}
