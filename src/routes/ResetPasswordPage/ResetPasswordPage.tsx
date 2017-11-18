import * as React from 'react'
import { Container } from 'semantic-ui-react'

import ResetPassword from './../../components/ResetPassword'

class ResetPasswordPage extends React.Component {
    render() {
        return (
            <Container fluid={true}>
                <ResetPassword />
            </Container>
        )
    }
}

export default ResetPasswordPage
