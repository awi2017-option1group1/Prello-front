import * as React from 'react'
import { Droppable } from 'react-beautiful-dnd'

import TasksLists, { TasksListsProps } from './TasksLists'

import './tasks-lists.css'

const DroppableTasksLists: React.StatelessComponent<TasksListsProps> = (props) => (
    <Droppable droppableId={'droppable-board'} type="TASKS_LIST" direction="horizontal">
        {(provided, snapshot) => (
            <div ref={provided.innerRef} className="droppable-board">
                <TasksLists {...props} />
                {provided.placeholder}
            </div>
        )}
    </Droppable>
)

export default DroppableTasksLists
