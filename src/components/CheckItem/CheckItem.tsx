import * as React from 'react'
import { Grid, GridColumn, Checkbox } from 'semantic-ui-react'

import EditableTitle from '../common/EditableTitle'

import { ICheckItem } from '../../redux/checkItems/types'

import './check-item.css'

export interface CheckItemProps {
    checkItem: ICheckItem

    update: (name: string) => void
    setState: (state: boolean) => void
    delete: () => void
}

class CheckItem extends React.Component<CheckItemProps> {

    render() {
        return (
            <Grid columns={3} className="check-item">
                <GridColumn width={1}>
                    <Checkbox 
                        checked={this.props.checkItem.state} 
                        onChange={(e, data) => this.props.setState(data.checked!)}
                    />
                </GridColumn>
                <GridColumn width={13}>
                    <div className={this.props.checkItem.state ? 'task-completed' : ''}>
                        <EditableTitle
                            content={this.props.checkItem.name}
                            type="p"
                            onSubmit={this.props.update}
                        />
                    </div>
                </GridColumn>
                <GridColumn width={2}>
                    <a href="" onClick={e => { e.preventDefault(); this.props.delete() }}>Delete</a>
                </GridColumn>
            </Grid>
        )
    }
}

export default CheckItem
