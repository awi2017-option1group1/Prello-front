import * as React from 'react'

import { IList } from '../../redux/lists/types'

import { StateProps } from '../StateProps'
import Spinner from '../common/Spinner'

import TasksList from '../TasksList'

export interface TasksListsProps extends StateProps {
    lists: IList[]
}

class TasksLists extends React.Component<TasksListsProps> {
    constructor(props: TasksListsProps) {
        super(props)
    }

    componentDidMount() {
        this.props.loadData!()
    }

    render() {
        if (this.props.loading) {
            return <Spinner />
        }
        return (
            <section id="task-lists" className="task-lists">
                {this.props.lists.map(list => <TasksList list={list} key={list.id} />)}
            </section>
        )
    }
}

export default TasksLists
