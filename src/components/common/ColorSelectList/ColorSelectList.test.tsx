import * as React from 'react'
import { shallow } from 'enzyme'

import { Dropdown } from 'semantic-ui-react'

import ColorSelectList from './ColorSelectList'

describe('<ColorSelectList />', () => {
    it('should display the ColorSelectList', () => {
        const colorList = shallow(<ColorSelectList value={'blue'} onSubmit={() => null} />)
        expect(colorList.find(Dropdown).length).toBe(1)
    })
})
