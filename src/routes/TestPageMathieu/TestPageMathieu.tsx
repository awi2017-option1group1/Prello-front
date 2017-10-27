import * as React from 'react'
import CardModal from './../../components/CardModal'
import { Card as SmCard , Feed } from 'semantic-ui-react'

// import Card  from './../../components/Card'

class TestPageMathieu extends React.Component {
    
    render() {

      return (
        <div>
            <SmCard>
              <SmCard.Content>
                <SmCard.Header>
                  Card for modal tests
                </SmCard.Header>
              </SmCard.Content>
              <SmCard.Content>
                <Feed>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Date content="1 day ago" />
                      <Feed.Summary>
                        You added <a>Jenny Hess</a> to your <a>coworker</a> group.
                        <CardModal id={1} visible={true} />
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </SmCard.Content>
            </SmCard>
            
        </div>
      )
    }
  }

export default TestPageMathieu
