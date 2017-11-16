import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/checkItemsList/actions'
import { ICheckItem } from '../../redux/checkItems/types'

import CheckItems from './CheckItems'

interface CheckItemsContainerProps {
    checkListId: number
}

interface PropsFromState {
    checkListId: number
    checkItems: ICheckItem[]
    error?: string | null
    loading?: boolean
}

interface PropsFromDispatch {
    loadData?: () => void
}

const mapStateToProps = (state: RootState, ownProps: CheckItemsContainerProps) => {
    if (ownProps.checkListId) {
        return {
            checkListId: ownProps.checkListId,
            checkItems: state.checkItems[ownProps.checkListId].items,
            error: state.checkItems[ownProps.checkListId].error,
            loading: state.checkItems[ownProps.checkListId].isProcessing
        }
    } else {
        return {
            checkListId: ownProps.checkListId,
            checkItems: [],
            error: null,
            loading: false
        }
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
