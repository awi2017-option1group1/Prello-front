import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators as checkListsActionsCreators } from '../../redux/checkList/actions'
import { ICheckList } from '../../redux/checkLists/types'
import { ICard } from '../../redux/cards/types'

interface CheckListContainerProps {
    card: ICard
}

interface PropsFromState {
    checkList: ICheckList
    error?: string | null
    loading?: boolean
}

interface PropsFromDispatch {
    loadData?: () => void
    setTitle: (title: string) => void
}

const mapStateToProps = (state: RootState) => {
    return {
        checkList: state.checkList.checkList,
        error: state.checkList.error,
        loading: state.checkList.isProcessing
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: CheckListContainerProps) => {
    return {
        // loadData: () => { dispatch(checkListsActionsCreators.fetchCheckList(Number(ownProps.match.params.id))) },
        loadData: () => { dispatch(checkListsActionsCreators.fetchCheckList(Number(4))) },

        setTitle: (title: string) => {
            dispatch(checkListsActionsCreators.updateCheckListTitle(Number(4), {name: title}))
        },

        addCheckList: () => {
            dispatch(checkListsActionsCreators.createCheckList(Number(ownProps.match.params.id)))
        },
    }
}

const CheckListContainer = withRouter(
    connect<PropsFromState, PropsFromDispatch, {}>(
        mapStateToProps,
        mapDispatchToProps
    )(CheckList)
)

export default CheckListContainer
