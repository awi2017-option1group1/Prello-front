import * as React from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { IBoard } from '../../redux/boards/types'
import { ILoggedUser } from '../../redux/users/types'
import { StateProps } from '../StateProps'

import randColor from '../../helpers/randColor'

import Spinner from '../common/Spinner'

import './BoardsList.css'

export interface BoardsListProps extends StateProps {
    boards: IBoard[]
    connectedUser: ILoggedUser

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

        const ownedBoards = this.props.boards.filter(b => b.owner.id ===  this.props.connectedUser.uid)
        const accessibleBoards = this.props.boards.filter(b => !ownedBoards.find(c => b === c))

        const myBoards = (ownedBoards.length !== 0) ? (
            <section id="boards-list" className="boards-list">
                <h1>My boards</h1>
                <Card.Group itemsPerRow={3}>
                    {ownedBoards.map(board => (
                        <Card
                            as={Link}
                            color={randColor()}
                            key={board.id || -1}
                            header={board.name}
                            link={false}
                            to={'/boards/' + board.id}
                        />))}
                </Card.Group>
            </section>
        ) : ''
        const otherBoards = (accessibleBoards.length !== 0) ? (
            <section id="boards-list" className="boards-list">
                <h1>Accessible boards</h1>
                <Card.Group itemsPerRow={3}>
                    {accessibleBoards.map(board => (
                        <Card
                            as={Link}
                            color={randColor()}
                            key={board.id || -1}
                            header={board.name}
                            link={false}
                            to={'/boards/' + board.id}
                        />))}
                </Card.Group>
            </section>
        ) : ''

        return (
            <div>
                <Button
                    primary={true}
                    icon="plus"
                    content="Create a new board"
                    circular={true}
                    onClick={this.props.addBoard}
                />
                {myBoards}
                {otherBoards}
            </div>
        )
    }
}

export default BoardsList
