// import * as React from 'react'
// import { shallow } from 'enzyme'

// import TasksList from './TasksList'
// import Spinner from '../common/Spinner'
// import SplitHeader from '../common/SplitHeader'
// import CardsList from '../CardsList'
// import EditableTitle from '../common/EditableTitle'

// const tasksListType = {
//     title: 'Test',
//     cards: []
// }

// describe('<TasksList />', () => {
//     it('should display a Spinner while loading', () => {
//         const tasksList = shallow(
//             <TasksList 
//                 loading={true}
//                 id={1}
//                 error={undefined}
//                 list={tasksListType}
//                 setTitle={() => null} 
//             />
//         )
//         expect(tasksList.find(Spinner).length).toBe(1)
//         expect(tasksList.find(SplitHeader).length).toBe(0)
//         expect(tasksList.find(CardsList).length).toBe(0)
//     }) 
    
//     it('should display a TasksList', () => {
//         const tasksList = shallow(
//             <TasksList 
//                 loading={false}
//                 id={1}
//                 error={undefined}
//                 list={tasksListType}
//                 setTitle={() => null} 
//             />
//         )
//         expect(tasksList.find(Spinner).length).toBe(0)
//         expect(tasksList.find(SplitHeader).length).toBe(1)
//         expect(tasksList.find(CardsList).length).toBe(1)
//         expect(tasksList.find(EditableTitle).props().content).toBe('Test')
//     })     
// })
