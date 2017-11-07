import * as React from 'react'
import { Button, Card } from 'semantic-ui-react'

import { IBoard } from '../../redux/boards/types'

import { StateProps } from '../StateProps'

import randColor from '../../helpers/randColor'

import Spinner from '../common/Spinner'

import './BoardsList.css'

export interface BoardsListProps extends StateProps {
    boards: IBoard[]

    addBoard: () => void
}

class BoardsList extends React.Component<BoardsListProps> {

    constructor(props: BoardsListProps) {
        super(props)
    }

    componentDidMount() {
        this.props.loadData!()
    }

    render() {
        if (this.props.loading) {
            return <Spinner />
        }
        return (
            <div>
                <Button
                    primary={true}
                    icon="plus"
                    content="Create a new board"
                    circular={true}
                    onClick={this.props.addBoard}
                />
                <section id="boards-list" className="boards-list">
                <Card.Group itemsPerRow={3}>
                    {this.props.boards.map(board =>
                        <Card
                            color={randColor()}
                            key={board.id}
                            header={board.name}
                            link={true}
                            href={'/boards/' + board.id}
                        />)}
                </Card.Group>
                </section>
            </div>
        )
    }
}

export default BoardsList