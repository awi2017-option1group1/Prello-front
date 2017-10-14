import * as React from 'react'
import { shallow } from 'enzyme'
import { spy } from 'sinon'
import { FormInput, Form } from 'semantic-ui-react'

import RegisterForm from './RegisterForm'

describe('<RegisterForm />', () => {
    it('should display 3 inputs', () => {
        const registerForm = shallow(
            <RegisterForm isProcessing={false} errors={[]} register={(email, username, password) => { return }} />
        ) 
        expect(registerForm.find(FormInput).length).toBe(3)
    })

    it('should display call register function', () => {
        const register = spy()
        const registerForm = shallow(
            <RegisterForm isProcessing={false} errors={[]} register={register} />
        ) 
        expect(register.callCount).toBe(0)
        registerForm.find(Form).simulate('submit')
        expect(register.callCount).toBe(1)
        expect(register.firstCall.args).toEqual(['', '', ''])
    })
})
