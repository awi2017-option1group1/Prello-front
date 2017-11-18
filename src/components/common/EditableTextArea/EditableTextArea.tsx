import * as React from 'react'
import { TextArea } from 'semantic-ui-react'

interface EditableTextAreaProps {
    content: string

    onSubmit: (newValue: string) => void
}

interface EditableTextAreaState {
    value: string
    editing: boolean
}

class EditableTextArea extends React.Component<EditableTextAreaProps, EditableTextAreaState> {
    constructor(props: EditableTextAreaProps) {
        super(props)
        this.state = {
            value: props.content,
            editing: false
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    handleClick() {
        this.setState({
            editing: true
        })
    }

    handleChange(event: React.SyntheticEvent<HTMLTextAreaElement>) {
        const target = event.target as HTMLTextAreaElement
        this.setState({
            value: target.value
        })
    }

    handleSubmit() {
        this.props.onSubmit(this.state.value)
        this.setState({
            editing: false
        })
    }

    handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            this.handleSubmit()
        }
    }

    render() {
        if (this.state.editing) {
            return (
                <TextArea
                    className="ui input"
                    autoFocus={true}
                    value={this.state.value}
                    onChange={this.handleChange}
                    onBlur={this.handleSubmit}
                    onKeyPress={this.handleKeyPress}
                />
            )
        } else {
            return (
                <div className="editable-text-area" onClick={this.handleClick}>
                    {this.state.value}
                </div>
            )
        }
    }
}

export default EditableTextArea
