import * as React from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'

interface SplitHeaderProps {
    children: React.ReactNode
}

const SplitHeader: React.StatelessComponent<SplitHeaderProps> = (props) => (
    <header>
        <Grid columns={2}>
            <GridColumn>
                {props.children![0]}
            </GridColumn>
            <GridColumn textAlign="right">
                {props.children![1]}
            </GridColumn>         
        </Grid>
    </header>
)

export default SplitHeader
