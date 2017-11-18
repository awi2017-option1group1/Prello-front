import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/checkListsList/actions'
import { ICheckList } from '../../redux/checkLists/types'

import CheckLists from './CheckLists'

interface CheckListsContainerProps {
    cardId: number
}

interface PropsFromState {
    checkLists: ICheckList[]
    error?: string | null
    loading?: boolean
}

interface PropsFromDispatch {
    loadData?: () => void
}

const mapStateToProps = (state: RootState) => {
    return {
        checkLists: state.checkLists.checkLists,
        error: state.checkLists.error,
        loading: state.checkLists.isProcessing
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: CheckListsContainerProps) => {

    return {
        loadData: () => {
            if (ownProps.cardId !== -1) {
                dispatch(actionCreators.fetchCheckListsFromCardId(ownProps.cardId))
            }
        }
    }
}

const CheckListsContainer = connect<PropsFromState, PropsFromDispatch, CheckListsContainerProps>(
    mapStateToProps,
    mapDispatchToProps
)(CheckLists)

export default CheckListsContainer
