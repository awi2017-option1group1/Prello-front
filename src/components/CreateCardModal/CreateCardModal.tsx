import * as React from 'react'
import { Button, Modal, ModalContent, ModalActions, Header, Icon, Form, FormField } from 'semantic-ui-react'

export interface CreateCardModalProps {
    isOpen: boolean

    save: (name: string) => void
    cancel: () => void
}

export interface CreateCardModalState {
    name: string
}

class CreateCardModel extends React.Component<CreateCardModalProps, CreateCardModalState> {

    constructor(props: CreateCardModalProps) {
        super(props)
        this.state = {
            name: ''
        }
    }

    render() {
        return (
            <Modal 
                open={this.props.isOpen}
                closeIcon={true}
            >
                <Header icon="list layout" content="Add a new task" />
                <ModalContent>
                    <Form>
                        <FormField>
                            <label>Task name</label>
                            <input 
                                placeholder="Task name" 
                                value={this.state.name} 
                                onChange={(e) => this.setState({ name: e.target.value })} 
                            />
                        </FormField>
                    </Form>
                </ModalContent>
                <ModalActions>
                    <Button color="red" circular={true} onClick={this.props.cancel}>
                        <Icon name="cancel" /> Cancel
                    </Button>
                    <Button color="green" circular={true} onClick={() => this.props.save(this.state.name)}>
                        <Icon name="checkmark" /> Save
                    </Button>
                </ModalActions>
            </Modal>
        )
    }

}

export default CreateCardModel
