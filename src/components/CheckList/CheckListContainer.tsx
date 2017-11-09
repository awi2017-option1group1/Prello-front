import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators as checkListsActionsCreators } from '../../redux/checkList/actions'
import { ICheckList } from '../../redux/checkLists/types'

interface CheckListContainerProps {
    match: {
        params: {
            id: string
        }
    }
}

interface PropsFromState {
    checkList: ICheckList
    error?: string | null
    loading?: boolean
}

interface PropsFromDispatch {
    loadData?: () => void
    setTitle: (title: string) => void
    addCheckItem: () => void
}

const mapStateToProps = (state: RootState) => {
    // console.log("STATE MAP PROPS : " + state.checkList.checkList)
    return {
        checkList: state.checkList.checkList,
        error: state.checkList.error,
        loading: state.checkList.isProcessing
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: CheckListContainerProps) => {
    return {
        // loadData: () => { dispatch(checkListsActionsCreators.fetchCheckList(Number(ownProps.match.params.id))) },
        loadData: () => { dispatch(checkListsActionsCreators.fetchCheckList(Number(3))) },

        setTitle: (title: string) => {
            dispatch(checkListsActionsCreators.updateCheckListTitle(Number(3), {name: title}))
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
