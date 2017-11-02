import * as React from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import Board, { BoardProps } from './Board'

interface DnDProps {
    onDragEnd: (result: DropResult) => void
}

const DnDContextBoard = (props: BoardProps & DnDProps) => {
    return (
        <DragDropContext onDragEnd={props.onDragEnd}>
            <Board {...props} />
        </DragDropContext>
    )
}

export default DnDContextBoard
