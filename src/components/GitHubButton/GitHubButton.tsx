import * as React from 'react'
import { Button } from 'semantic-ui-react'

export default class LoginForm extends React.Component {
    render() {
      return (
        <div className="LoginForm">
            <Button color="teal" fluid={true} size="large">Connect with GitHub</Button>
        </div>
      )
    }
  }
