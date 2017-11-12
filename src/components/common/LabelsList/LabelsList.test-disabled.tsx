// import * as React from 'react'
// import { shallow } from 'enzyme'

// import { Label, Popup } from 'semantic-ui-react'

// import LabelsList from './LabelsList'
// import LabelModel from '../../../models/Label'

// const testLabels: LabelModel[] = [
//     {
//         title: '1',
//         color: 'red'
//     },
//     {
//         title: '2',
//         color: 'blue'
//     },
//     {
//         title: '3',
//         color: 'teal'
//     }
// ]

// describe('<LabelsList />', () => {
//     it('should display the list without more items icon', () => {
//         const labelsList = shallow(<LabelsList labels={testLabels} />)
//         expect(labelsList.find(Label).length).toBe(3)
//         expect(labelsList.find(Popup).length).toBe(0)
//     })

//     it('should display the list with more items icon', () => {
//         const labelsList = shallow(<LabelsList labels={testLabels} maxToDisplay={2} />)
//         expect(labelsList.find(Label).length).toBe(3)
//         expect(labelsList.find(Popup).length).toBe(1)
//     })
// })
