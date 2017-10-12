import * as React from 'react'
import { Segment, Header } from 'semantic-ui-react'

class PageNotFound extends React.Component {
    render() {
        return (
            <Segment inverted={true} color="red">
                <div className="container">
                    <Header as="h2" inverted={true}>
                        That happens not to be a page
                    </Header>
                    <p>Rewind and try another one</p>
                </div>
            </Segment>
        )
    }
}

export default PageNotFound
