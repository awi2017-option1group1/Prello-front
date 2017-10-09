import * as React from 'react'
import { shallow } from 'enzyme'

import { Segment } from 'semantic-ui-react'

import ErrorSegment from './ErrorSegment'

describe('<ErrorSegment />', () => {
    it('should display the error if it is defined', () => {
        const errorSegment = shallow(<ErrorSegment error="Test Error" />)
        const segment = errorSegment.find(Segment)
        expect(segment.length).toBe(1)
        expect(segment.contains('Test Error')).toBe(true)
    })

    it('should not display the error if it is not defined', () => {
        const errorSegment = shallow(<ErrorSegment error={null} />)
        expect(errorSegment.find(Segment).length).toBe(0)
    })
})
