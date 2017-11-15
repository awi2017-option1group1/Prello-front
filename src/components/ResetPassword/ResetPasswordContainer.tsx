import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/resetPassword/actions'

import ResetPassword from './ResetPassword'

import { FormErrors } from '../../redux/forms'

interface ResetContainerProps {
    match: {
        params: {
            userID: string,
            uuidToken: string,
        }
    }
}

interface PropsFromState {
    errors?: FormErrors
    isProcessing: boolean
}

interface PropsFromDispatch {
   changePassword: (password: string) => void
}

const mapStateToProps = (state: RootState) => {
    return {
        isProcessing: state.resetPass.isProcessing,
        errors: state.resetPass.errors // TODO
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: ResetContainerProps) => {
    return {
        changePassword: (password: string) => {
            dispatch(actionCreators.resetPassword(  password, 
                                                    Number(ownProps.match.params.userID), 
                                                    ownProps.match.params.uuidToken))
        }
    }
}

const ResetPasswordContainer = withRouter(
    connect<PropsFromState, PropsFromDispatch, {}>(
        mapStateToProps,
        mapDispatchToProps
    )(ResetPassword)
)

export default ResetPasswordContainer
