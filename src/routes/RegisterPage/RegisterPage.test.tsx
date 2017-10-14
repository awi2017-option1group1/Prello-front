import * as React from 'react'
import { shallow } from 'enzyme'

import RegisterPage from './RegisterPage'
import RegisterForm from './../../components/RegisterForm'

describe('<RegisterPage />', () => {
    it('should display RegisterForm', () => {
        const registerPage = shallow(<RegisterPage />)
        expect(registerPage.find(RegisterForm).length).toBe(1)
    })
})
