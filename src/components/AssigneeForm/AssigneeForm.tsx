import * as React from 'react'
import * as _ from 'lodash'
import { Dropdown, Segment } from 'semantic-ui-react'
import Avatar from '../common/Avatar'
// import AssigneeAvatar from '../AssigneesAvatar'

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
                allowAdditions={true}
                search={true}
                fluid={true}
                onChange={(e, data) => {
                    const value = data.value![0]
                    // If the value is a number => user have picks up an existing label
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
                {props.cardAssignees.map(l => (
                    <Avatar user={l} key={l.id} onDelete={props.removeAssignee} />
                ))}
            </Segment>
        </div>
    )
}

export default AssigneesForm
