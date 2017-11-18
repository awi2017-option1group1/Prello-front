import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { spy } from 'sinon'

import EditableTextArea from './EditableTextArea'

describe('<EditableTextArea />', () => {
    it('should display the textArea', () => {
        const onSubmit = (newValue: string) => null
        const editableTextArea = shallow(<EditableTextArea content="testContent" onSubmit={onSubmit} />)
        expect(editableTextArea.text()).toBe('testContent')
    })

    it('should display TextArea input when user clicks on div', () => {
        const onSubmit = (newValue: string) => null
        const editableTextArea = shallow(<EditableTextArea content="testContent" onSubmit={onSubmit} />)

        expect(editableTextArea.hasClass('editable-text-area'))
        editableTextArea.simulate('click')
        expect(editableTextArea.hasClass('input'))
    })

    it('should update the content on submit', () => {
        const onSubmit = spy()
        const editableTextArea = mount(<EditableTextArea content="testContent" onSubmit={onSubmit} />)

        editableTextArea.simulate('click')
        editableTextArea.find('textarea').simulate('change', { target: { value: 'My new value' } })
        editableTextArea.find('textarea').simulate('keyPress', { key: 'Enter' })

        expect(onSubmit.callCount).toBe(1)
        expect(onSubmit.firstCall.args).toEqual(['My new value'])
        expect(editableTextArea.text()).toBe('My new value')
    })
})
