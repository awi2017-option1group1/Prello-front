import * as React from 'react'
import { shallow } from 'enzyme'

import Avatar from './Avatar'

import { Label } from 'semantic-ui-react'

const user = {
    id: 1,
    username: 'test',
    email: '',
    password: '',
    notificationsEnabled: false,
}

describe('<Avatar />', () => {
    it('should display the Avatar', () => {
        const avatar = shallow(<Avatar user={user}/>)
        expect(avatar.find(Label).length).toBe(1)
    })

    it('should display the initial', () => {
        const avatar = shallow(<Avatar user={user}/>)
        expect(avatar.contains('T')).toBe(true)
    })
})
