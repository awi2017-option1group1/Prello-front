import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/cards/actions'
import { ICard } from '../../redux/cards/types'

import CardsList from './DroppableCardsList'

interface CardsListContainerProps {
    listId: number
    emptyText: string
}

interface PropsFromState {
    cards: ICard[]
    error?: string | null
    loading?: boolean
}

interface PropsFromDispatch {
    loadData?: () => void
    select: (card: ICard) => void
}

const mapStateToProps = (state: RootState,  ownProps: CardsListContainerProps) => {
    return {
        cards: state.cards[ownProps.listId].cards,
        error: state.cards[ownProps.listId].error,
        loading: state.cards[ownProps.listId].isProcessing,
        listId: ownProps.listId,
        emptyText: ownProps.emptyText
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: CardsListContainerProps) => {
    return {
        loadData: () => { 
            dispatch(actionCreators.fetchCardsList(ownProps.listId)) 
        },

        select: (card: ICard) => {
            dispatch(actionCreators.openCard(card)) 
        }
    }
}

const CardsListContainer = connect<PropsFromState, PropsFromDispatch, CardsListContainerProps>(
    mapStateToProps,
    mapDispatchToProps
)(CardsList)

export default CardsListContainer
