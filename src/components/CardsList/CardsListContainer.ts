import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { push } from 'react-router-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/cards/actions'
import { ICard } from '../../redux/cards/types'

import CardsList from './DroppableCardsList'

interface RouterProps {
    match: {
        params: {
            id: string
        }
    }
}

interface CardsListContainerProps {
    listId: number | undefined
    emptyText: string
}

interface PropsFromState {
    cards: ICard[]
    error?: string | null
    loading?: boolean
}

interface PropsFromDispatch {
    loadData?: () => void
    open: (card: ICard) => void
}

const mapStateToProps = (state: RootState,  ownProps: CardsListContainerProps) => {
    if (ownProps.listId) {
        return {
            cards: state.cards[ownProps.listId].cards,
            error: state.cards[ownProps.listId].error,
            loading: state.cards[ownProps.listId].isProcessing,
            listId: ownProps.listId,
            emptyText: ownProps.emptyText
        }       
    } else {
        return {
            cards: [],
            error: null,
            loading: false,
            listId: ownProps.listId,
            emptyText: ownProps.emptyText
        }
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: CardsListContainerProps & RouterProps) => {
    return {
        loadData: () => { 
            if (ownProps.listId) {
                dispatch(actionCreators.fetchCardsList(ownProps.listId)) 
            }
        },

        open: (card: ICard) => {
            dispatch(actionCreators.openCard(card)) 
            dispatch(push(`/boards/${ownProps.match.params.id}/cards/${card.id}`)) 
        }
    }
}

const CardsListContainer = withRouter(
    connect<PropsFromState, PropsFromDispatch, CardsListContainerProps>(
        mapStateToProps,
        mapDispatchToProps
    )(CardsList)
)

export default CardsListContainer
