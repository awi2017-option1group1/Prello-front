import { ITask } from '../tasks/types'

export type ITasksList = {
    id: number,
    name: string, 
    pos: number,
    cardId: number,
    tasks: ITask[]
}
