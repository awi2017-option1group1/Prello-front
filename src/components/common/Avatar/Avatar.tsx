import * as React from 'react'
import { Label, Icon } from 'semantic-ui-react'

import { IUser } from '../../../redux/users/types'

interface AvatarProps {
    user: IUser
    onDelete?: (assignee: IUser) => void
}
const Avatar: React.StatelessComponent<AvatarProps> = (props) => {
    return (
        <Label 
            circular={true} 
            color="olive" 
            size="large" 
            className="initial" 
        >
            {props.user.username.substring(0, 1).toUpperCase()}
            {props.onDelete && <Icon name="delete" onClick={() => props.onDelete!(props.user)} />}
        </Label>
    )
}

export default Avatar
