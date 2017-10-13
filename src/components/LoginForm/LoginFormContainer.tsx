import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/auth/actions'
import LoginForm from './LoginForm'

const mapStateToProps = (state: RootState) => {
    return {
        isProcessing: state.login.isProcessing,
        error: state.login.error
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        login: (email: string, password: string) => {
            dispatch(actionCreators.login(email, password))
        }
    }
}

const LoginFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm)

export default LoginFormContainer
