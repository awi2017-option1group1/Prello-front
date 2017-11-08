import * as React from 'react'
import { Card as SmCard, Button, Modal, Input, Icon, Grid, Segment, Accordion, Checkbox,
    Comment, Header, Menu, Form, Label } from 'semantic-ui-react'

import { StateProps } from '../StateProps'
import { ICard } from '../../redux/cards/types'

import Spinner from '../common/Spinner'
import EditableTitle from '../common/EditableTitle'
import { AssigneesSegment } from './../AssigneesSegment'
import { AttachmentsModal } from './../AttachmentsModal'

export interface ModalProps extends StateProps {
    card: ICard

    onClose: () => void
}

class TaskListAccordion extends React.Component {
    state = { activeIndex: -1 }

    handleClick = (e: React.SyntheticEvent<HTMLDivElement>, titleProps: {index: number}) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state

        return (
            <Accordion styled={true} fluid={true} >
            <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name="dropdown" />
            TaskList
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
            <p><Checkbox label="Task 1" /></p>
            <p><Checkbox label="Task 2" /></p>
            <p><Checkbox label="Task 3" /></p>
            <Input fluid={true} placeholder="Add a new Task List" />
            </Accordion.Content>
        </Accordion>
        )
    }
}

const CardModal: React.StatelessComponent<ModalProps> = (props) => {
    if (props.loading) {
        return (
            <SmCard>
                <Spinner />
            </SmCard>
        )
    }

    return (
        <Modal
            open={true}
            closeIcon={true}
            size="large"
            onClose={props.onClose}
        >
            <Header>
                <EditableTitle type="h2" content={props.card.name} onSubmit={() => null} />
            </Header> 
            <Modal.Content
                image={true}
                scrolling={true}
            >
            <Modal.Description style={{ flex: 1 }}>
                <Grid>
                <Grid.Column width={11}>
                    <Segment>
                        <h3>Description</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Quisque pulvinar libero ut enim pretium, a ultrices eros ultricies.
                        Fusce viverra elementum lectus laoreet pellentesque.
                        In ut neque bibendum, elementum sapien malesuada, viverra nisi.</p>
                    </Segment>
                    <Input
                            fluid={true}
                            attached="bottom"
                            placeholder="Click here to add a description"
                    />
                    <br />
                    <TaskListAccordion />

                    <Comment.Group>
                        <Header as="h3" dividing={true}>Comments (1)</Header>
                        <Form reply={true} size="small">
                            <Form.TextArea />
                            <Button content="Add Comment" labelPosition="left" icon="edit" primary={true} />
                        </Form>
                        <Comment>
                            <Comment.Avatar src="https://semantic-ui.com/images/avatar/small/elliot.jpg" />
                            <Comment.Content>
                                <Comment.Author as="a">Matt</Comment.Author>
                                <Comment.Metadata>
                                <div>Today at 5:42PM</div>
                                </Comment.Metadata>
                                <Comment.Text>How artistic!</Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action>Reply</Comment.Action>
                                    <Comment.Action>Update</Comment.Action>
                                    <Comment.Action>Delete</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                </Grid.Column>

                <Grid.Column width={5}>
                    <AssigneesSegment />

                    <h3>Labels</h3>
                    <Menu.Item>
                        <Input
                            icon="tags"
                            placeholder="Search..."
                            iconPosition="left"
                            fluid={true}
                        />
                        <Segment basic={true}>
                            <Label color="red" horizontal={true}>Fruit</Label>
                            <Label color="purple" horizontal={true}>Candy</Label>
                        </Segment>
                    </Menu.Item>
                    <h3>Actions</h3>
                    <p>
                        <Button 
                            content="Set due date" 
                            icon="calendar" 
                            labelPosition="left" 
                            primary={true} 
                            circular={true} 
                            fluid={true}
                        />
                    </p>
                    <p>
                        <Button 
                            content="Add checklist" 
                            icon="checkmark box" 
                            labelPosition="left" 
                            primary={true} 
                            circular={true} 
                            fluid={true}
                        />
                    </p>
                    <p>
                        <Button 
                            content="Move card" 
                            icon="move" 
                            labelPosition="left" 
                            primary={true} 
                            circular={true} 
                            fluid={true}
                        />
                    </p>
                    <p><AttachmentsModal /></p>
                </Grid.Column>
                </Grid>
            </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default CardModal
