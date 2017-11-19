import * as React from 'react'
import { shallow } from 'enzyme'

import { Label } from 'semantic-ui-react'

import LabelsList from './LabelsList'
import { ITag } from '../../../redux/tags/types'

const testLabels: ITag[] = [
    {
        id: 1,
        name: '1',
        color: 'red'
    },
    {
        id: 1,
        name: '2',
        color: 'blue'
    },
    {
        id: 1,
        name: '3',
        color: 'teal'
    }
]

describe('<LabelsList />', () => {

    it('should display the list without more items icon', () => {
        const labelsList = shallow(<LabelsList labels={testLabels} />)
        // expect(labelsList.find(Label).length).toBe(3)
        expect(labelsList.find(Label).children.length).toBe(1)
    })

    it('should display the list with more items icon', () => {
        const labelsList = shallow(<LabelsList labels={testLabels} maxToDisplay={2} />)
        // expect(labelsList.find(Label).length).toBe(3)
        expect(labelsList.find(Label).children.length).toBe(1)
    })

})
