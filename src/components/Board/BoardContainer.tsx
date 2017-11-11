import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { DropResult } from 'react-beautiful-dnd'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators as boardsActionsCreators } from '../../redux/boards/actions'
import { actionCreators as listsActionCreators } from '../../redux/lists/actions'
import { actionCreators as cardsActionCreators } from '../../redux/cards/actions'
import { actionCreators as labelsActionCreators } from '../../redux/tags/boardTags/actions'

import randColor from '../../helpers/randColor'

import { IBoard } from '../../redux/boards/types'
import { IList } from '../../redux/lists/types'
import { ICard } from '../../redux/cards/types'
import { ITag } from '../../redux/tags/types'

import Board from './DnDContextBoard'

interface BoardContainerProps {
    match: {
        params: {
            id: string
        }
    }
}

interface PropsFromState {
    board: IBoard
    labels: ITag[]
    listToAppendCard: IList | null
    openedCard: ICard | null
    error?: string | null
    loading?: boolean
}

interface PropsFromDispatch {
    loadData?: () => void
    setTitle: (title: string) => void
    addList: () => void
    saveCard: (name: string, desc: string) => void
    closeCreateCard: () => void
    closeCard: () => void
    createLabel: () => void
    updateLabel: (label: ITag, newValues: Partial<ITag>) => void
    deleteLabel: (label: ITag) => void
    onDragEnd: (result: DropResult) => void
}

const mapStateToProps = (state: RootState) => {
    return {
        board: state.board.board,
        labels: state.boardLabel.labels,
        listToAppendCard: state.board.listToAppendCard,
        openedCard: state.card,
        error: state.board.error,
        loading: state.board.isProcessing,
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: BoardContainerProps) => {
    return {
        loadData: () => { 
            dispatch(boardsActionsCreators.fetchBoard(Number(ownProps.match.params.id)))
            dispatch(labelsActionCreators.fetchBoardLabels(Number(ownProps.match.params.id)))
        },

        setTitle: (title: string) => {
            dispatch(boardsActionsCreators.updateBoardTitle(Number(ownProps.match.params.id), { name: title }))
        },

        addList: () => {
            dispatch(listsActionCreators.createBoardList(Number(ownProps.match.params.id)))
        },

        saveCard: (name: string, desc: string) => {
            dispatch(cardsActionCreators.createCard({ name, desc }))
            dispatch(boardsActionsCreators.closeCreateCardModal())
        },

        closeCreateCard: () => {
            dispatch(boardsActionsCreators.closeCreateCardModal())
        },

        closeCard: () => {
            dispatch(cardsActionCreators.closeCard())
        },

        createLabel: () => {
            dispatch(labelsActionCreators.createLabel(Number(ownProps.match.params.id), {
                name: 'EmptyName',
                color: randColor()
            }))
        },

        updateLabel: (label: ITag, newValues: Partial<ITag>) => {
            dispatch(labelsActionCreators.updateLabel(label, newValues))
        },
        
        deleteLabel: (label: ITag) => {
            dispatch(labelsActionCreators.deleteLabel(label))
        },

        onDragEnd: (result: DropResult) => {
            if (!result.destination) {
                return
            }

            switch (result.type) {
                case 'TASKS_LIST':
                    dispatch(
                        listsActionCreators.moveBoardList(result.source.index, result.destination!.index)
                    )
                    break

                case 'CARD':
                    const cardId = result.draggableId.substring('draggable-card-'.length)
                    const sourceList = result.source.droppableId.substring('droppable-card-'.length)
                    const destinationList = result.destination!.droppableId.substring('droppable-card-'.length)
                    dispatch(
                        cardsActionCreators.moveCard(
                            Number(cardId),
                            Number(sourceList),
                            result.source.index,
                            Number(destinationList), 
                            result.destination!.index
                        )
                    )
                    break

                default:
                    break
            }
        }
    }
}

const BoardContainer = withRouter(
    connect<PropsFromState, PropsFromDispatch, {}>(
        mapStateToProps,
        mapDispatchToProps
    )(Board)
)

export default BoardContainer
