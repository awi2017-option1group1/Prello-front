import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/ui/actions'

import { IAlert } from '../../redux/ui/types'

import Layout from './Layout'

interface LayoutContainerProps {
    children: React.ReactNode
}

interface PropsFromState {
    children: React.ReactNode,
    alert: IAlert
}

interface PropsFromDispatch {
    hideAlertMessage: () => void
}

const mapStateToProps = (state: RootState,  ownProps: LayoutContainerProps) => {
    return {
        children: ownProps.children,
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

const CardsListContainer = connect<PropsFromState, PropsFromDispatch, LayoutContainerProps>(
    mapStateToProps,
    mapDispatchToProps
)(Layout)

export default CardsListContainer
