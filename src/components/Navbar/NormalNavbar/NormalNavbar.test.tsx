import * as React from 'react'
import { shallow } from 'enzyme'
import { Menu } from 'semantic-ui-react'

import NormalNavbar from './NormalNavbar'

describe('<NormalNavbar />', () => {
    it('should display a menu', () => {
        const normalNavbar = shallow(<NormalNavbar />)
        expect(normalNavbar.find(Menu).length).toBe(1)
    })
})
