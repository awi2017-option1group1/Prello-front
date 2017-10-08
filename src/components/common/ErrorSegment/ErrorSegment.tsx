import * as React from 'react'
import { Segment } from 'semantic-ui-react'

interface ErrorSegmentProps {
    error: string | null
}

const ErrorSegment: React.StatelessComponent<ErrorSegmentProps> = (props) => {
    if (props.error) {
        return (
            <Segment inverted={true} color="red">
                {props.error}
            </Segment>
        )
    } else {
        return null
    }
}

export default ErrorSegment
