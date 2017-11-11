import * as React from 'react'
import { Modal, Button, Icon } from 'semantic-ui-react'

export interface ConfirmModalProps {
    trigger: React.ReactNode
    content: React.ReactNode
    title: string
    confirmButton: string
    cancelButton: string
    onConfirm: () => void
    onCancel?: () => void
}

export interface ConfirmModalState {
    open: boolean
}

class ConfirmModal extends React.Component<ConfirmModalProps, ConfirmModalState> {
    constructor(props: ConfirmModalProps) {
        super(props)
        this.state = {
            open: false
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
    }

    handleClick() {
        this.setState({
            open: true
        })  
    }

    handleCancel() {
        this.setState({
            open: false
        })
        if (this.props.onCancel) {
            this.props.onCancel()
        }
    }

    handleConfirm() {
        this.setState({
            open: false
        })
        this.props.onConfirm()
    }

    render() {
        return (
            <div>
                <div onClick={this.handleClick}>
                    {this.props.trigger}
                </div>
                <Modal onClose={this.handleCancel} open={this.state.open}>
                    <Modal.Header>{this.props.title}</Modal.Header>
                    <Modal.Content>{this.props.content}</Modal.Content>
                    <Modal.Actions>
                        <Button basic={true} circular={true} onClick={this.handleCancel}>
                            <Icon name="cancel" /> {this.props.cancelButton}
                        </Button>
                        <Button 
                            color="red" 
                            circular={true} 
                            onClick={this.handleConfirm}
                        >
                            <Icon name="checkmark" /> {this.props.confirmButton}
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default ConfirmModal
