import { connect } from 'react-redux'

import LogoutPage from './LogoutPage'
import { actionCreators } from '../../redux/auth/actions'
import { Dispatch } from '../../redux/RootReducer'

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        logout: () => {
            dispatch(actionCreators.logout())
        }
    }
}

const LogoutPageContainer = connect(
    null,
    mapDispatchToProps
)(LogoutPage)

export default LogoutPageContainer
