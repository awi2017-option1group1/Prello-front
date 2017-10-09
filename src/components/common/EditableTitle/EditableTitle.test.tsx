import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { spy } from 'sinon'

import EditableTitle from './EditableTitle'

describe('<EditableTitle />', () => {
    it('should display the title', () => {
        const onSubmit = (newValue: string) => null
        const editableTitle = shallow(<EditableTitle content="TestTitle" type="h1" onSubmit={onSubmit} />)
        expect(editableTitle.find('h1').text()).toBe('TestTitle')
    })

    it('should display the right tag', () => {
        const onSubmit = (newValue: string) => null
        const editableTitle = shallow(<EditableTitle content="TestTitle" type="h2" onSubmit={onSubmit} />)
        expect(editableTitle.find('h1').length).toBe(0)
        expect(editableTitle.find('h2').length).toBe(1)
    })

    it('should display input when user clicks on title', () => {
        const onSubmit = (newValue: string) => null
        const editableTitle = shallow(<EditableTitle content="TestTitle" type="h1" onSubmit={onSubmit} />)

        expect(editableTitle.find('input').length).toBe(0)

        editableTitle.find('h1').simulate('click')
        expect(editableTitle.find('input').length).toBe(1)
    })

    it('should update the title on submit', () => {
        const onSubmit = spy()
        const editableTitle = mount(<EditableTitle content="TestTitle" type="h1" onSubmit={onSubmit} />)

        editableTitle.find('h1').simulate('click')
        editableTitle.find('input').simulate('change', { target: { value: 'My new value' } })
        editableTitle.find('input').simulate('keyPress', { key: 'Enter' })

        expect(onSubmit.callCount).toBe(1)
        expect(onSubmit.firstCall.args).toEqual(['My new value'])
        expect(editableTitle.find('h1').text()).toBe('My new value')
    })
})
