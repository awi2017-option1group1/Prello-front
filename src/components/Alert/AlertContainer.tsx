import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/ui/actions'

import { IAlert } from '../../redux/ui/types'

import Alert from './Alert'

interface PropsFromState {
    alert: IAlert
}

interface PropsFromDispatch {
    hideAlertMessage: () => void
}

const mapStateToProps = (state: RootState) => {
    return {
        alert: state.ui.alert 
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        hideAlertMessage: () => { 
            dispatch(actionCreators.hideAlertMessage())
        }
    }
}

const AlertContainer = connect<PropsFromState, PropsFromDispatch>(
    mapStateToProps,
    mapDispatchToProps
)(Alert)

export default AlertContainer
