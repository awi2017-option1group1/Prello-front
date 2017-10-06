import * as React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { GitHubButton } from './../GitHubButton'
import './LoginForm.css'

export interface LoginFormProps {
    login: (email: string, password: string) => void
}

interface LoginFormState {
    emailInput: string
    passwordInput: string
}

export default class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
    constructor(props: LoginFormProps) {
        super(props)
        this.state = {
            emailInput: '',
            passwordInput: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEmailInput = this.handleEmailInput.bind(this)
        this.handlePasswordInput = this.handlePasswordInput.bind(this)
    }

    handleEmailInput(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            emailInput: event.target.value
        })
    }

    handlePasswordInput(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            passwordInput: event.target.value
        })
    }

    handleSubmit() {
        const { emailInput, passwordInput } = this.state
        this.props.login(emailInput, passwordInput)
    }

    render() {
      return (
        <div className="LoginForm">
                <Grid
                    textAlign="center"
                    style={{ height: '100%' }}
                    verticalAlign="middle"
                    columns={2}
                >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="blue" textAlign="center">
                    <Image src="./../../logo.svg" />
                    {' '}Log-in to your Prello account
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                    <Segment >
                        <Form.Input
                            fluid={true}
                            icon="user"
                            iconPosition="left"
                            placeholder="E-mail address or User name"
                            value={this.state.emailInput}
                            onChange={this.handleEmailInput}
                        />
                        <Form.Input
                            fluid={true}
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                            value={this.state.passwordInput}
                            onChange={this.handlePasswordInput}
                        />
                        <Button color="blue" size="large" fluid={true}>Login</Button>
                    </Segment>
                    </Form>
                    <Segment >
                        <GitHubButton />
                        <Message>
                        New to us? <a href="#">Sign Up</a>
                        </Message>
                    </Segment>
                </Grid.Column>
                </Grid>
            </div>
      )
    }
  }
