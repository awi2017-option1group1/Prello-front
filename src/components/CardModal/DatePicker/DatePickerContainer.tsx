import { connect } from 'react-redux'

import { Dispatch, RootState } from '../../../redux/RootReducer'
import { actionCreators } from '../../../redux/cards/actions'
import { ICard } from '../../../redux/cards/types'
import DatePicker from './DatePicker'
import * as moment from 'moment'

interface DatePickerContainerProps {
    card: ICard
}

interface PropsFromState {
    card: ICard
}

interface PropsFromDispatch {
    setDueDate: (date: moment.Moment) => void
}

const mapStateToProps = (state: RootState, ownProps: DatePickerContainerProps) => {
    return {
        card: ownProps.card
    }
}

const mapDispatchToProps = (dispatch: Dispatch, props: PropsFromState) => {
    return {
        setDueDate: (date: moment.Moment) => {
            dispatch(actionCreators.updateCard(props.card, {due: date.toDate()}))
        },
    }
}

const ProfileContainer = connect<PropsFromState, PropsFromDispatch, DatePickerContainerProps>(
    mapStateToProps,
    mapDispatchToProps
)(DatePicker)

export default ProfileContainer
