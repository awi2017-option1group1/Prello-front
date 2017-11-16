import * as React from 'react'
import { Segment, Header } from 'semantic-ui-react'

import { StateProps } from '../StateProps'

import Spinner from '../common/Spinner'
import PageNotFound from '../../routes/PageNotFound'

export interface ConfirmationTokenProps extends StateProps {
    confirmEmail: () => void
}

class ConfirmationToken extends React.Component<ConfirmationTokenProps> {
    componentWillMount() {
        this.props.confirmEmail()
    }

    render() {
        if (this.props.loading) {
            return <Spinner />
        }

        if (this.props.error) {
            return <PageNotFound />
        }

        return (
            <Segment inverted={true} color="green" className="bg-segment">
                <Header as="h2" textAlign="center">
                    Your account is confirmed, you can now fully use Prello
                </Header>
            </Segment>
        )
    }
}

export default ConfirmationToken
