import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/checkItemsList/actions'
import { ICheckItem } from '../../redux/checkItems/types'

import CheckItems from './CheckItems'

interface CheckItemsContainerProps {
    checkListId: number
}

interface PropsFromState {
    checkItems: ICheckItem[]
    error?: string | null
    loading?: boolean
}

interface PropsFromDispatch {
    loadData?: () => void
}

const mapStateToProps = (state: RootState) => {
    return {
        checkItems: state.checkItems.checkItems,
        error: state.checkItems.error,
        loading: state.checkItems.isProcessing
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: CheckItemsContainerProps) => {

    return {
        loadData: () => {
            if (ownProps.checkListId !== -1) {
                dispatch(actionCreators.fetchCheckItemsFromCheckListId(ownProps.checkListId))
            }
        }
    }
}

const CheckItemsContainer = connect<PropsFromState, PropsFromDispatch, CheckItemsContainerProps>(
    mapStateToProps,
    mapDispatchToProps
)(CheckItems)

export default CheckItemsContainer
