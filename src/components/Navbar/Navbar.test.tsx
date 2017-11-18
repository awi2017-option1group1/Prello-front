import * as React from 'react'
import { shallow } from 'enzyme'

import LoggedNavbar from './LoggedNavbar/LoggedNavbar'
import NormalNavbar from './NormalNavbar/NormalNavbar'

import Navbar from './Navbar'

describe('<Navbar />', () => {
    it('should display LoggedNavbar if isAuthenticated == true', () => {
        const navbar = shallow(
            <Navbar 
                isAuthenticated={true} 
                authenticatedUser={{ uid: 1, username: 'toto', email: 'titi@photon.fr', avatarColor: 'olive' }} 
            />
        )
        expect(navbar.find(LoggedNavbar).length).toBe(1)
        expect(navbar.find(NormalNavbar).length).toBe(0)
    })

    it('should display NormalNavbar if isAuthenticated == false', () => {
        const navbar = shallow(<Navbar isAuthenticated={false} authenticatedUser={null} />)
        expect(navbar.find(LoggedNavbar).length).toBe(0)
        expect(navbar.find(NormalNavbar).length).toBe(1)
    })
})
