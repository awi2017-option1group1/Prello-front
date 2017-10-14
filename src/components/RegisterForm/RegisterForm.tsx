import * as React from 'react'
import { Link as ValueLink } from 'valuelink'
import { Button, Form, Grid, GridColumn, Header, FormInput, Message, Segment } from 'semantic-ui-react'

import { FormProps } from '../FormProps'

import './RegisterForm.css'

export interface RegisterFormProps extends FormProps {
    isProcessing: boolean

    register: (email: string, username: string, password: string) => void
}

interface RegisterFormState {
    email: string
    username: string
    password: string
}

export default class RegisterForm extends React.Component<RegisterFormProps, RegisterFormState> {
    constructor(props: RegisterFormProps) {
        super(props)
        this.state = {
            email: '',
            username: '',
            password: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.hasError = this.hasError.bind(this)
        this.hasErrors = this.hasErrors.bind(this)
    }

    handleInput(link: ValueLink<string>) {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            link.set(event.target.value)
        }
    }

    handleSubmit() {
        const { email, username, password } = this.state
        this.props.register(email, username, password)
    }

    hasErrors(emailLink: ValueLink<string>, usernameLink: ValueLink<string>, passwordLink: ValueLink<string>) {
        return (emailLink.error && emailLink.error.length > 0) 
            || (usernameLink.error && usernameLink.error.length > 0)
            || (passwordLink.error && passwordLink.error.length > 0)
    }

    hasError(valueLink: ValueLink<string>) {
        return (valueLink.error && valueLink.value.length > 0 && valueLink.error.length > 0) 
    }

    render() {
        const emailLink: ValueLink<string> = 
            ValueLink.state(this, 'email')
                     .check( x => x.indexOf('@') !== -1, 'Email must be valid' )
        
        const usernameLink: ValueLink<string> = 
            ValueLink.state(this, 'username')
                     .check( x => x.length >= 3, 'Username must have 3 characters or more' )      
                     .check( x => x.length <= 25, 'Username must have 25 characters or less' )           

        const passwordLink: ValueLink<string> = 
            ValueLink.state(this, 'password')
                .check( x => x.length >= 3, 'Password must have 3 characters or more' )
            
        return (
            <Segment inverted={true} color="blue" id="register-form">
                <Grid
                    textAlign="center"
                    verticalAlign="middle"
                    columns={2}
                >
                    <GridColumn style={{ maxWidth: 450 }}>
                        <Header as="h2" textAlign="center">
                            Create a Prello account for FREE!
                        </Header>
                        <Form 
                            size="large" 
                            onSubmit={this.handleSubmit} 
                            error={this.hasErrors(emailLink, usernameLink, passwordLink)}
                        >
                            <Segment>
                                <FormInput
                                    fluid={true}
                                    icon="at"
                                    iconPosition="left"
                                    placeholder="E-mail address"
                                    type="email"
                                    value={emailLink.value}
                                    onChange={this.handleInput(emailLink)}
                                    className={this.hasError(emailLink)  ? 'error' : ''}
                                />
                                {this.hasError(emailLink) && <Message error={true}>
                                    <ul className="list">
                                        <li>{emailLink.error}</li>
                                    </ul>
                                </Message>}
                                <FormInput
                                    fluid={true}
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Username"
                                    value={usernameLink.value}
                                    onChange={this.handleInput(usernameLink)}
                                    className={this.hasError(usernameLink)  ? 'error' : ''}
                                />    
                                {this.hasError(usernameLink) && <Message error={true}>
                                    <ul className="list">
                                        <li>{usernameLink.error}</li>
                                    </ul>
                                </Message>}                            
                                <FormInput
                                    fluid={true}
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    type="password"
                                    value={passwordLink.value}
                                    onChange={this.handleInput(passwordLink)}
                                    className={passwordLink.error && passwordLink.value.length > 0  ? 'error' : ''}
                                />
                                {this.hasError(passwordLink) && <Message error={true}>
                                    <ul className="list">
                                        <li>{passwordLink.error}</li>
                                    </ul>
                                </Message>}
                                <Button 
                                    color="blue" 
                                    size="large" 
                                    fluid={true} 
                                    loading={this.props.isProcessing} 
                                    disabled={this.props.isProcessing 
                                        || this.hasErrors(emailLink, usernameLink, passwordLink) }
                                >
                                    Register
                                </Button>
                            </Segment>
                        </Form>
                        <Segment>
                            <Message>
                                Already have an account? <a href="/auth/login">Login</a>
                            </Message>
                        </Segment>
                    </GridColumn>
                </Grid>
            </Segment>
        )
    }
}
