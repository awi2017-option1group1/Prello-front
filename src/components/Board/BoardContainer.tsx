import { withRouter } from 'react-router'
import { push } from 'react-router-redux'
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
import { IUser, ILoggedUser } from '../../redux/users/types'

import Board from './DnDContextBoard'

import { wsClient } from '../../services/websockets'

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
    assignees: IUser[]
    connectedUser: ILoggedUser
    listToAppendCard: IList | null
    openedCard: ICard | null
    error?: string | null
    loading?: boolean
}

interface PropsFromDispatch {
    loadData?: () => void
    closeBoard: () => void
    setTitle: (title: string) => void
    addList: () => void
    saveCard: (name: string, desc: string) => void
    closeCreateCard: () => void
    closeCard: () => void
    createLabel: () => void
    updateLabel: (label: ITag, newValues: Partial<ITag>) => void
    deleteLabel: (label: ITag) => void
    addUser: (username: String) => void
    removeUser: (user: IUser) => void
    onDragEnd: (result: DropResult) => void
    deleteBoard: (board: IBoard) => void
}

const mapStateToProps = (state: RootState) => {
    return {
        board: state.board.board,
        labels: state.boardLabel.labels,
        assignees: state.board.users,
        listToAppendCard: state.board.listToAppendCard,
        openedCard: state.card,
        error: state.board.error,
        loading: state.board.isProcessing,
        connectedUser: state.auth.user!,
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: BoardContainerProps) => {
    return {
        loadData: () => {       
            dispatch(boardsActionsCreators.fetchBoard(Number(ownProps.match.params.id)))
            dispatch(labelsActionCreators.fetchBoardLabels(Number(ownProps.match.params.id)))
            wsClient.emitOnReady('request-connection', { object: 'board', id: ownProps.match.params.id })
        },

        closeBoard: () => {
            wsClient.emit('remove-connection', { object: 'board', id: ownProps.match.params.id })
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
            dispatch(push(`/boards/${ownProps.match.params.id}`))
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

        addUser: (username: String) => {
            dispatch(boardsActionsCreators.addUser(Number(ownProps.match.params.id), username))
        },

        removeUser: (user: IUser) => {
            dispatch(boardsActionsCreators.removeUser(Number(ownProps.match.params.id), user))
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
        },

        deleteBoard: (board: IBoard) => {
            dispatch(boardsActionsCreators.deleteBoard(board))
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
