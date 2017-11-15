import * as React from 'react'
import { Dropdown } from 'semantic-ui-react'

import { semanticColors } from '../../../helpers/color'

const options = semanticColors.map(color => ({
    key: color, 
    text: color, 
    value: color
}))

export interface ColorSelectListProps {
    value: string
    onSubmit: (color: string) => void
}

const ColorSelectList: React.StatelessComponent<ColorSelectListProps> = (props) => (
    <Dropdown
        search={true}
        selection={true}
        options={options}
        value={props.value}
        onChange={(event, data) => props.onSubmit(data.value as string)}
    />
)

export default ColorSelectList
