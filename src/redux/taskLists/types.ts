import { ITask } from '../tasks/types'

export type ITasksList = {
    id: number,
    title: string, 
    description: string,
    tasks: ITask[]
}
