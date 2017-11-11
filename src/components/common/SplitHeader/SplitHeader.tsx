import * as React from 'react'
import { Grid, GridColumn, SemanticWIDTHS } from 'semantic-ui-react'

interface SplitHeaderProps {
    children: React.ReactNode
    primaryWidth?: SemanticWIDTHS
    secondaryWidth?: SemanticWIDTHS
}

const SplitHeader: React.StatelessComponent<SplitHeaderProps> = (props) => (
    <header>
        <Grid columns={2}>
            <GridColumn width={props.primaryWidth || '8'}>
                {props.children![0]}
            </GridColumn>
            <GridColumn textAlign="right" width={props.secondaryWidth || '8'}>
                {props.children![1]}
            </GridColumn>         
        </Grid>
    </header>
)

export default SplitHeader
