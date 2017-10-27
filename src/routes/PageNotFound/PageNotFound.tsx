import * as React from 'react'
import { Segment, Header } from 'semantic-ui-react'

class PageNotFound extends React.Component {
    render() {
        return (
            <Segment inverted={true} color="red" className="bg-segment">
                <Header as="h2" inverted={true} textAlign="center">
                    That happens not to be a page
                </Header>
                <Header as="h3" inverted={true} textAlign="center">
                    Rewind and try another one
                </Header>
            </Segment>
        )
    }
}

export default PageNotFound
