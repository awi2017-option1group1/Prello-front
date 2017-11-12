import * as React from 'react'
import { Menu } from 'semantic-ui-react'

import { ITag } from '../../redux/tags/types'

import LabelAssignForm from '../LabelAssignForm'

export interface LabelsSegmentProps {
    boardLabels: ITag[]
    cardLabels: ITag[]

    addLabel: (label: ITag) => void
    createAndAddLabel: (name: string) => void
    removeLabel: (label: ITag) => void
}

const LabelsSegment: React.StatelessComponent<LabelsSegmentProps> = (props) => {
    return (
        <div>
            <h3>Labels</h3>
            <Menu.Item>
                <LabelAssignForm {...props} />
            </Menu.Item>
        </div>
    )
}

export default LabelsSegment
