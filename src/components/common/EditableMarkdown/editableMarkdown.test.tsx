import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { spy } from 'sinon'

import EditableMarkdown from './EditableMarkdown'

describe('<EditableMarkdown />', () => {
  /*it('should display the markdown', () => {
        const onSubmit = (newValue: string) => null
        const content: string = 'testContent'
        const editableMarkdown = shallow(<EditableMarkdown content={content} onSubmit={onSubmit} />)
        expect(editableMarkdown.text()).toBe(content)
    })*/

    it('should display Markdown input when user clicks on div', () => {
        const onSubmit = (newValue: string) => null
        const editableMarkdown = shallow(<EditableMarkdown content="testContent" onSubmit={onSubmit} />)

        expect(editableMarkdown.hasClass('editable-markdown editable'))
        editableMarkdown.simulate('click')
        expect(editableMarkdown.hasClass('input'))
    })
/*
    it('should update the content on submit', () => {
        const onSubmit = spy()
        const editableMarkdown = mount(<EditableMarkdown content="testContent" onSubmit={onSubmit} />)

        editableMarkdown.simulate('click')
        editableMarkdown.find('textarea').simulate('change', { target: { value: 'My new value' } })
        editableMarkdown.find('textarea').simulate('keyPress', { key: 'Enter' })

        expect(onSubmit.callCount).toBe(1)
        expect(onSubmit.firstCall.args).toEqual(['My new value'])
        expect(editableMarkdown.text()).toBe('My new value')
    })
    */
})
