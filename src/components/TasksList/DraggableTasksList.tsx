import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import TasksList, { TasksListProps } from './TasksList'

import './draggable-tasks-list.css'

const DraggableTasksList: React.StatelessComponent<TasksListProps> = (props) => (
    <Draggable draggableId={`draggable-list-${props.list.id}`} type="TASKS_LIST">
        {(provided, snapshot) => (
            <div className="draggable-tasks-list">
                <div 
                    ref={provided.innerRef} 
                    {...provided.dragHandleProps} 
                    style={provided.draggableStyle}
                >
                    <TasksList {...props} />
                </div>
                {provided.placeholder}
            </div>
        )}
    </Draggable>
)

export default DraggableTasksList
