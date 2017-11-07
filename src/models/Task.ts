import TasksList from './TasksList'

export default interface Task {
    name: string,
    state: boolean,
    taskList: TasksList
}
