import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators as boardsListActionsCreators } from '../../redux/boardsList/actions'
import { IBoard } from '../../redux/boards/types'
import { ILoggedUser } from '../../redux/users/types'

import BoardsList from './BoardsList'

interface PropsFromState {
    boards: IBoard[]
    error?: string | null
    loading?: boolean,
    connectedUser: ILoggedUser
}

interface PropsFromDispatch {
    loadData?: () => void
    addBoard: () => void
}

const mapStateToProps = (state: RootState) => {
    return {
        boards: state.boardsList.boards,
        error: state.boardsList.error,
        loading: state.boardsList.isProcessing,
        connectedUser: state.auth.user!
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loadData: () => { dispatch(boardsListActionsCreators.fetchBoards()) },

        addBoard: () => {
            dispatch(boardsListActionsCreators.createBoard())
        },
    }
}

const BoardContainer = withRouter(
    connect<PropsFromState, PropsFromDispatch, {}>(
        mapStateToProps,
        mapDispatchToProps
    )(BoardsList)
)

export default BoardContainer
