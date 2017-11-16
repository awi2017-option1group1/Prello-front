import * as React from 'react'
import { Card as SmCard, Button, Modal, Grid, Comment, Header, Form, Segment } from 'semantic-ui-react'
import * as moment from 'moment'

import { StateProps } from '../StateProps'
import { ICard } from '../../redux/cards/types'
import { ITag } from '../../redux/tags/types'
import { ICheckList } from '../../redux/checkLists/types'

import { IUser } from '../../redux/users/types'   

import Spinner from '../common/Spinner'
import EditableTitle from '../common/EditableTitle'
import ConfirmModal from '../common/ConfirmModal/ConfirmModal'
import EditableMarkdown from '../common/EditableMarkdown'
import DatePicker from './DatePicker'
import LabelsSegment from '../LabelsSegment'
import AssigneesSegment from '../AssigneesSegment'
import CheckLists from '../CheckLists'
import SplitHeader from '../common/SplitHeader'

import 'react-datepicker/dist/react-datepicker.css'
import './card-modal.css'

export interface ModalProps extends StateProps {
    card: ICard
    currentMoment?: moment.Moment

    boardLabels: ITag[]
    labels: ITag[]

    assignees: IUser[]
    boardAssignees: IUser[]

    checkLists: ICheckList[]

    onClose: () => void

    assignLabel: (label: ITag) => void
    createAndAssignLabel: (name: string) => void
    removeLabel: (label: ITag) => void

    assignUser: (user: IUser) => void
    removeUser: (user: IUser) => void

    updateCard: (card: Partial<ICard>) => void
    deleteCard: () => void
    addCheckList: () => void
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
            <SplitHeader semanticHeader={true}>
                <EditableTitle
                    type="h2"
                    content={props.card.name}
                    onSubmit={(name: string) => props.updateCard({ name })}
                />
                <Header as="h2" floated="right" className="card-id">#{props.card.id}</Header>
            </SplitHeader>
            <Modal.Content
                image={true}
                scrolling={true}
            >
            <Modal.Description style={{ flex: 1 }}>
                <Grid>
                <Grid.Column width={11}>
                    <h3>Description</h3>
                    <Segment>
                    <EditableMarkdown
                        content={props.card.desc ? props.card.desc : 'No description yet!'}
                        onSubmit={(desc: string) => props.updateCard({ desc })}
                    />
                    </Segment>

                    {
                        props.checkLists.length > 0 && 
                        <h3>Checklists ({props.checkLists.length})</h3>
                    }
                    <CheckLists cardId={props.card.id} />

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
                    <div className="actions-list">
                        <DatePicker card={props.card} currentMoment={moment()}/>
                        <Button
                            content="Add checklist"
                            icon="checkmark box"
                            labelPosition="left"
                            primary={true}
                            circular={true}
                            fluid={true}
                            onClick={props.addCheckList}
                        />
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
                    </div>
                </Grid.Column>
                </Grid>
            </Modal.Description>
            </Modal.Content>
        </Modal>
    )
}

export default CardModal
