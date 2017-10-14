import * as React from 'react'
import { Button } from 'semantic-ui-react'

const GitHubButton = () => {
  return (
    <div>
        <Button 
          color="teal" 
          fluid={true} 
          size="large" 
          content="Connect with GitHub" 
          icon="github" 
          labelPosition="left" 
        />
    </div>
  )
}

export default GitHubButton
