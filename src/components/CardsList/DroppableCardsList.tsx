import * as React from 'react'
import { Droppable } from 'react-beautiful-dnd'

import CardsList, { CardsListProps } from './CardsList'

const DroppableCardsList: React.StatelessComponent<CardsListProps> = (props) => (
    <Droppable droppableId={`droppable-card-${props.listId}`} type="CARD">
        {(provided, snapshot) => (
            <div ref={provided.innerRef}>
                <CardsList {...props} />
                {provided.placeholder}
            </div>
        )}
    </Droppable>
)

export default DroppableCardsList
