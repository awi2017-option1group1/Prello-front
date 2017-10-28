import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { IList } from '../../redux/lists/types'

import TasksList from './TasksList'

interface TasksListsContainerProps {
    list: IList
}

interface PropsFromState {
    // TODO
}

interface PropsFromDispatch {
    setTitle: (title: string) => void
}

const mapStateToProps = (state: RootState, ownProps: TasksListsContainerProps) => {
    return {
        list: ownProps.list
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setTitle: (title: string) => {
            return
        }
    }
}

const TasksListsContainer = connect<PropsFromState, PropsFromDispatch, TasksListsContainerProps>(
    mapStateToProps,
    mapDispatchToProps
)(TasksList)

export default TasksListsContainer
