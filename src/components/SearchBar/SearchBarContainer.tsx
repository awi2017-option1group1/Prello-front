import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { RootState, Dispatch } from '../../redux/RootReducer'

import { actionCreators } from '../../redux/search/actions'

import SearchBar from './SearchBar'

import { ISearchCategory, ISearchObject } from '../../redux/search/types'

interface SearchBarContainerProps {
    userID: number
}

interface PropsFromState {
    categories: ISearchCategory[]
    
    isProcessing: boolean,
    value: string,
}

interface PropsFromDispatch {
    resetComponent: () => void
    resultSelect: (result: ISearchObject) => void
    searchChange: (value: string) => void
}

const mapStateToProps = (state: RootState,  ownProps: SearchBarContainerProps) => {
    return {
        categories: state.search.categories,
        isProcessing: state.search.isProcessing,
        value: state.search.value
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: SearchBarContainerProps) => {
    return {
        resetComponent: () => dispatch(actionCreators.reset()),

        resultSelect: (result: ISearchObject) => dispatch(actionCreators.resultSelect(result)),

        searchChange: (value: string) => dispatch(actionCreators.fetchCategories(ownProps.userID, value)) // userID ? 
    }
}

const SearchBarContainer = withRouter(
    connect<PropsFromState, PropsFromDispatch, SearchBarContainerProps>(
        mapStateToProps,
        mapDispatchToProps
    )(SearchBar)
)

export default SearchBarContainer
