import * as React from 'react'
import { shallow } from 'enzyme'

import LoginPage from './LoginPage'
import LoginForm from '../../components/LoginForm'

describe('<LoginPage />', () => {
    it('should display a LoginForm', () => {
        const loginPage = shallow(<LoginPage />)
        expect(loginPage.find(LoginForm).length).toBe(1)
    })
})
