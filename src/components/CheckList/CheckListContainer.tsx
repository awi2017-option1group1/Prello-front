import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators as checkListsActionsCreators } from '../../redux/checkList/actions'
import { ICheckList } from '../../redux/checkLists/types'

interface CheckListContainerProps {
    checkList: ICheckList
}

interface PropsFromState {
    checkList: ICheckList
    error?: string | null
    loading?: boolean
}

interface PropsFromDispatch {
    loadData?: () => void
    setTitle: (title: string) => void
    delete: () => void
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
        loadData: () => { dispatch(checkListsActionsCreators.fetchCheckList(Number(ownProps.checkList.id))) },

        setTitle: (title: string) => {
            dispatch(checkListsActionsCreators.updateCheckListTitle(Number(ownProps.checkList.id), {name: title}))
        },

        addCheckList: () => {
            dispatch(checkListsActionsCreators.createCheckList(Number(ownProps.match.params.id)))
        },
        
        delete: () => {
            dispatch(checkListsActionsCreators.removeCheckList(ownProps.checkList))
        },
    }
}

const CheckListContainer = connect<PropsFromState, PropsFromDispatch, CheckListContainerProps>(
    mapStateToProps,
    mapDispatchToProps
)(CheckList)

export default CheckListContainer
