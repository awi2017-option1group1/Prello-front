import * as React from 'react'
import { shallow } from 'enzyme'

import Footer from './Footer'

describe('<Footer />', () => {
    it('should display a footer', () => {
        const footer = shallow(<Footer />)
        expect(footer.find('footer').length).toBe(1)
    })
})
