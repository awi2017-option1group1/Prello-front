import { Segment, Button } from 'semantic-ui-react'
import * as React from 'react'

import { IList } from '../../redux/lists/types'

import { StateProps } from '../StateProps'

import SplitHeader from '../common/SplitHeader'
import Spinner from '../common/Spinner'
import CardsList from '../CardsList'
import EditableTitle from '../common/EditableTitle'

import './tasks-list.css'

export interface TasksListProps extends StateProps {
    list: IList

    setTitle: (title: string) => void
}

const TasksList: React.StatelessComponent<TasksListProps> = (props) => {
    if (props.loading) {
        return (
            <Segment className="tasks-list">
                <Spinner />
            </Segment>
        )
    }

    return (
        <Segment className="tasks-list">
            <SplitHeader>
                <EditableTitle type="h2" content={props.list.name} onSubmit={props.setTitle} />
                <Button icon="ellipsis horizontal" primary={true} circular={true} />          
            </SplitHeader>

            <CardsList emptyText="No tasks yet!" cards={[]} />

            <footer>
                <Button content="Add new task" fluid={true} primary={true} circular={true} />
            </footer>
        </Segment>
    )
}

export default TasksList
