import * as React from 'react'
import { shallow } from 'enzyme'
import { Menu } from 'semantic-ui-react'

import LoggedNavbar from './LoggedNavbar'

describe('<LoggedNavbar />', () => {
    it('should display a menu and a sub-menu', () => {
        const loggedNavbar = shallow(<LoggedNavbar user={{ uid: 1, username: 'toto', email: 'titi@photon.fr' }} />)
        expect(loggedNavbar.find(Menu).length).toBe(2)
    })
})
