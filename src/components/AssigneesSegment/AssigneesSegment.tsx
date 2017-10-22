import * as React from 'react'
import { Menu, Input, ItemImage, Segment } from 'semantic-ui-react'

const AssigneesSegment = () => {

    return (
        <div>
        <h3>Assignee(s)</h3>
            <Menu.Item>
                <Input 
                    icon="users" 
                    placeholder="Search..." 
                    iconPosition="left" 
                    fluid={true}
                />
            </Menu.Item>
            <Segment basic={true}>
                <ItemImage 
                    avatar={true} 
                    size="mini"
                    src="https://semantic-ui.com/images/avatar/small/elliot.jpg"
                />
                <ItemImage 
                    avatar={true} 
                    size="mini"
                    src="https://semantic-ui.com/images/avatar/small/elliot.jpg"
                />
                <ItemImage 
                    avatar={true} 
                    size="mini"
                    src="https://semantic-ui.com/images/avatar/small/elliot.jpg" 
                />
            </Segment>
        </div>

    )
}

export default AssigneesSegment
