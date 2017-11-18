import * as React from 'react'
import { CommentGroup, Form, Button } from 'semantic-ui-react'

import { StateProps } from '../StateProps'
import { IComment } from '../../redux/comments/types'

// import Spinner from '../common/Spinner'
import Comment from '../Comment'
import Spinner from '../common/Spinner'

import './comments-list.css'

export interface CommentsListProps extends StateProps {
    cardId: number
    comments: IComment[]

    createComment: (content: String) => void
}

class CommentsList extends React.Component<CommentsListProps> {
    constructor(props: CommentsListProps) {
        super(props)
    }

    componentDidMount() {
        this.props.loadData!()
    }

    render() {
        let commentToAdd = ''

        const addComment = () => {
            if (commentToAdd.length !== 0) {
                this.props.createComment(commentToAdd)
            }
        }

        if (this.props.loading) {
            return (
                <CommentGroup className="cards-list">
                    <Spinner />
                </CommentGroup>
            )
        }

        return (
            <CommentGroup className="comments-list">
                {
                    !this.props.comments.length &&
                    <div className="comments-list comments-list-no-content">
                        No comments yet !
                    </div>
                }
                {this.props.comments.map(comment =>
                    <Comment comment={comment} key={comment.id}/>
                )}
                <Form reply={true}>
                    <Form.TextArea
                        onChange={(e, data) => {
                            const value = data.value
                            if (typeof value === 'string') {
                                commentToAdd = value
                            }
                        }}
                    />
                    <Button content="Comment" labelPosition="left" icon="edit" primary={true} onClick={addComment}/>
                </Form>
            </CommentGroup>
        )
    }
}

export default CommentsList
