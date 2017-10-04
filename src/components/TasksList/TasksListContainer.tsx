import * as React from 'react'
import { setTimeout } from 'timers'

import { StateProps } from '../StateProps'

import TasksList from './TasksList'
import ListModel from '../../models/List'

interface TasksListContainerProps {
    id: number
}

interface TasksListContainerState extends StateProps {
    list: ListModel | null
}

class TasksListContainer extends React.Component<TasksListContainerProps, TasksListContainerState> {
    constructor(props: TasksListContainerProps) {
        super(props)
        this.state = {
            loading: true,
            list: null
        }

        this.setTitle = this.setTitle.bind(this)
    }

    componentWillMount() {
        // Fetch
        setTimeout(
            () => {
                this.setState({
                    loading: false,
                    list: {
                        title: 'Hello',
                        cards: Array.from(Array(Math.floor(Math.random() * 9)).keys())
                    }
                })
            }, 
            Math.random() * 10 + 130)
    }

    setTitle(title: string) {
        this.setState({
            list: Object.assign({}, this.state.list, { title })
        })
    }

    render() {
        return (
            <TasksList 
                error={this.state.error} 
                loading={this.state.loading}
                id={this.props.id} 
                list={this.state.list!} 
                setTitle={this.setTitle} 
            />
        )
    }
}

export default TasksListContainer
