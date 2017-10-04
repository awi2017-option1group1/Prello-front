import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import Card, { CardProps } from './Card'

import './draggable-card.css'

const DraggableCard: React.StatelessComponent<CardProps> = (props) => (
    <Draggable draggableId={`draggable-${props.id}`} type="CARD">
        {(provided, snapshot) => (
            <div>
                <div 
                    ref={provided.innerRef} 
                    {...provided.dragHandleProps} 
                    style={provided.draggableStyle} 
                    className={`draggable-card ${snapshot.isDragging ? 'dragged' : ''}`}
                >
                    <Card {...props} />
                </div>
                {provided.placeholder}
            </div>
        )}
    </Draggable>
)

export default DraggableCard
