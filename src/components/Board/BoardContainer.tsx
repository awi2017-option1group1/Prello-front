import { connect } from 'react-redux'

import Board from './Board'
import { actionCreators } from '../../redux/boards/action'
import { RootState, Dispatch } from '../../redux/RootReducers'
import { IList } from '../../redux/lists/types'
import { ITag } from '../../redux/tags/types'

const mapStateToProps = (state: RootState) => {
    return { board: state.board }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        create: (id: number, title: string, isPrivate: boolean, lists: IList[], tags: ITag[]) => {
            dispatch(actionCreators.createBoard(id, title, isPrivate, lists, tags))
        },
        delete: (index: number) => {
            dispatch(actionCreators.removeBoard(index))
        }
    }
}

const BoardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Board)

export default BoardContainer
