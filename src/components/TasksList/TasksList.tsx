import * as React from 'react'
import { Segment, Button, Label } from 'semantic-ui-react'

import { IList } from '../../redux/lists/types' 

import { StateProps } from '../StateProps'

import SplitHeader from '../common/SplitHeader'
import Spinner from '../common/Spinner'
import CardsList from '../CardsList'

import EditableTitle from '../common/EditableTitle'

import './tasks-list.css'

export interface TasksListProps extends StateProps {
    list: IList
    size: number

    openCreateCardModal: () => void
    setTitle: (title: string) => void
    delete: () => void
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
            <Label ribbon={true} color="olive" className="task-counter">{props.size} task(s)</Label>

            <SplitHeader>
                <EditableTitle type="h2" content={props.list.name} onSubmit={props.setTitle} />
                <Button icon="trash" primary={true} circular={true} onClick={props.delete} />          
            </SplitHeader>

            <CardsList emptyText="No tasks yet!" listId={props.list.id} />

            <footer>
                <Button 
                    content="Add new task" 
                    fluid={true} 
                    primary={true} 
                    circular={true} 
                    onClick={props.openCreateCardModal}
                />
            </footer>
        </Segment>
    )
}

export default TasksList
