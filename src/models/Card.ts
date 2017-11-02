import Label from './Label'
import User from './User'
import TasksList from './TasksList'
import Comment from './Comment'
import Attachment from './Attachment'
import List from './List'

export default interface Card {
    name: string,
    desc: string | null, 
    due: Date | null,
    dueComplete: Date | null,
    pos: number,
    tags: Label[],
    members: User[],
    list: List | null,
    tasksList: TasksList[],
    comments: Comment[],
    attachments: Attachment[],
}
