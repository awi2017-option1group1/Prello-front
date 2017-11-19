import * as React from 'react'
import { shallow } from 'enzyme'

import Label from './Label'
import { ITag } from '../../../redux/tags/types'

const tagTest: ITag = {
    id: 1,
    name: 'tagTest',
    color: 'red'
}

describe('<Label />', () => {
    it('should display the label', () => {
        const label = shallow(<Label label={tagTest} />)
        expect(label.text()).toBe( '<Label />' )
    })

})
