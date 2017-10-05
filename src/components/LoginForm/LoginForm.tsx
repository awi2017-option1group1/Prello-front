import * as React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { GitHubButton } from './../GitHubButton'
import './LoginForm.css'

export default class LoginForm extends React.Component {
    render() {
      return (
        <div className="LoginForm">
                {/*}
                <style>{`
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                    height: 100%;
                }
                `}</style>*/}
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
                    <Form size="large">
                    <Segment >
                        <Form.Input
                            fluid={true}
                            icon="user"
                            iconPosition="left"
                            placeholder="E-mail address or User name"
                        />
                        <Form.Input
                            fluid={true}
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password"
                            type="password"
                        />
                        <Button color="blue" size="large" fluid={true}>Login</Button>
                    </Segment>
                    </Form>
                    <Segment >
                        {/*<Button color="teal" fluid={true} size="large">Connect with GitHub</Button>*/}
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
