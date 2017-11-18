import { Segment, Grid, Radio } from 'semantic-ui-react'
import * as React from 'react'

import { IUser } from '../../redux/users/types'

import { StateProps } from '../StateProps'

import Spinner from '../common/Spinner'
import EditableTitle from '../common/EditableTitle'
import EditableTextArea from '../common/EditableTextArea'

import './Profile.css'

export interface ProfileProps extends StateProps {
    user: IUser

    setFullName: (fullName: string) => void
    setEmail: (email: string) => void
    setPseudo: (pseudo: string) => void
    setBio: (bio: string) => void
    toggleNotifications: () => void
    setPassword: (password: string) => void
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
                            <div>Email :</div>
                        </Grid.Column>
                        <Grid.Column>
                            <EditableTitle
                                type="h5"
                                content={this.props.user.email}
                                onSubmit={this.props.setEmail}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <div>Pseudo :</div>
                        </Grid.Column>
                        <Grid.Column>
                            <EditableTitle
                                type="h5"
                                content={this.props.user.username}
                                onSubmit={this.props.setPseudo}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <div>Full name :</div>
                        </Grid.Column>
                        <Grid.Column>
                            <EditableTitle
                                type="h5"
                                content={(this.props.user.fullName) ? this.props.user.fullName : ''}
                                onSubmit={this.props.setFullName}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <div>Biography :</div>
                        </Grid.Column>
                        <Grid.Column>
                            <EditableTextArea
                                content={(this.props.user.bio) ? this.props.user.bio : ''}
                                onSubmit={this.props.setBio}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <div>notifications Enabled :</div>
                        </Grid.Column>
                        <Grid.Column>
                            <Radio
                                toggle={true}
                                onChange={this.props.toggleNotifications}
                                checked={this.props.user.notificationsEnabled}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <div>Password :</div>
                        </Grid.Column>
                        <Grid.Column>
                            <EditableTitle
                                type="password"
                                content={this.props.user.password}
                                onSubmit={this.props.setPassword}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Segment>
        )
    }
}

export default Profile
