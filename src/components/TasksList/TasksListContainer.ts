import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators as boardsActionCreators } from '../../redux/boards/actions'
import { actionCreators as listsActionCreators } from '../../redux/lists/actions'
import { IList } from '../../redux/lists/types'

import TasksList from './DraggableTasksList'

interface TasksListsContainerProps {
    list: IList
}

interface PropsFromState {
    list: IList
    size: number
}

interface PropsFromDispatch {
    openCreateCardModal: () => void
    setTitle: (title: string) => void
    delete: () => void
}

const mapStateToProps = (state: RootState, ownProps: TasksListsContainerProps) => {
    return {
        list: ownProps.list,
        size: state.cards[ ownProps.list.id].cards.length
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: TasksListsContainerProps) => {
    return {
        openCreateCardModal: () => {
            dispatch(boardsActionCreators.openCreateCardModal(ownProps.list))
        },

        setTitle: (title: string) => {
            dispatch(listsActionCreators.updateBoardList(ownProps.list, { name: title }))
        },

        delete: () => {
            dispatch(listsActionCreators.deleteBoardList(ownProps.list))
        }
    }
}

const TasksListsContainer = connect<PropsFromState, PropsFromDispatch, TasksListsContainerProps>(
    mapStateToProps,
    mapDispatchToProps
)(TasksList)

export default TasksListsContainer
