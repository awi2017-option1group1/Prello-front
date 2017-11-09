import { Segment, Grid } from 'semantic-ui-react'
import * as React from 'react'

import { IUser } from '../../redux/users/types'

import { StateProps } from '../StateProps'

import Spinner from '../common/Spinner'
import EditableTitle from '../common/EditableTitle'

import './Profile.css'

export interface ProfileProps extends StateProps {
    user: IUser

    setFullName: (fullName: string) => void
    setEmail: (email: string) => void
    setPseudo: (pseudo: string) => void
}

class Profile extends React.Component<ProfileProps> {

    constructor(props: ProfileProps) {
        super(props)
    }

    componentDidMount() {
        this.props.loadData!()
    }

    render() {
        if (this.props.loading) {
            return (
                <Segment className="profile">
                    <Spinner />
                </Segment>
            )
        }

        return (
            <Segment className="profile">
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column>
                            <h2>Email :</h2>
                        </Grid.Column>
                        <Grid.Column>
                            <EditableTitle
                                type="h2"
                                content={this.props.user.email}
                                onSubmit={this.props.setEmail}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <h2>Pseudo :</h2>
                        </Grid.Column>
                        <Grid.Column>
                            <EditableTitle
                                type="h2"
                                content={this.props.user.username}
                                onSubmit={this.props.setPseudo}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <h2>Full name :</h2>
                        </Grid.Column>
                        <Grid.Column>
                            <EditableTitle
                                type="h2"
                                content={(this.props.user.fullName) ? this.props.user.fullName : ''}
                                onSubmit={this.props.setFullName}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Segment>
        )
    }
}

export default Profile
