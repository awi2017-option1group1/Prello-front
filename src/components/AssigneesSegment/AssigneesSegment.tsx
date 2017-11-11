import * as React from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import AssigneesAvatar from '../AssigneesAvatar'
import AssigneeForm from '../AssigneeForm'

import { StateProps } from '../StateProps'

import { IUser } from '../../redux/users/types'

export interface AssigneesSegmentProps extends StateProps {
    assignees: IUser[]
    boardAssignees: IUser[]

    assignUser: (user: IUser) => void
    removeUser: (user: IUser) => void
}
const AssigneesSegment = (props: AssigneesSegmentProps) => {

    return (
        <div>
        <h3>Assignee(s)</h3>
            <Menu.Item>
            <AssigneeForm 
                boardAssignees={props.boardAssignees}
                cardAssignees={props.assignees}
                addAssignee={props.assignUser}
                removeAssignee={props.removeUser}
            />
            </Menu.Item>
            <Segment basic={true}>
                <AssigneesAvatar 
                    assignees={props.assignees}
                />
            </Segment>
        </div>

    )
}

export default AssigneesSegment
