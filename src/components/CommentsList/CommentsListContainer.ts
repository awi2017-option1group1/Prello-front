import { connect } from 'react-redux'

import { RootState, Dispatch } from '../../redux/RootReducer'
import { actionCreators } from '../../redux/comments/actions'
import { IComment } from '../../redux/comments/types'

import CommentsList from './CommentsList'

interface CommentsListContainerProps {
    cardId: number
}

interface PropsFromState {
    comments: IComment[]
    error?: string | null
    loading?: boolean
}

interface PropsFromDispatch {
    loadData?: () => void/*
    delete: (commentToDelete: IComment) => void*/
    createComment: (content: string) => void
}

const mapStateToProps = (state: RootState) => {
    return {
        comments: state.comments.comments,
        error: state.comments.error,
        loading: state.comments.isProcessing,
        emptyText: 'No content'
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: CommentsListContainerProps) => {
    return {
        loadData: () => {
            if (ownProps.cardId) {
                dispatch(actionCreators.fetchCommentsList(ownProps.cardId))
            }
        },
        createComment: (content: string) => {
            dispatch(actionCreators.createComment({content: content}))
        }
    }
}

const CommentsListContainer = connect<PropsFromState, PropsFromDispatch, CommentsListContainerProps>(
    mapStateToProps,
    mapDispatchToProps
)(CommentsList)

export default CommentsListContainer
