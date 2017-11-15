import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { PopupHeader, PopupContent } from 'semantic-ui-react'

import Avatar from '../common/Avatar'
import AssigneesAvatar from './AssigneesAvatar'

describe('<AssigneesAvatar />', () => {
    it('should display nothing if no assignees', () => {
        const assigneesAvatar = shallow(
            <AssigneesAvatar 
                assignees={[]}
                onDelete={() => null}
            />
        )
        expect(assigneesAvatar.get(0)).toBe(null)
    })     

    it('should display the avatar of the first assignee', () => {
        const assigneesAvatar = mount(
            <AssigneesAvatar 
                assignees={[{
                    id: 1, 
                    username: 'toto', 
                    notificationEnabled: true, 
                    email: 'toto@toto.fr', 
                    password: 'toto'}
                ]}
                onDelete={() => null}
            />
        )
        expect(assigneesAvatar.find(AssigneesAvatar).length).toBe(1)
    }) 

    it('should display the name of the first assignee in the popup header', () => {
        const assigneesAvatar = shallow(
            <AssigneesAvatar 
                assignees={[{
                    id: 1, 
                    username: 'toto', 
                    notificationEnabled: true, 
                    email: 'toto@toto.fr', 
                    password: 'toto'}
                ]}
                onDelete={() => null}
            />
        )
        expect(assigneesAvatar.find(PopupHeader).children().text()).toBe('toto')
    })

    it('should display the avatar of the first assignee and a counter for the others', () => {
        const assigneesAvatar = mount(
            <AssigneesAvatar 
                assignees={[{
                    id: 1, 
                    username: 'toto', 
                    notificationEnabled: true, 
                    email: 'toto@toto.fr', 
                    password: 'toto'},
                    {
                        id: 1, 
                        username: 'titi', 
                        notificationEnabled: true, 
                        email: 'titi@titi.fr', 
                        password: 'titi'},
                ]}
                onDelete={() => null}
            />
        )
        expect(assigneesAvatar.find(AssigneesAvatar).length).toBe(1)
        expect(assigneesAvatar.find(AssigneesAvatar).first().text()).toBe('T+1')
    })

    it('should display the name of the the others in the popup', () => {
        const assigneesAvatar = shallow(
            <AssigneesAvatar 
                assignees={[{
                        id: 1, 
                        username: 'toto', 
                        notificationEnabled: true, 
                        email: 'toto@toto.fr', 
                        password: 'toto'
                    },
                    {
                        id: 1, 
                        username: 'titi', 
                        notificationEnabled: true, 
                        email: 'titi@titi.fr', 
                        password: 'titi'},
                ]}
                onDelete={() => null}
            />
        )
        expect(assigneesAvatar.find(PopupHeader).children().text()).toBe('toto and 1 more')
        expect(assigneesAvatar.find(PopupContent).find(Avatar).length).toBe(1)
    })
})
