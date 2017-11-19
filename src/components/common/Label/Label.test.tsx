import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { spy } from 'sinon'

import Label from './Label'
import { ITag } from '../../../redux/tags/types'

const tagTest : ITag = {
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
