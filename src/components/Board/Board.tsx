import * as React from 'react'
import { Button } from 'semantic-ui-react'

import { IBoard } from '../../redux/boards/types'

import { StateProps } from '../StateProps'

import SplitHeader from '../common/SplitHeader'
import Spinner from '../common/Spinner'
import EditableTitle from '../common/EditableTitle'
import TasksLists from '../TasksLists'
import PageNotFound from '../../routes/PageNotFound'

import './board.css'

export interface BoardProps extends StateProps {
    board: IBoard

    setTitle: (title: string) => void
}

class Board extends React.Component<BoardProps> {
    componentWillMount() {
        this.props.loadData!()
    }

    render() {
        if (this.props.loading) {
            return <Spinner />
        }

        if (this.props.error) {
            return <PageNotFound />
        }

        return (
            <section id="board">
                <SplitHeader>
                    <EditableTitle type="h1" content={this.props.board.name} onSubmit={this.props.setTitle} />
                    <Button content="Add column" icon="plus" labelPosition="left" primary={true} circular={true} />
                </SplitHeader>
                <TasksLists boardId={this.props.board.id} />
            </section>
        )
    }
}

export default Board
