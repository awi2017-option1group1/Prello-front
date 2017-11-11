import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators as checkItemsActionsCreators } from '../../redux/checkItems/actions'
import { ICheckItem } from '../../redux/checkItems/types'

import CheckItem from './CheckItem'

interface CheckItemContainerProps {
    checkItem: ICheckItem
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

const mapStateToProps = (state: RootState, ownProps: CheckItemContainerProps) => {
    return {
        checkItem: ownProps.checkItem,
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: CheckItemContainerProps) => {
    // console.log('>>>CHECK_ITEM : ' + ownProps.checkList)
    return {
        loadData: () => {
            dispatch(checkItemsActionsCreators.fetchCheckItem(Number(1)))
        },

        // setTitle: (title: string) => {},
    }
}

const CheckItemContainer = connect<PropsFromState, PropsFromDispatch, CheckItemContainerProps>(
    mapStateToProps,
    mapDispatchToProps
)(CheckItem)

export default CheckItemContainer
