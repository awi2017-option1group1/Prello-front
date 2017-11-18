import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'

import randColor from '../../helpers/randColor'

import { actionCreators } from '../../redux/cards/actions'
import { actionCreators as deleteActionCreator } from '../../redux/cards/actions/delete'
import { actionCreators as assigneesCreator } from '../../redux/cards/AssignedUsers/actions'
import { actionCreators as cardLabelActionCreator } from '../../redux/tags/cardsTags/actions'
import { actionCreators as checkListActionCreator } from '../../redux/checkLists/actions'

import { IBoard } from '../../redux/boards/types'
import { ITag } from '../../redux/tags/types'
import { ICard } from '../../redux/cards/types'
import { IUser } from '../../redux/users/types'
import { ICheckList } from '../../redux/checkLists/types'

import CardModal from './CardModal'

interface CardModalContainerProps {
    board: IBoard
    card: ICard
    boardAssignees: IUser[]
    onClose: () => void
}

interface PropsFromState {
    card: ICard
    boardLabels: ITag[]
    boardAssignees: IUser[]
    labels: ITag[]
    assignees: IUser[]
    checkLists: ICheckList[]
}

interface PropsFromDispatch {
    onClose: () => void

    updateCard: (card: Partial<ICard>) => void
    deleteCard: () => void

    assignLabel: (label: ITag) => void
    createAndAssignLabel: (name: string) => void
    removeLabel: (label: ITag) => void

    assignUser: (user: IUser) => void
    removeUser: (user: IUser) => void
    addCheckList: () => void
}

const mapStateToProps = (state: RootState,  ownProps: CardModalContainerProps) => {
    return {
        card: ownProps.card,
        boardLabels: state.boardLabel.labels,
        labels: state.cardsLabel[ownProps.card.id].labels,
        boardAssignees: ownProps.boardAssignees, // TODO: Fetch from state
        assignees: state.assignees[ownProps.card.id].assignees,
        checkLists: state.checkLists.checkLists
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: CardModalContainerProps) => {
    return {
        onClose: ownProps.onClose,

        updateCard: (card: Partial<ICard>) => {
            dispatch(actionCreators.updateCard(ownProps.card, card))
        },

        deleteCard: () => {
            dispatch(deleteActionCreator.deleteCard(ownProps.card))
        },

        assignLabel: (label: ITag) => {
            dispatch(cardLabelActionCreator.assignLabel(ownProps.card.id, label))
        },

        createAndAssignLabel: (name: string) => {
            dispatch(cardLabelActionCreator.createAndAssignLabel(
                ownProps.board.id,
                ownProps.card.id,
                {
                    name,
                    color: randColor()
                }
            ))
        },

        removeLabel: (label: ITag) => {
            dispatch(cardLabelActionCreator.unassignLabel(ownProps.card.id, label))
        },

        assignUser: (user: IUser) => {
            dispatch(assigneesCreator.assignUser(ownProps.card.id, user))
        },

        removeUser: (user: IUser) => {
            dispatch(assigneesCreator.unassignUser(ownProps.card.id, user))
        },

        addCheckList: () => {
            dispatch(checkListActionCreator.createCheckListFromCardId(ownProps.card.id))
        },
    }
}

const CardsListContainer = connect<PropsFromState, PropsFromDispatch, CardModalContainerProps>(
    mapStateToProps,
    mapDispatchToProps
)(CardModal)

export default CardsListContainer
