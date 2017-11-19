import * as React from 'react'
import { CommentGroup, Form, Header, Segment } from 'semantic-ui-react'

import { StateProps } from '../StateProps'
import { IComment } from '../../redux/comments/types'

import EditableMarkdown from '../common/EditableMarkdown'
import Comment from '../Comment'
import Spinner from '../common/Spinner'

import './comments-list.css'

export interface CommentsListProps extends StateProps {
    cardId: number
    comments: IComment[]

    createComment: (content: String) => void
}

export interface CommentsLisState {
    isWriting: boolean
}

class CommentsList extends React.Component<CommentsListProps, CommentsLisState> {
    constructor(props: CommentsListProps) {
        super(props)
        this.state = {
            isWriting: false
        }
    }

    componentDidMount() {
        this.props.loadData!()
    }

    renderIntroForm() {
        return (
            <Form reply={true}>
                <Form.TextArea
                    onFocus={() => this.setState({ isWriting: true })}
                    size="small"
                    placeholder="Add a comment..."
                />
            </Form>
        )
    }

    renderMarkdownForm() {
        return (
            <Segment>
                <EditableMarkdown 
                    editing={true}
                    content="" 
                    onSubmit={(content) => {
                        this.props.createComment(content)
                        this.setState({ isWriting: false })
                    }} 
                    onCancel={() => this.setState({ isWriting: false })}
                />
            </Segment>
        )
    }

    render() {
        if (this.props.loading) {
            return (
                <CommentGroup className="cards-list">
                    <Spinner />
                </CommentGroup>
            )
        }

        return (
            <CommentGroup className="comments-list">
                <Header as="h3" dividing={true}>Comments ({this.props.comments.length})</Header>
                {
                    !this.props.comments.length &&
                    <div className="comments-list comments-list-no-content">
                        No comments yet !
                    </div>
                }
                {this.props.comments.map(comment =>
                    <Comment comment={comment} key={comment.id || -1}/>
                )}
                {!this.state.isWriting && this.renderIntroForm()}
                {this.state.isWriting && this.renderMarkdownForm()}
            </CommentGroup>
        )
    }
}

export default CommentsList
