import * as React from 'react'
import { shallow } from 'enzyme'

import { GridColumn } from 'semantic-ui-react'

import SplitHeader from './SplitHeader'

describe('<SplitHeader />', () => {
    it('should display a split in half header', () => {
        const splitHeader = shallow(<SplitHeader><div /><span /></SplitHeader>)
        expect(splitHeader.find('div').length).toBe(1)
        expect(splitHeader.find('span').length).toBe(1)
        expect(splitHeader.find(GridColumn).length).toBe(2)
    })

    it('should not display more than two children', () => {
        const splitHeader = shallow(<SplitHeader><div /><span /><p /></SplitHeader>)
        expect(splitHeader.find('div').length).toBe(1)
        expect(splitHeader.find('span').length).toBe(1)
        expect(splitHeader.find('p').length).toBe(0)
        expect(splitHeader.find(GridColumn).length).toBe(2)
    })
})
