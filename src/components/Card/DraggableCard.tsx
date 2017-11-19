import * as React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import Card, { CardProps } from './Card'

import './draggable-card.css'

const DraggableCard: React.StatelessComponent<CardProps> = (props) => (
    <Draggable draggableId={`draggable-card-${props.card.id}`} type="CARD">
        {(provided, snapshot) => (
            <div className="draggable-card">
                <div 
                    ref={provided.innerRef} 
                    {...provided.dragHandleProps} 
                    style={provided.draggableStyle} 
                    className={`${snapshot.isDragging ? 'dragged' : ''}`}
                >
                    <Card {...props} />
                </div>
                {provided.placeholder}
            </div>
        )}
    </Draggable>
)

export default DraggableCard
