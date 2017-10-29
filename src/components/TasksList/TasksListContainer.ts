import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/lists/actions'
import { IList } from '../../redux/lists/types'

import TasksList from './TasksList'

interface TasksListsContainerProps {
    list: IList
}

interface PropsFromState {
    list: IList
}

interface PropsFromDispatch {
    setTitle: (title: string) => void
    delete: () => void
}

const mapStateToProps = (state: RootState, ownProps: TasksListsContainerProps) => {
    return {
        list: ownProps.list
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: TasksListsContainerProps) => {
    return {
        setTitle: (title: string) => {
            dispatch(actionCreators.updateBoardList(ownProps.list, { name: title }))
        },

        delete: () => {
            dispatch(actionCreators.deleteBoardList(ownProps.list))
        }
    }
}

const TasksListsContainer = connect<PropsFromState, PropsFromDispatch, TasksListsContainerProps>(
    mapStateToProps,
    mapDispatchToProps
)(TasksList)

export default TasksListsContainer
