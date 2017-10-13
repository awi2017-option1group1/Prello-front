import * as React from 'react'
import { shallow } from 'enzyme'

import Header from './Header'

describe('<Header />', () => {
    it('should display a header', () => {
        const header = shallow(<Header />)
        expect(header.find('header').length).toBe(1)
    })
})
