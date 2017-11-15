import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/resetPassword/actions'

import ResetPasswordEmail from './ResetPasswordEmail'

const mapStateToProps = (state: RootState) => {
    return {
        isProcessing: state.register.isProcessing,
        errors: state.register.errors
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        sendMail: (email: string) => {
            dispatch(actionCreators.sendMail(email))
        },

        redirect: () => {
            dispatch(push('/'))
        }
    }
}

const ResetPasswordEmailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPasswordEmail)

export default ResetPasswordEmailContainer
