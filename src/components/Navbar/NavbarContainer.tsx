import { connect } from 'react-redux'

import { RootState } from '../../redux/RootReducer'
import Navbar from './Navbar'

const mapStateToProps = (state: RootState) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        authenticatedUser: state.auth.user
    }
}

const NavbarContainer = connect(
    mapStateToProps
)(Navbar)

export default NavbarContainer
