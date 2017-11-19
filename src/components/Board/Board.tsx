import * as React from 'react'
import { Button, Modal, Input, Form, Segment } from 'semantic-ui-react'

import { IBoard } from '../../redux/boards/types'
import { IList } from '../../redux/lists/types'
import { ICard } from '../../redux/cards/types'
import { ITag } from '../../redux/tags/types'
import { IUser, ILoggedUser } from '../../redux/users/types'

import { StateProps } from '../StateProps'

import SplitHeader from '../common/SplitHeader'
import CardModal from '../CardModal'
import CreateCardModal from '../CreateCardModal'
import ConfirmModal from '../common/ConfirmModal/ConfirmModal'
import Spinner from '../common/Spinner'
import EditableTitle from '../common/EditableTitle'
import LabelTable from '../LabelTable'
import UsersTable from '../UsersTable'
import TasksLists from '../TasksLists'
import PageNotFound from '../../routes/PageNotFound'

import './board.css'

export interface BoardProps extends StateProps {
    board: IBoard
    connectedUser: ILoggedUser
    labels: ITag[]
    listToAppendCard: IList | null
    openedCard: ICard | null
    assignees: IUser[]

    setTitle: (title: string) => void
    addList: () => void
    saveCard: (name: string) => void
    closeCreateCard: () => void
    closeCard: () => void

    createLabel: () => void
    updateLabel: (label: ITag, newValues: Partial<ITag>) => void
    deleteLabel: (label: ITag) => void
    addUser: (userName: String) => void
    removeUser: (user: IUser) => void
    deleteBoard: (board: IBoard) => void
}

class Board extends React.Component<BoardProps> {

    componentWillMount() {
        this.props.loadData!()
    }

    render() {
        let usernameToAdd: String = ''

        const deleteSelf = () => {
            this.props.deleteBoard(this.props.board)
        }

        const addUser = () => {
            if (usernameToAdd) {
                this.props.addUser(usernameToAdd)
            }
        }

        const deleteButton = (this.props.board.owner.id === this.props.connectedUser.uid) ? (
            <ConfirmModal
                trigger={
                    <Button
                        icon="trash"
                        color="red"
                        circular={true}
                    />
                }
                title="Confirm delete"
                content={`Are you sure you want to delete this board ?`}
                confirmButton="Yes, delete"
                cancelButton="No, cancel"
                onConfirm={deleteSelf}
            />
        ) : ''

        if (this.props.loading) {
            return <Spinner />
        }

        if (this.props.error) {
            return <PageNotFound />
        }

        return (
            <section id="board">
                <SplitHeader>
                    <EditableTitle type="h1" content={this.props.board.name} onSubmit={this.props.setTitle} />
                    <div>
                        <Button
                            content="Add column"
                            icon="plus"
                            labelPosition="left"
                            primary={true}
                            circular={true}
                            onClick={this.props.addList}
                        />
                        <Modal
                            trigger={
                                <Button
                                    content="Manage labels"
                                    icon="tags"
                                    labelPosition="left"
                                    circular={true}
                                />
                            }
                            closeIcon={true}
                            size="large"
                        >
                            <Modal.Header>
                                Labels
                                <Button
                                    content="Add label"
                                    icon="plus"
                                    labelPosition="left"
                                    floated="right"
                                    primary={true}
                                    circular={true}
                                    className="modal-header-button"
                                    onClick={this.props.createLabel}
                                />
                            </Modal.Header>
                            <Modal.Content>
                                <LabelTable
                                    labels={this.props.labels}
                                    updateLabel={this.props.updateLabel}
                                    deleteLabel={this.props.deleteLabel}
                                />
                            </Modal.Content>
                        </Modal>
                        <Modal
                            trigger={
                                <Button
                                    content="Manage users"
                                    icon="user"
                                    labelPosition="left"
                                    circular={true}
                                />
                            }
                            closeIcon={true}
                            size="large"
                        >
                            <Modal.Header>
                                Assigned users
                            </Modal.Header>
                            <Modal.Content>
                                <Segment>
                                    <h2>Add a user</h2>
                                    <Form className="add-username-form">
                                        <Form.Group>
                                            <Input
                                                className="username-input"
                                                placeholder="Username"
                                                onChange={(e, data) => {
                                                    const value = data.value
                                                    if (typeof value === 'string') {
                                                        usernameToAdd = value
                                                    }
                                                }}
                                            />
                                        </Form.Group>
                                        <Button
                                            content="Add user"
                                            icon="plus"
                                            labelPosition="left"
                                            circular={true}
                                            primary={true}
                                            className="modal-header-button"
                                            onClick={addUser}
                                        />
                                    </Form>
                                </Segment>
                                <UsersTable
                                    users={this.props.assignees}
                                    removeUser={this.props.removeUser}
                                    connectedUser={this.props.connectedUser}
                                />
                            </Modal.Content>
                        </Modal>
                        {deleteButton}
                    </div>
                </SplitHeader>
                <TasksLists boardId={this.props.board.id} />
                <CreateCardModal
                    isOpen={this.props.listToAppendCard != null}
                    listName={this.props.listToAppendCard ? this.props.listToAppendCard!.name : ''}
                    save={this.props.saveCard}
                    cancel={this.props.closeCreateCard}
                />
                {this.props.openedCard !== null &&
                    <CardModal
                        board={this.props.board}
                        onClose={this.props.closeCard}
                        card={this.props.openedCard}
                    />
                }
            </section>
        )
    }
}

export default Board
