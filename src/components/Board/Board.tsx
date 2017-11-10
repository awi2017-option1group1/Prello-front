import * as React from 'react'
import { Button } from 'semantic-ui-react'

import { IBoard } from '../../redux/boards/types'
import { IList } from '../../redux/lists/types'
import { ICard } from '../../redux/cards/types'

import { StateProps } from '../StateProps'

import SplitHeader from '../common/SplitHeader'
import CardModal from '../CardModal'
import CreateCardModal from '../CreateCardModal'
import Spinner from '../common/Spinner'
import EditableTitle from '../common/EditableTitle'
import TasksLists from '../TasksLists'
import PageNotFound from '../../routes/PageNotFound'

import './board.css'

export interface BoardProps extends StateProps {
    board: IBoard
    listToAppendCard: IList | null
    openedCard: ICard | null

    setTitle: (title: string) => void
    addList: () => void
    saveCard: (name: string) => void
    closeCreateCard: () => void
    closeCard: () => void
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
                    <Button 
                        content="Add column" 
                        icon="plus" 
                        labelPosition="left" 
                        primary={true} 
                        circular={true} 
                        onClick={this.props.addList} 
                    />
                </SplitHeader>
                <TasksLists boardId={this.props.board.id} />
                <CreateCardModal 
                    isOpen={this.props.listToAppendCard != null} 
                    listName={this.props.listToAppendCard ? this.props.listToAppendCard!.name : ''}
                    save={this.props.saveCard} 
                    cancel={this.props.closeCreateCard} 
                />
                {this.props.openedCard !== null && 
                    <CardModal onClose={this.props.closeCard} card={this.props.openedCard} deleteCard={() => null} />
                }
            </section>
        )
    }
}

export default Board
