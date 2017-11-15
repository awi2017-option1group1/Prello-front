import * as React from 'react'
import { Link as ValueLink } from 'valuelink'
import { Button, Form, Grid, GridColumn, FormInput, Message, Segment } from 'semantic-ui-react'

import { FormProps } from '../FormProps'

export interface ForgotPasswordProps extends FormProps {
    isProcessing: boolean

    changePassword: (password: string) => void
}

interface PasswordFormState {
    password: string
}

export default class EmailForm extends React.Component<ForgotPasswordProps, PasswordFormState> {
    constructor(props: ForgotPasswordProps) {
        super(props)
        this.state = {
            password: '',
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
        const { password } = this.state
        this.props.changePassword(password)
    }

    hasErrors(passwordLink: ValueLink<string>) {
        return (passwordLink.error && passwordLink.error.length > 0) 
    }

    hasError(valueLink: ValueLink<string>) {
        return (valueLink.error && valueLink.value.length > 0 && valueLink.error.length > 0) 
    }

    render() {
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
                        <Form 
                            size="large" 
                            onSubmit={this.handleSubmit} 
                            error={this.hasErrors(passwordLink)}
                        >
                            <Segment>
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
                                        || this.hasErrors(passwordLink) }
                                >
                                    Change the password
                                </Button>
                            </Segment>
                        </Form>
                    </GridColumn>
                </Grid>
            </Segment>
        )
    }
}
