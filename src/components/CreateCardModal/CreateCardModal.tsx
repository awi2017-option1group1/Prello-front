import * as React from 'react'
import { Button, Modal, ModalContent, ModalActions, Header, Icon, Form, FormField } from 'semantic-ui-react'

export interface CreateCardModalProps {
    isOpen: boolean
    listName: string

    save: (name: string, desc: string) => void
    cancel: () => void
}

export interface CreateCardModalState {
    name: string
    desc: string
}

class CreateCardModel extends React.Component<CreateCardModalProps, CreateCardModalState> {

    constructor(props: CreateCardModalProps) {
        super(props)
        this.state = {
            name: '',
            desc: ''
        }
    }

    componentWillReceiveProps() {
        this.setState({
            name: '',
            desc: ''
        })
    }

    render() {

        const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                this.props.save(this.state.name, this.state.desc)
            }
        }

        return (
            <Modal
                open={this.props.isOpen}
                closeIcon={true}
                onClose={this.props.cancel}
                onKeyPress={handleKeyPress}
            >
                <Header icon="list layout" content={`Add a new task in '${this.props.listName}'`} />
                <ModalContent>
                    <Form>
                        <FormField>
                            <label>Name</label>
                            <input
                                placeholder="Task name"
                                value={this.state.name}
                                onChange={(e) => this.setState({ name: e.target.value })}
                            />
                        </FormField>
                        <Form.TextArea
                            label="Description"
                            placeholder="Tell us more about the card..."
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                this.setState({ desc: e.target.value }
                            )}
                        />
                    </Form>
                </ModalContent>
                <ModalActions>
                    <Button color="red" circular={true} onClick={this.props.cancel}>
                        <Icon name="cancel" /> Cancel
                    </Button>
                    <Button
                        color="green"
                        circular={true}
                        onClick={() => this.props.save(this.state.name, this.state.desc)}
                    >
                        <Icon name="checkmark" /> Save
                    </Button>
                </ModalActions>
            </Modal>
        )
    }

}

export default CreateCardModel
