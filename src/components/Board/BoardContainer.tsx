import { connect } from 'react-redux'

import Board from './Board'
import { actionCreators } from '../../redux/boards/actions'
import { RootState, Dispatch } from '../../redux/RootReducer'

import { IList } from '../../redux/lists/types'
import { ITag } from '../../redux/tags/types'
import { IUserRoleInBoard } from '../../redux/boards/types'

const mapStateToProps = (state: RootState) => {
    return { board: state.board }
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

const BoardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Board)

export default BoardContainer
