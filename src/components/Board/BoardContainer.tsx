import * as React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import Board, { BoardProps } from './Board'
import { actionCreators } from '../../redux/boards/actions'
import { RootState, Dispatch } from '../../redux/RootReducer'
import store from '../../redux/store'

import { IList } from '../../redux/lists/types'
import { ITag } from '../../redux/tags/types'
import { IUserRoleInBoard } from '../../redux/boards/types'

const mapStateToProps = (state: RootState) => {
    return {
        board: state.board
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        create: (   id: number,
                    title: string,
                    isPrivate: boolean,
                    lists: IList[],
                    tags: ITag[],
                    userRole: IUserRoleInBoard[]) => {
            dispatch(actionCreators.createBoardRequest(title, isPrivate, lists, tags, userRole))
        },
        delete: (index: number) => {
            dispatch(actionCreators.removeBoardRequest(index))
        },
        setTitle: (title: string) => {
            return // TODO for Alexis
        }
    }
}

class BoardContainer extends React.Component<BoardProps> {
    componentWillMount() {
        store.dispatch(actionCreators.fetchBoard(this.props.match!.params.id))
    }

    render() {
        return <Board {...this.props} />
    }
}

const boardContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardContainer))

export default boardContainer
