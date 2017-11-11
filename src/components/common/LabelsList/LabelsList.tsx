import * as React from 'react'
import { Label as SmLabel, Popup, PopupContent } from 'semantic-ui-react'

import Label from '../Label'

import { ITag } from '../../../redux/tags/types'

interface LabelsListProps {
    labels: ITag[]
    maxToDisplay?: number
}

const arrayToElements = (array: ITag[]) => array.map(label => (
    <Label label={label} key={label.id} />
))

const LabelsList: React.StatelessComponent<LabelsListProps> = (props) => {
    const splitIndex = props.maxToDisplay || props.labels.length
    const toDisplay = props.labels.slice(0, splitIndex)
    const others =  props.labels.slice(splitIndex)

    return (
        <div>
            {arrayToElements(toDisplay)}
            {others.length > 0 && 
                <Popup trigger={<SmLabel icon="ellipsis horizontal" />}>
                    <PopupContent>
                        {arrayToElements(others)}
                    </PopupContent>
                </Popup>
            }
        </div>
    )
}

export default LabelsList
