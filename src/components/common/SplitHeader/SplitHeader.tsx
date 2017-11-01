import * as React from 'react'
import { Grid, GridColumn, SemanticWIDTHS } from 'semantic-ui-react'

interface SplitHeaderProps {
    widthMainCol?: SemanticWIDTHS
    widthOtherCol?: SemanticWIDTHS
    children: React.ReactNode
}

const SplitHeader: React.StatelessComponent<SplitHeaderProps> = (props) => {
    let [ widthMainCol, widthOtherCol ]: Array<SemanticWIDTHS> = [8, 8]
    if (props.widthMainCol) {
        widthMainCol = props.widthMainCol
    }
    if (props.widthOtherCol) {
        widthOtherCol = props.widthOtherCol
    }

    return (
        <header>
            <Grid columns={2}>
                <GridColumn width={widthMainCol}>
                    {props.children![0]}
                </GridColumn>
                <GridColumn textAlign="right" width={widthOtherCol}>
                    {props.children![1]}
                </GridColumn>         
            </Grid>
        </header>
    )
}
export default SplitHeader
