import * as React from 'react'
import { CommentGroup } from 'semantic-ui-react'

import Comment from '../Comment/'

import './comments-list.css'

export interface CommentsListProps {
    comments: number[]
    emptyText: string
}

const CommentsList: React.StatelessComponent<CommentsListProps> = (props) => (
    <CommentGroup className="comments-list">
        {!props.comments.length && <p className="comments-list comments-list-no-content">{props.emptyText}</p>}
        {props.comments.map(id => <Comment id={id} key={id} />)}
    </CommentGroup>
)

export default CommentsList
