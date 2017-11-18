import * as React from 'react'
import { Label, Icon, SemanticCOLORS } from 'semantic-ui-react'

import { IUser, ILoggedUser } from '../../../redux/users/types'

interface AvatarProps {
    user: IUser | ILoggedUser
    onDelete?: (assignee: IUser | ILoggedUser) => void
}

const Avatar: React.StatelessComponent<AvatarProps> = (props) => {
    return (
        <Label 
            circular={true} 
            color={props.user.avatarColor as SemanticCOLORS}
            size="large" 
            className="initial" 
        >
            {props.user.username.substring(0, 1).toUpperCase()}
            {props.onDelete && <Icon name="delete" onClick={() => props.onDelete!(props.user)} />}
        </Label>
    )
}

export default Avatar
