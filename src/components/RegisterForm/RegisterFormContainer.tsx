import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/register/actions'

import RegisterForm from './RegisterForm'

const mapStateToProps = (state: RootState) => {
    return {
        isProcessing: state.register.isProcessing,
        errors: state.register.errors
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        register: (email: string, username: string, password: string) => {
            dispatch(actionCreators.register(email, username, password))
        }
    }
}

const LoginFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterForm)

export default LoginFormContainer
