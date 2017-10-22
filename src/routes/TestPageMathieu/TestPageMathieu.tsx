import * as React from 'react'
import CardModal from './../../components/CardModal'
import { Card, Feed } from 'semantic-ui-react'

class TestPageMathieu extends React.Component {
    
    render() {
      return (
        <div>
            <Card>
              <Card.Content>
                <Card.Header>
                  Card for modal tests
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <Feed>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Date content="1 day ago" />
                      <Feed.Summary>
                        You added <a>Jenny Hess</a> to your <a>coworker</a> group.
                        <CardModal id={1} visible={true}/>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Card.Content>
            </Card>
        </div>
      )
    }
  }

export default TestPageMathieu
