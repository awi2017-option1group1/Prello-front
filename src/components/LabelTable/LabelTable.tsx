import * as React from 'react'
import { Table, Button } from 'semantic-ui-react'

import Label from '../common/Label'
import ConfirmModal from '../common/ConfirmModal/ConfirmModal'
import EditableTitle from '../common/EditableTitle'
import ColorSelectList from '../common/ColorSelectList'

import { ITag } from '../../redux/tags/types'

export interface LabelTableProps {
    labels: ITag[]

    updateLabel: (label: ITag, newValues: Partial<ITag>) => void
    deleteLabel: (label: ITag) => void
}

const LabelTable: React.StatelessComponent<LabelTableProps> = (props) => {
    if (props.labels.length === 0) {
        return <p>No label yet!</p>
    }

    return (
        <div>
            <Table celled={true} columns={4} striped={true}>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Label</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Color</Table.HeaderCell>
                    <Table.HeaderCell>Action(s)</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {props.labels.map(label => (
                        <Table.Row key={label.id || -1}>
                            <Table.Cell>
                                <Label label={label} />
                            </Table.Cell>
                            <Table.Cell>
                                <EditableTitle 
                                    content={label.name} 
                                    type="p"
                                    onSubmit={(name) => props.updateLabel(label, { name })}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <ColorSelectList 
                                    value={label.color} 
                                    onSubmit={(color) => props.updateLabel(label, { color })}
                                />
                            </Table.Cell>
                            <Table.Cell>
                            <ConfirmModal
                                trigger={
                                    <Button 
                                        icon="trash" 
                                        circular={true} 
                                        content="Delete label"
                                        color="red"
                                        size="small"
                                    />  
                                }
                                title="Confirm delete"
                                content={`Are you sure you want to delete label '${label.name}'? `}
                                confirmButton="Yes, delete"
                                cancelButton="No, cancel"
                                onConfirm={() => props.deleteLabel(label)}
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
