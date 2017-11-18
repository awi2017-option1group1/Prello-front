import * as React from 'react'
import { Grid, Search, SearchResultData } from 'semantic-ui-react'

import { ISearchCategory } from '../../redux/search/types'

interface SearchBarProps {
    categories: ISearchCategory,
    isProcessing: boolean,
    value: string,
    
    resetComponent: () => void
    resultSelect: (result: SearchResultData) => void
    searchChange: (value: string) => void
}

const SearchBar: React.StatelessComponent<SearchBarProps> = (props) => {

    return (
       <Grid>
         <Grid.Column width={8}>
           <Search
                category={true}
                loading={props.isProcessing}
                onResultSelect={(e, result) => props.resultSelect(result)}
                onSearchChange={(e, data) => {
                  if (data.value!.length < 1) {
                    props.resetComponent()
                  } else {
                    props.searchChange(data.value!)
                  }
                }}
                results={props.categories}
                value={props.value}
           />
         </Grid.Column>
       </Grid>
     )
}

export default SearchBar
