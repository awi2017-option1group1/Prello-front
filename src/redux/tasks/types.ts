import { ITasksList } from '../taskLists/types'

export type ITask = {
    id: number,
    name: string, 
    pos: number,
    state: boolean,
    tasksList : ITasksList
}
