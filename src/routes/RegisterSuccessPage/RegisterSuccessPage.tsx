import * as React from 'react'
import { Segment, Header } from 'semantic-ui-react'

class RegisterSuccessPage extends React.Component {
    render() {
        return (
            <Segment inverted={true} color="green" className="bg-segment">
                <Header as="h2" textAlign="center">
                    Thank you for your registration!
                </Header>
                <Header as="h3" textAlign="center">
                    Please validate your account with the email we have sent you to fully enjoy Prello.
                </Header>
            </Segment>
        )
    }
}

export default RegisterSuccessPage
