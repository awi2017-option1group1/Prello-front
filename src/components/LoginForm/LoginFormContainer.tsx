import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'

import { actionCreators } from '../../redux/Login/actions'
import LoginForm, { LoginFormProps } from './LoginForm'

const mapStateToProps: MapStateToProps<{}, {}> = (state, ownProps) => {
  return {}
}

const mapDispatchToProps: MapDispatchToProps<LoginFormProps, {}> = (dispatch, ownProps) => {
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
