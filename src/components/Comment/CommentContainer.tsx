import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/comments/actions'
import { IComment } from '../../redux/comments/types'
import { ILoggedUser } from '../../redux/users/types'
import CommentComponent from './Comment'


interface CommentContainerProps {
    comment: IComment
}

interface PropsFromState {
    comment: IComment,
    loggedUser?: ILoggedUser
}

interface PropsFromDispatch {
    delete: () => void
}

const mapStateToProps = (state: RootState, ownProps: CommentContainerProps) => {
    return {
        comment: ownProps.comment,
        loggedUser: state.auth.user!
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: CommentContainerProps) => {
    return {
        delete: () => {
            dispatch(actionCreators.deleteComment(ownProps.comment))
        }
    }
}

const CommentContainer = connect<PropsFromState, PropsFromDispatch, CommentContainerProps>(
    mapStateToProps,
    mapDispatchToProps
)(CommentComponent)

export default CommentContainer
