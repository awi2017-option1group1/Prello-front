import Card from './Card'
import Task from './Task'

export default interface Attachment {
    name: string,
    pos: number,
    card: Card,
    tasks: Task[]
}
