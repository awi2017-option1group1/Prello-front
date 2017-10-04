import * as React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'

import Board, { BoardProps } from './Board'

const DnDContextBoard = (props: BoardProps) => {
    return (
        <DragDropContext onDragEnd={() => null}>
            <Board {...props} />
        </DragDropContext>
    )
}

export default DnDContextBoard
