import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators as checkItemsActionsCreators } from '../../redux/checkItems/actions'
import { ICheckItem } from '../../redux/checkItems/types'
import { ICheckList } from '../../redux/checkLists/types'

import CheckItem from './CheckItem'

interface CheckItemContainerProps {
    checkList: ICheckList
}

interface PropsFromState {
    checkItem: ICheckItem
    error?: string | null
    loading?: boolean
}

interface PropsFromDispatch {
    loadData?: () => void
    // setTitle: (title: string) => void
}

const mapStateToProps = (state: RootState) => {
    return {
        checkItem: state.checkItem.checkItem,
        error: state.checkItem.error,
        loading: state.checkItem.isProcessing
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: CheckItemContainerProps) => {
    console.log('>>>CHECK_ITEM : ' + ownProps.checkList)

    return {
        loadData: () => { dispatch(checkItemsActionsCreators.fetchCheckItem(Number(1))) },

        // setTitle: (title: string) => {},
    }
}

const CheckItemContainer = withRouter(
    connect<PropsFromState, PropsFromDispatch, {}>(
        mapStateToProps,
        mapDispatchToProps
    )(CheckItem)
)

export default CheckItemContainer
