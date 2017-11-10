import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/users/actions'
import ConfirmationToken from './ConfirmationToken'

interface TokenContainerProps {
    match: {
        params: {
            id: string,
            uuidToken: string
        }
    }
}

interface PropsFromState {
    error?: string | null
    loading?: boolean
}

interface PropsFromDispatch {
    confirmEmail: () => void
}

const mapStateToProps = (state: RootState) => {
    return {
        user: state.user.user,
        error: state.user.error,
        loading: state.user.isProcessing
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: TokenContainerProps) => {
    return {
        confirmEmail: () => { 
            dispatch(actionCreators.confirmEmail(
                                                    Number(ownProps.match.params.id), 
                                                    ownProps.match.params.uuidToken)
                                                ) 
        },
    }
}

const ConfirmationTokenContainer = withRouter(
    connect<PropsFromState, PropsFromDispatch, {}>(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmationToken)
)
export default ConfirmationTokenContainer
