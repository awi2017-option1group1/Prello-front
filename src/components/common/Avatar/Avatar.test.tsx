import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { spy } from 'sinon'

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
        const onSubmit = (newValue: string) => null
        const avatar = shallow(<Avatar user={user}/>)
        expect(avatar.find(Label).length).toBe(1)
    })

    it('should display the initial', () => {
        const onSubmit = (newValue: string) => null
        const avatar = shallow(<Avatar user={user}/>)
        expect(avatar.contains('T')).toBe(true)
    })
})
