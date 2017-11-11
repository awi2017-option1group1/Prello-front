import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/cards/actions'
import { ICard } from '../../redux/cards/types'

import CardModal from './CardModal'

interface CardModalContainerProps {
    card: ICard
    onClose: () => void
}

interface PropsFromState {
    card: ICard
}

interface PropsFromDispatch {
    onClose: () => void

    updateCard: (card: Partial<ICard>) => void
    deleteCard: () => void
}

const mapStateToProps = (state: RootState,  ownProps: CardModalContainerProps) => {
    return {
        card: ownProps.card
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: CardModalContainerProps) => {
    return {
        onClose: ownProps.onClose,

        updateCard: (card: Partial<ICard>) => {
            dispatch(actionCreators.updateCard(ownProps.card, card))
        },

        deleteCard: () => {
            dispatch(actionCreators.deleteCard(ownProps.card))
        }
    }
}

const CardsListContainer = connect<PropsFromState, PropsFromDispatch, CardModalContainerProps>(
    mapStateToProps,
    mapDispatchToProps
)(CardModal)

export default CardsListContainer
