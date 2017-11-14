import * as React from 'react'
import { Form, Button, Icon, Tab } from 'semantic-ui-react'

const ReactMarkdown = require('react-markdown')

import './editable-markdown.css'

interface EditableMarkdownProps {
    content: string

    onSubmit: (newValue: string) => void
}

interface EditableMarkdownState {
    value: string
    startValue: string
    editing: boolean
}

class EditableMarkdown extends React.Component<EditableMarkdownProps, EditableMarkdownState> {
    constructor(props: EditableMarkdownProps) {
        super(props)
        this.state = {
            value: props.content,
            startValue: props.content,
            editing: false
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.renderPreview = this.renderPreview.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.renderTab = this.renderTab.bind(this)
    }

    componentWillReceiveProps(newProps: EditableMarkdownProps) {
        this.setState({
            value: newProps.content
        })
    }

    handleClick() {
        this.setState({
            editing: true
        })
    }

    handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({
            value: event.target.value
        })
    }

    handleCancel() {
        this.setState({
            editing: false,
            value: this.state.startValue
        })  
    }

    handleSubmit() {
        this.props.onSubmit(this.state.value)
        this.setState({
            editing: false,
            startValue: this.state.value
        })  
    }

    renderPreview() {
        return (
            <ReactMarkdown 
                className="markdown-preview"
                source={this.state.value} 
                escapeHtml={true}
            />
        )
    }

    renderForm() {
        return (
            <Form.TextArea 
                rows="8"
                placeholder="Tell us more about the card..." 
                onChange={this.handleChange}
                value={this.state.value}
            />
        )
    }

    renderTab() {
        return [
            {
                menuItem: 'Write',
                render: this.renderForm
            },
            {
                menuItem: 'Preview',
                render: this.renderPreview
            }
        ]
    }

    render() {
        if (this.state.editing) {
            return (
                <Form>
                    <Tab 
                        menu={{secondary: true, pointing: true}} 
                        panes={this.renderTab()} 
                        className="markdown-tab"
                    />
                    <Button color="red" circular={true} onClick={this.handleCancel}>
                        <Icon name="cancel" /> Cancel
                    </Button>
                    <Button 
                        color="green" 
                        circular={true} 
                        onClick={this.handleSubmit}
                    >
                        <Icon name="checkmark" /> Save
                    </Button>
                </Form>
            )
        } else {
            return (
                <div className="editable-markdown" onClick={this.handleClick}>
                    {this.renderPreview()}
                </div>
            )
        }
    }
}

export default EditableMarkdown
