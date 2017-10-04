import * as React from 'react'
import { Button } from 'semantic-ui-react'

import { StateProps } from '../StateProps'

import SplitHeader from '../common/SplitHeader'
import Spinner from '../common/Spinner'

import BoardModel from '../../models/Board'
import TasksList from '../TasksList'
import EditableTitle from '../common/EditableTitle'

import './board.css'

export interface BoardProps extends StateProps {
    board: BoardModel

    setTitle: (title: string) => void
}

const Board: React.StatelessComponent<BoardProps> = (props) => {
    if (props.loading) {
        return <Spinner />
    }

    return (
        <section id="board">
            <SplitHeader>
                <EditableTitle type="h1" content={props.board.title} onSubmit={props.setTitle} />
                <Button content="Add column" icon="plus" labelPosition="left" primary={true} circular={true} />
            </SplitHeader>
            <section id="task-lists" className="task-lists">
                {props.board.lists.map(id => <TasksList id={id} key={id} />)}
            </section>
        </section>
    )
}

export default Board
