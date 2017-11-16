import * as React from 'react'
import { Grid, Search } from 'semantic-ui-react'

import { ISearchCategory, ISearchObject } from '../../redux/search/types'

interface SearchBarProps {
    categories: ISearchCategory[]
    isProcessing: boolean,
    value: string,
    
    resetComponent: () => void
    resultSelect: (result: ISearchObject) => void
    searchChange: (value: string) => void
}
const SearchBar: React.StatelessComponent<SearchBarProps> = (props) => {
    return (
       <Grid>
         <Grid.Column width={8}>
           <Search
                category
                loading={props.isProcessing}
                onResultSelect={() => props.resultSelect}
                onSearchChange={() => props.searchChange}
                results={props.categories}
                value={props.value}
           />
         </Grid.Column>
       </Grid>
     )
}

export default SearchBar
