import { ITask } from '../tasks/types'
import { ICard } from '../cards/types'

export type ITasksList = {
    id: number,
    name: string, 
    pos: number,
    card: ICard,
    tasks: ITask[]
}
