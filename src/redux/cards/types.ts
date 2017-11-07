import { IAttachment } from '../attachments/types'
import { IComment } from '../comments/types'
import { ICheckList } from '../checkLists/types'
import { ITag } from '../tags/types'

export type ICard = {
    id: number,
    description: string, 
    dueTime: Date,
    attachments: IAttachment[],
    comments: IComment[],
    checkLists: ICheckList[],
    tags: ITag[]
}
