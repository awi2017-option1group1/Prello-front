import * as React from 'react'
import { Comment as SmComment, Segment } from 'semantic-ui-react'

import { StateProps } from '../StateProps'

import { IComment } from '../../redux/comments/types'
import { ILoggedUser } from '../../redux/users/types'

import Spinner from '../common/Spinner'

import './comment.css'

export interface CommentProps extends StateProps {
    comment: IComment
    loggedUser?: ILoggedUser

    delete: () => void
}
  
const CommentComponent: React.StatelessComponent<CommentProps> = (props) => {
    if (props.loading) {
        return (
            <Segment className="comment">
                <Spinner />
            </Segment>
        )
    }

    // A user can only delete its OWN comment(s)
    const deleteIcom = (props.loggedUser!.uid === props.comment.userId) ? (
        <SmComment.Action onClick={props.delete}>Delete</SmComment.Action>
    ) : ''

    function timeSince(date: Date): string {
        var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
        var interval = Math.floor(seconds / 31536000)
        if (interval > 1) {
          return interval + ' years'
        }
        interval = Math.floor(seconds / 2592000)
        if (interval > 1) {
          return interval + ' months'
        }
        interval = Math.floor(seconds / 86400)
        if (interval > 1) {
          return interval + ' days'
        }
        interval = Math.floor(seconds / 3600)
        if (interval > 1) {
          return interval + ' hours'
        }
        interval = Math.floor(seconds / 60)
        if (interval > 1) {
          return interval + ' minutes'
        }
        return Math.floor(seconds) + ' seconds'
    }

    return (
        <SmComment>
            <SmComment.Content>
                <SmComment.Author> {props.comment.userName} </SmComment.Author>
                <SmComment.Metadata>
                    <div> {timeSince(props.comment.createdDate) + ' ' + 'ago'} </div>
                </SmComment.Metadata>
                <SmComment.Text> {props.comment.content} </SmComment.Text>
                <SmComment.Actions>
                    {deleteIcom}
                </SmComment.Actions>
            </SmComment.Content>
        </SmComment>
    )
}

export default CommentComponent
