import * as React from 'react'

import './editable-title.css'

interface EditableTitleProps {
    content: string
    cropTitle?: number
    inputValue?: string
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
            value: (props.inputValue) ? props.inputValue : props.content,
            editing: false
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
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

    handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Escape') {
            this.setState({
                editing: false,
                value: this.props.content
            })            
        }
    }

    renderTitle() {
        if (this.props.cropTitle) {
            if (this.props.content.length > this.props.cropTitle) {
                return this.props.content.substring(0, this.props.cropTitle) + '...'
            }
        } 
        return this.props.content
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
                        onKeyDown={this.handleKeyDown}
                        onKeyPress={this.handleKeyPress}
                        onMouseDown={e => e.stopPropagation()}
                    />
                </div>
            )
        } else {
            const HeaderTag = `${this.props.type}`
            return (
                <HeaderTag className="editable-title" onClick={this.handleClick}>
                    {this.renderTitle()}
                </HeaderTag>
            )
        }
    }
}

export default EditableTitle
