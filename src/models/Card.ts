import Label from './Label'
import User from './User'
import TasksList from './TasksList'
import Comment from './Comment'
import Attachment from './Attachment'

export default interface Card {
    name: string,
    desc: string, 
    due: Date,
    dueComplete: Date,
    pos: number,
    tags: Label[],
    members: User,
    tasksList: TasksList[],
    comments: Comment[],
    attachments: Attachment[],
}
