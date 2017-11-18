import * as React from 'react'
import { Comment as SmComment, Segment } from 'semantic-ui-react'
import * as moment from 'moment'

import { StateProps } from '../StateProps'

import { IComment } from '../../redux/comments/types'
import { ILoggedUser } from '../../redux/users/types'
import EditableMarkdown from '../common/EditableMarkdown'
import Avatar from '../common/Avatar'
import Spinner from '../common/Spinner'

import './comment.css'

export interface CommentProps extends StateProps {
    comment: IComment
    loggedUser?: ILoggedUser

    delete: () => void
    setContent: (currentComment: IComment, newValues: Partial<IComment>) => void
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
    const deleteIcom = (props.loggedUser!.uid === props.comment.user.id) ? (
        <SmComment.Action onClick={props.delete}>Delete</SmComment.Action>
    ) : ''

    const timeSinceLastChange = (props.comment.updatedDate !== props.comment.createdDate ) ? (
        <div>Last edited {timeSince(props.comment.updatedDate)}</div>
    ) : (
        <div>{timeSince(props.comment.createdDate)}</div>
    )

    function timeSince(date: Date): string {
        return moment(date, moment.ISO_8601).fromNow()
    }

    return (
        <SmComment>
            <SmComment.Content>
                <SmComment.Author><Avatar user={props.comment.user}/> {props.comment.user.username} </SmComment.Author>
                <SmComment.Metadata>
                    {timeSinceLastChange}
                </SmComment.Metadata>
                <EditableMarkdown
                        content={props.comment.content}
                        onSubmit={(desc: string) => props.setContent(props.comment, { content: desc })}
                />
                <SmComment.Actions>
                    {deleteIcom}
                </SmComment.Actions>
            </SmComment.Content>
        </SmComment>
    )
}

export default CommentComponent
