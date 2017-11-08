import * as React from 'react'
import { Container } from 'semantic-ui-react'

import BoardsList from '../../components/BoardsList'

class BoardsListPage extends React.Component {
    render() {
        return (
            <Container fluid={true}>
                <BoardsList />
            </Container>
        )
    }
}

export default BoardsListPage
