import * as React from 'react'
import { Card as SmCard, Button, Modal, Input, Icon, Grid, Accordion, Checkbox,
    Comment, Header, Form } from 'semantic-ui-react'

import * as moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import { StateProps } from '../StateProps'
import { ICard } from '../../redux/cards/types'
import { ITag } from '../../redux/tags/types'
    
import { IUser } from '../../redux/users/types'   

import Spinner from '../common/Spinner'
import EditableTitle from '../common/EditableTitle'
import ConfirmModal from '../common/ConfirmModal/ConfirmModal'
import EditableMarkdown from '../common/EditableMarkdown'
import { AssigneesSegment } from './../AssigneesSegment'
<<<<<<< 3ea33a893f50a7cb0b5b991705b7793bd5affe8b
import DatePicker from './DatePicker'
import LabelsSegment from '../LabelsSegment'
import AssigneesSegment from './../AssigneesSegment'

import './card-modal.css'
=======
import { AttachmentsModal } from './../AttachmentsModal'
import CheckLists from './../CheckLists'
>>>>>>> feat(CheckList) : STEP print all checkLists and all checkItems

export interface ModalProps extends StateProps {
    card: ICard
    currentMoment?: moment.Moment

    boardLabels: ITag[]
    labels: ITag[]

    assignees: IUser[]
    boardAssignees: IUser[]

    onClose: () => void

    assignUser: (user: IUser) => void
    removeUser: (user: IUser) => void

    updateCard: (card: Partial<ICard>) => void
    deleteCard: () => void

    assignLabel: (label: ITag) => void
    createAndAssignLabel: (name: string) => void
    removeLabel: (label: ITag) => void
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
                <h2>#{props.card.id}</h2>
                <EditableTitle
                    type="h2"
                    content={props.card.name}
                    onSubmit={(name: string) => props.updateCard({ name })}
                />
            </Header>
            <Modal.Content
                image={true}
                scrolling={true}
            >
            <Modal.Description style={{ flex: 1 }}>
                <Grid>
                <Grid.Column width={11}>
                    <h3>Description</h3>
                    <EditableMarkdown
                        content={props.card.desc ? props.card.desc : 'No description yet!'}
                        onSubmit={(desc: string) => props.updateCard({ desc })}
                    />

                    <h3>Checklists</h3>
                    <TaskListAccordion />
                    <br />
                    <CheckLists cardId={props.card.id}/>

                    <Comment.Group>
                        <Header as="h3" dividing={true}>Comments (1)</Header>
                        <Form size="small">
                            <Form.TextArea />
                            <Button
                                circular={true}
                                content="Add Comment"
                                labelPosition="left"
                                icon="edit"
                                primary={true}
                            />
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
                    <AssigneesSegment 
                        assignees={props.assignees}
                        boardAssignees={props.boardAssignees}
                        assignUser={props.assignUser}
                        removeUser={props.removeUser}
                    />

                    <LabelsSegment 
                        boardLabels={props.boardLabels}
                        cardLabels={props.labels}
                        addLabel={props.assignLabel}
                        createAndAddLabel={props.createAndAssignLabel}
                        removeLabel={props.removeLabel}
                    />

                    <h3>Actions</h3>
                    <p>
                    <DatePicker card={props.card} currentMoment={moment()}/>
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
                    <ConfirmModal
                        trigger={
                            <Button
                                content="Delete card"
                                icon="trash"
                                labelPosition="left"
                                color="red"
                                circular={true}
                                fluid={true}
                            />
                        }
                        title="Confirm delete"
                        content={`Are you sure you want to delete card '${props.card.name}'? `}
                        confirmButton="Yes, delete"
                        cancelButton="No, cancel"
                        onConfirm={props.deleteCard}
                    />
                </Grid.Column>
                </Grid>
            </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default CardModal
