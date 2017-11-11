import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/tags/cardsTags/actions'

import { ICard } from '../../redux/cards/types'
import { ITag } from '../../redux/tags/types'

import Card from './DraggableCard'

interface CardContainerProps {
    card: ICard
    onClick: () => void
}

interface PropsFromState {
    labels: ITag[]
}

interface PropsFromDispatch {
    loadData?: () => void
}

const mapStateToProps = (state: RootState, ownProps: CardContainerProps) => {
    if (ownProps.card.id) {
        return {
            labels: state.cardsLabel[ownProps.card.id].labels
        }
    } else {
        return {
            labels: []
        }
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: CardContainerProps) => {
    return {
        loadData: () => {
            if (ownProps.card.id) {
                dispatch(actionCreators.fetchCardLabels(ownProps.card.id))
            }
        }
    }
}

const CardContainer = connect<PropsFromState, PropsFromDispatch, CardContainerProps>(
    mapStateToProps,
    mapDispatchToProps
)(Card)

export default CardContainer
