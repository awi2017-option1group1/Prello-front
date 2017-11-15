import * as React from 'react'

import { Link as ValueLink } from 'valuelink'
import { Button, Form, Grid, GridColumn, Header, FormInput, Message, Segment } from 'semantic-ui-react'

import { FormProps } from '../FormProps'

export interface ForgotPasswordProps extends FormProps {
    isProcessing: boolean

    sendMail: (email: string) => void
    redirect: () => void
}

interface EmailFormState {
    email: string
}

export default class EmailForm extends React.Component<ForgotPasswordProps, EmailFormState> {
    constructor(props: ForgotPasswordProps) {
        super(props)
        this.state = {
            email: '',
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
        const { email } = this.state
        this.props.sendMail(email)
    }

    hasErrors(emailLink: ValueLink<string>) {
        return (emailLink.error && emailLink.error.length > 0) 
    }

    hasError(valueLink: ValueLink<string>) {
        return (valueLink.error && valueLink.value.length > 0 && valueLink.error.length > 0) 
    }

    render() {
        const emailLink: ValueLink<string> = 
            ValueLink.state(this, 'email')
                     .check( x => x.indexOf('@') !== -1, 'Email must be valid' )
            
        return (
            <Segment inverted={true} color="blue" id="register-form">
                <Grid
                    textAlign="center"
                    verticalAlign="middle"
                    columns={2}
                >
                    <GridColumn style={{ maxWidth: 450 }}>
                        <Header as="h2" textAlign="center">
                            Please, give us your email address, to reset your password
                        </Header>
                        <Form 
                            size="large" 
                            onSubmit={this.handleSubmit} 
                            error={this.hasErrors(emailLink)}
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
                                <Button 
                                    color="blue" 
                                    size="large" 
                                    fluid={true} 
                                    loading={this.props.isProcessing} 
                                    disabled={this.props.isProcessing 
                                        || this.hasErrors(emailLink) }
                                    content="Send the mail"
                                    onClick={() =>  
                                        this.props.redirect()
                                    }
                                />
                            </Segment>
                        </Form>
                    </GridColumn>
                </Grid>
            </Segment>
        )
    }
}
