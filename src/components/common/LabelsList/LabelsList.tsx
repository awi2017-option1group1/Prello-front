import * as React from 'react'
import { Label, Popup, PopupContent } from 'semantic-ui-react'

import LabelModel from '../../../models/Label'

interface LabelsListProps {
    labels: LabelModel[]
    maxToDisplay?: number
}

const arrayToElements = (array: LabelModel[]) => array.map(label => (
    <Label color={label.color} key={label.title}>{label.title}</Label> 
))

const LabelsList: React.StatelessComponent<LabelsListProps> = (props) => {
    const splitIndex = props.maxToDisplay || props.labels.length
    const toDisplay = props.labels.slice(0, splitIndex)
    const others =  props.labels.slice(splitIndex)

    return (
        <div>
            {arrayToElements(toDisplay)}
            {others.length > 0 && 
                <Popup trigger={<Label icon="ellipsis horizontal" />}>
                    <PopupContent>
                        {arrayToElements(others)}
                    </PopupContent>
                </Popup>
            }
        </div>
    )
}

export default LabelsList
