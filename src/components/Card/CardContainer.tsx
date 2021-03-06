import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/cards/actions'
import { actionCreators as tagActionCreators } from '../../redux/tags/cardsTags/actions'
import { actionCreators as assignedActionCreators } from '../../redux/cards/AssignedUsers/actions/fetchAll'

import { ITag } from '../../redux/tags/types'
import { ICard } from '../../redux/cards/types'
import { IUser } from '../../redux/users/types'

import Card from './DraggableCard'

interface RouterProps {
    match: {
        params: {
            cardId: string
        }
    }
}

interface CardContainerProps {
    card: ICard
    onClick: () => void
}

interface PropsFromState {
    shouldBeOpen: boolean
    labels: ITag[]
    assignees: IUser[]
}

interface PropsFromDispatch {
    open: () => void
    loadData?: () => void
}

const mapStateToProps = (state: RootState, ownProps: CardContainerProps & RouterProps) => {
    if (ownProps.card.id) {
        return {
            shouldBeOpen: ownProps.card.id === Number(ownProps.match.params.cardId),
            labels: state.cardsLabel[ownProps.card.id].labels,
            assignees: state.assignees[ownProps.card.id].assignees
        }
    } else {
        return {
            shouldBeOpen: false,
            labels: [],
            assignees: []
            
        }
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: CardContainerProps) => {
    return {
        open: () => {
            if (ownProps.card.id) {
                dispatch(actionCreators.openCard(ownProps.card))
            }
        },

        loadData: () => {
            if (ownProps.card.id) {
                dispatch(tagActionCreators.fetchCardLabels(ownProps.card.id))
                dispatch(assignedActionCreators.fetchAssigneesList(ownProps.card.id))
            }
        }
    }
}

const CardContainer = withRouter(
    connect<PropsFromState, PropsFromDispatch, CardContainerProps>(
        mapStateToProps,
        mapDispatchToProps
    )(Card)
)

export default CardContainer
