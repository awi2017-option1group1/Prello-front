import * as React from 'react'
import { Comment as SmComment, CommentContent, CommentAuthor, CommentMetadata,
    CommentText } from 'semantic-ui-react'

import { StateProps } from '../StateProps'

import CommentModel from '../../models/Comment'

import './comment.css'

export interface CommentProps extends StateProps {
    id: number
    comment: CommentModel
}
  
const Comment: React.StatelessComponent<CommentProps> = (props) => {

    return (

        <SmComment>
            <CommentContent>  
                <CommentAuthor>
                    {props.comment.user.firstName + props.comment.user.lastName}
                </CommentAuthor>
                <CommentMetadata>
                    <CommentText>
                        {
                            props.comment.date         
                            // TODO: calculate difference between now and the creation date               
                        }
                    </CommentText>
                </CommentMetadata>
                <CommentText>
                    {props.comment.content}
                </CommentText>
            </CommentContent>
        </SmComment>
    )
}

export default Comment
