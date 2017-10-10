import * as React from 'react'
import { Image, Popup, PopupContent, PopupHeader, Label } from 'semantic-ui-react'

interface AssigneesAvatarProps {
    assignees: string[]
}

const getPopupHeaderText = (assignees: string[]) => {
    if (assignees.length >= 2) {
        return `${assignees[0]} and ${assignees.length - 1} more`
    } else {
        return assignees[0]
    }
}

const getPopupContent = (assignees: string[]) => assignees.slice(1).map(assignee => (
    <Label image={true} key={assignee}>
        <Image
            size="mini"
            src={`https://semantic-ui.com/images/avatar/large/${assignee}.jpg`}
        />
        {assignee}
    </Label>
))

const AssigneesAvatar: React.StatelessComponent<AssigneesAvatarProps> = (props) => {
    if (props.assignees.length === 0) {
        return null
    }

    const MainAvatar = (
        <div className="right floated">
            <Image 
                avatar={true}
                src={`https://semantic-ui.com/images/avatar/large/${props.assignees[0]}.jpg`}
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
