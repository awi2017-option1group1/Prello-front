import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators as labelActionCreators } from '../../redux/tags/cardsTags/actions'
import { actionCreators as assignedActionCreators } from '../../redux/cards/AssignedUsers/actions/fetchAll'

import { ITag } from '../../redux/tags/types'
import { ICard } from '../../redux/cards/types'
import { IUser } from '../../redux/users/types'

import Card from './DraggableCard'

interface CardContainerProps {
    card: ICard
    onClick: () => void
}

interface PropsFromState {
    labels: ITag[]
    assignees: IUser[]
}

interface PropsFromDispatch {
    loadData?: () => void
}

const mapStateToProps = (state: RootState, ownProps: CardContainerProps) => {
    if (ownProps.card.id) {
        return {
            labels: state.cardsLabel[ownProps.card.id].labels,
            assignees: state.assignees[ownProps.card.id].assignees
        }
    } else {
        return {
            labels: [],
            assignees: []
        }
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: CardContainerProps) => {
    return {
        loadData: () => {
            if (ownProps.card.id) {
                dispatch(labelActionCreators.fetchCardLabels(ownProps.card.id))
                dispatch(assignedActionCreators.fetchAssigneesList(ownProps.card.id))
            }
        }
    }
}

const CardContainer = connect<PropsFromState, PropsFromDispatch, CardContainerProps>(
    mapStateToProps,
    mapDispatchToProps
)(Card)

export default CardContainer
