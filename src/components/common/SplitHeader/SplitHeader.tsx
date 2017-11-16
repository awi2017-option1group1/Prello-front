import * as React from 'react'
import { Header, Grid, GridColumn, SemanticWIDTHS } from 'semantic-ui-react'

interface SplitHeaderProps {
    children: React.ReactNode
    primaryWidth?: SemanticWIDTHS
    secondaryWidth?: SemanticWIDTHS
    semanticHeader?: boolean
}

const SplitHeader: React.StatelessComponent<SplitHeaderProps> = (props) => {
    const content = (
        <Grid columns={2}>
        <GridColumn width={props.primaryWidth || '8'}>
            {props.children![0]}
        </GridColumn>
        <GridColumn textAlign="right" width={props.secondaryWidth || '8'}>
            {props.children![1]}
        </GridColumn>         
    </Grid>
    )
    if (props.semanticHeader) {
        return (
            <Header>
                {content}
            </Header>
        )
    } else {
        return (
            <header>
                {content}
            </header>
        )
    }
}

export default SplitHeader
