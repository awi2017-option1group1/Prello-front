import * as React from 'react'
import { Label as SmLabel, SemanticCOLORS, Icon } from 'semantic-ui-react'

import { semanticColors } from '../../../helpers/color'

import { ITag } from '../../../redux/tags/types'

export interface LabelProps {
    label: ITag
    empty?: boolean
    className?: string

    onDelete?: (label: ITag) => void
}

const Label: React.StatelessComponent<LabelProps> = (props) => {
    const empty = props.empty || false
    const color = semanticColors.indexOf(props.label.color) !== -1 
        ? { color: props.label.color as SemanticCOLORS }
        : { style: { backgroundColor: props.label.color } } 

    if (empty) {
        return (
            <div><SmLabel {...color} empty={true} circular={true} /> {props.label.name}</div>
        )       
    } else {
        return (
            <SmLabel {...color} className={props.className}>
                {props.label.name}
                {props.onDelete && <Icon name="delete" onClick={() => props.onDelete!(props.label)} />}
            </SmLabel> 
        ) 
    }
} 

export default Label
