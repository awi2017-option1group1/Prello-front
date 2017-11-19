import * as React from 'react'
import { Table, Button } from 'semantic-ui-react'

import ConfirmModal from '../common/ConfirmModal/ConfirmModal'

import { IUser } from '../../redux/users/types'

export interface LabelTableProps {
    users: IUser[]

    removeUser: (user: IUser) => void
}

const LabelTable: React.StatelessComponent<LabelTableProps> = (props) => {
    if (props.users.length === 0) {
        return <p>No user added yet!</p>
    }

    return (
        <div>
            <Table celled={true} columns={4} striped={true}>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Username</Table.HeaderCell>
                    <Table.HeaderCell>Action(s)</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {props.users.map(user => (
                        <Table.Row key={user.id || -1}>
                            <Table.Cell>
                                <div>
                                    {user.email}
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <div>
                                    {user.username}
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <ConfirmModal
                                    trigger={
                                        <Button
                                            icon="trash"
                                            circular={true}
                                            content="Remove user from board"
                                            color="red"
                                            size="small"
                                        />
                                    }
                                    title="Confirm delete"
                                    content={`Are you sure you want to remove user '${user.username}' ? `}
                                    confirmButton="Yes, delete"
                                    cancelButton="No, cancel"
                                    onConfirm={() => props.removeUser(user)}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}

export default LabelTable
