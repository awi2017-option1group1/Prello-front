import * as React from 'react'
import { Popup, PopupContent, PopupHeader, Label } from 'semantic-ui-react'

import Avatar from '../common/Avatar'

import { IUser } from '../../redux/users/types'

interface AssigneesAvatarProps {
    assignees: IUser[]
}

const getPopupHeaderText = (assignees: IUser[]) => {
    if (assignees.length >= 2) {
        return `${assignees[0].username} and ${assignees.length - 1} more`
    } else {
        return assignees[0].username
    }
}

const getPopupContent = (assignees: IUser[]) => assignees.map(assignee => (
    <Avatar 
        key={assignee.username}
        user={assignee}
    />
))

const AssigneesAvatar: React.StatelessComponent<AssigneesAvatarProps> = (props) => {
    if (props.assignees.length === 0) {
        return null
    }

    const MainAvatar = (
        <div className="right floated">
                <Avatar
                    key={props.assignees[0].username}
                    user={props.assignees[0]}
                />
                {props.assignees.length >= 2 && 
                <Label size="large" circular={true} color="blue">+{props.assignees.length - 1}</Label>}
        </div>
    )

    return (
        <div>
            <Popup trigger={MainAvatar} position="top center">
                <PopupHeader>{getPopupHeaderText(props.assignees)}</PopupHeader>
                <PopupContent>
                    {getPopupContent(props.assignees)}
                </PopupContent>
            </Popup>
        </div>
    )
}

export default AssigneesAvatar
