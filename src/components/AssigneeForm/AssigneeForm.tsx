import * as React from 'react'
import * as _ from 'lodash'
import { Dropdown, Segment } from 'semantic-ui-react'

import AssigneesAvatar from '../AssigneesAvatar'

import { IUser } from '../../redux/users/types'

// import './label-assign-form.css'

export interface AssigneesFormProps {
    boardAssignees: IUser[]
    cardAssignees: IUser[]

    addAssignee: (assignee: IUser) => void
    removeAssignee: (assignee: IUser) => void
}

const AssigneesForm: React.StatelessComponent<AssigneesFormProps> = (props) => {
    const options = _.differenceBy(props.boardAssignees, props.cardAssignees, 'id')
        .map(u => ({
            key: u.id,
            text: u.username,
            value: u.id,
            content: u.username 
        }))
    return (
        <div>
            <Dropdown
                options={options}
                placeholder="Search..."
                selection={true}
                allowAdditions={false}
                search={true}
                fluid={true}
                onChange={(e, data) => {
                    const value = data.value![0]
                    if (typeof data.value![0] === 'number') {
                        const assignee = props.boardAssignees.find(u => u.id === value)
                        if (assignee) {
                            props.addAssignee(assignee)
                        }
                    }
                }}
                selectOnNavigation={false}
                value={[]}
                multiple={true} // Use multiple to avoid selection issues
                closeOnChange={true}
            />
            <Segment basic={true} className="label-modal-segment">
                {props.cardAssignees.length === 0 && 'No users yet!'}
                    <AssigneesAvatar assignees={props.cardAssignees} onDelete={props.removeAssignee} />
            </Segment>
        </div>
    )
}

export default AssigneesForm
