import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { RootState, Dispatch } from '../../redux/RootReducer'

import randColor from '../../helpers/randColor'

import { actionCreators } from '../../redux/cards/actions'
import { actionCreators as deleteActionCreator } from '../../redux/cards/actions/delete'
import { actionCreators as cardLabelActionCreator } from '../../redux/tags/cardsTags/actions'

import { IBoard } from '../../redux/boards/types'
import { ITag } from '../../redux/tags/types'
import { ICard } from '../../redux/cards/types'

import CardModal from './CardModal'

interface CardModalContainerProps {
    board: IBoard
    card: ICard    
    onClose: () => void
}

interface PropsFromState {
    card: ICard
    boardLabels: ITag[]
    labels: ITag[]
}

interface PropsFromDispatch {
    onClose: () => void

    updateCard: (card: Partial<ICard>) => void
    deleteCard: () => void

    assignLabel: (label: ITag) => void
    createAndAssignLabel: (name: string) => void
    removeLabel: (label: ITag) => void
}

const mapStateToProps = (state: RootState,  ownProps: CardModalContainerProps) => {
    return {
        card: ownProps.card,
        boardLabels: state.boardLabel.labels,
        labels: state.cardsLabel[ownProps.card.id].labels
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
        }
    }
}

const CardsListContainer = withRouter(
    connect<PropsFromState, PropsFromDispatch, CardModalContainerProps>(
        mapStateToProps,
        mapDispatchToProps
    )(CardModal)
)

export default CardsListContainer
