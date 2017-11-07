import * as React from 'react'

import { ILoggedUser } from '../../redux/users/types'

import LoggedNavbar from './LoggedNavbar/LoggedNavbar'
import NormalNavbar from './NormalNavbar/NormalNavbar'

import './Navbar.css'

class NavbarProps {
    isAuthenticated: boolean | null
    authenticatedUser: ILoggedUser | null
}

const Navbar: React.StatelessComponent<NavbarProps> = (props) => {
    if (props.isAuthenticated === null) {
        return null
    }
    
    if (props.isAuthenticated) {
        return <LoggedNavbar user={props.authenticatedUser!} />
    } else {
        return <NormalNavbar />
    }
}

export default Navbar
