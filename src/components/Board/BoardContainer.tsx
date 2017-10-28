import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/boards/actions'
import { IBoard } from '../../redux/boards/types'

import Board from './DnDContextBoard'

interface BoardContainerProps {
    match: {
        params: {
            id: string
        }
    }
}

interface PropsFromState {
    board: IBoard
    error?: string | null
    loading?: boolean
}

interface PropsFromDispatch {
    loadData?: () => void
    setTitle: (title: string) => void
}

const mapStateToProps = (state: RootState) => {
    return {
        board: state.board.board,
        error: state.board.error,
        loading: state.board.isProcessing
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: BoardContainerProps) => {
    return {
        loadData: () => { dispatch(actionCreators.fetchBoard(Number(ownProps.match.params.id))) },

        setTitle: (title: string) => {
            return // TODO for Alexis
        }
    }
}

const BoardContainer = withRouter(
    connect<PropsFromState, PropsFromDispatch, {}>(
        mapStateToProps,
        mapDispatchToProps
    )(Board)
)

export default BoardContainer
