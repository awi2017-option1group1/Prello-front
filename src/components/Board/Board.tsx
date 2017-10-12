import * as React from 'react'
import { Button } from 'semantic-ui-react'

import { StateProps } from '../StateProps'

import SplitHeader from '../common/SplitHeader'
import Spinner from '../common/Spinner'

import { IBoard } from '../../redux/boards/types'
import { IList } from '../../redux/lists/types'
import TasksList from '../TasksList'
import EditableTitle from '../common/EditableTitle'

import './board.css'

export interface BoardProps extends StateProps {
    board: IBoard

    create: (id: number, title: string, isPrivate: boolean, lists: IList[]) => void
    delete: (index: number) => void
    setTitle: () => void
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
                {props.board.lists.map(list => <TasksList list={list} key={list.id} />)} 
            </section>
        </section>
    )
}

export default Board
