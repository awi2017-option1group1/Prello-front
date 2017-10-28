import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/lists/actions'
import { IList } from '../../redux/lists/types'

import TasksLists from './TasksLists'

interface TasksListsContainerProps {
    boardId: number
}

interface PropsFromState {
    lists: IList[]
    error?: string | null
    loading?: boolean
}

interface PropsFromDispatch {
    loadData?: () => void
}

const mapStateToProps = (state: RootState) => {
    return {
        lists: state.lists.lists,
        error: state.lists.error,
        loading: state.lists.isProcessing
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: TasksListsContainerProps) => {
    return {
        loadData: () => { 
            if (ownProps.boardId !== -1) {
                dispatch(actionCreators.fetchBoardLists(ownProps.boardId)) 
            }
        }
    }
}

const TasksListsContainer = connect<PropsFromState, PropsFromDispatch, TasksListsContainerProps>(
    mapStateToProps,
    mapDispatchToProps
)(TasksLists)

export default TasksListsContainer
