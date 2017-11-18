import * as React from 'react'
import * as _ from 'lodash'
import { Dropdown, Segment } from 'semantic-ui-react'

import Label from '../common/Label'

import { ITag } from '../../redux/tags/types'

import './label-assign-form.css'

export interface LabelAssignFormProps {
    boardLabels: ITag[]
    cardLabels: ITag[]

    addLabel: (label: ITag) => void
    createAndAddLabel: (name: string) => void
    removeLabel: (label: ITag) => void
}

const LabelAssignForm: React.StatelessComponent<LabelAssignFormProps> = (props) => {
    const options = _.differenceBy(props.boardLabels, props.cardLabels, 'id')
        .map(l => ({
            key: l.id,
            text: l.name,
            value: l.id,
            content: <Label label={l} empty={true} />
        }))
    return (
        <div>
            <Dropdown
                options={options}
                placeholder="Choose Label"
                selection={true}
                allowAdditions={true}
                search={true}
                fluid={true}
                onChange={(e, data) => {
                    const value = data.value![0]
                    // If the value is a number => user have picks up an existing label
                    if (typeof data.value![0] === 'number') {
                        const label = props.boardLabels.find(l => l.id === value)
                        if (label) {
                            props.addLabel(label)
                        }
                    } else {
                        props.createAndAddLabel(value)
                    }
                }}
                selectOnNavigation={false}
                value={[]}
                multiple={true} // Use multiple to avoid selection issues
                closeOnChange={true}
            />
            <Segment basic={true} className="label-modal-segment">
                {props.cardLabels.length === 0 && 'No labels yet!'}
                {props.cardLabels.map(l => (
                    <Label label={l} key={l.id || -1} onDelete={props.removeLabel} className="label-modal" />
                ))}
            </Segment>
        </div>
    )
}

export default LabelAssignForm
