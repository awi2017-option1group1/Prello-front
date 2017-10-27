import TasksList from './TasksList'

export default interface Attachment {
    name: string,
    state: boolean,
    taskList: TasksList
}
