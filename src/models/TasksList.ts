import Card from './Card'
import Task from './Task'

export default interface TasksList {
    name: string,
    pos: number,
    card: Card,
    tasks: Task[]
}
