import * as React from 'react'
import { shallow } from 'enzyme'

import { Loader } from 'semantic-ui-react'

import Spinner from './Spinner'

describe('<Spinner />', () => {
    it('should display a loader', () => {
        const spinner = shallow(<Spinner />)
        expect(spinner.find(Loader).length).toBe(1)
    })
})
