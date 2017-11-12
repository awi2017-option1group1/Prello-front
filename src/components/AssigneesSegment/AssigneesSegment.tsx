import * as React from 'react'
import { Menu } from 'semantic-ui-react'
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
        </div>

    )
}

export default AssigneesSegment
