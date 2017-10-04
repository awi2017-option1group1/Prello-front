import * as React from 'react'

import './editable-title.css'

interface EditableTitleProps {
    content: string
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

    onSubmit: (newValue: string) => void
}

interface EditableTitleState {
    value: string
    editing: boolean
}

class EditableTitle extends React.Component<EditableTitleProps, EditableTitleState> {
    constructor(props: EditableTitleProps) {
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

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            value: event.target.value
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
                <div className="ui input">
                    <input
                        autoFocus={true}
                        value={this.state.value} 
                        onChange={this.handleChange} 
                        onBlur={this.handleSubmit}
                        onKeyPress={this.handleKeyPress}
                    />
                </div>
            )
        } else {
            const HeaderTag = `${this.props.type}`
            return (
                <HeaderTag className="editable-title" onClick={this.handleClick}>
                    {this.props.content}
                </HeaderTag>
            )
        }
    }
}

export default EditableTitle
