import * as React from 'react'
import { shallow } from 'enzyme'

import Profile from './Profile'

const ProfileProps = {
    user: {
        id: 1,
        username: 'username',
        email: 'email',
        password: 'password',
        notificationEnabled: false,
    },
    loadData: () => {return},
    setFullName: () => {return},
    setEmail: () => {return},
    setPseudo: () => {return},
    setBio: () => {return},
    setPassword: () => {return},
    toggleProps: () => {return},
}

describe('<Profile />', () => {
    it('should display the email', () => {
        const profile = shallow((
            <Profile
                user={ProfileProps.user}
                loadData={ProfileProps.loadData}
                setFullName={ProfileProps.setFullName}
                setEmail={ProfileProps.setEmail}
                setPseudo={ProfileProps.setPseudo}
                setBio={ProfileProps.setBio}
                setPassword={ProfileProps.setPassword}
                toggleNotifications={ProfileProps.toggleProps}
            />
            ))
        expect(profile.children.length).toBe(1)
    })
})
