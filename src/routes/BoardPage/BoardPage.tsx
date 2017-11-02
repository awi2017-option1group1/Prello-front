import * as React from 'react'
import { Container } from 'semantic-ui-react'

import Board from '../../components/Board'

class BoardPage extends React.Component {
    render() {
        return (
            <Container fluid={true}>
                <Board />
            </Container>
        )
    }
}

export default BoardPage
