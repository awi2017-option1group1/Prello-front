import { IAttachment } from '../attachments/types'
import { IComment } from '../comments/types'
import { ITasksList } from '../taskLists/types'
import { ITag } from '../tags/types'

export type ICard = {
    id: number,
    description: string, 
    dueTime: Date,
    attachments: IAttachment[],
    comments: IComment[],
    tasksLists: ITasksList[],
    tags: ITag[]
}
