import * as React from 'react'
import { Modal, Segment, Button, Icon } from 'semantic-ui-react'

interface CardModalProps {
  open: boolean
}

class AttachmentsModal extends React.Component {

    constructor(props: CardModalProps) {
        super(props)
        this.state = {
            open: false
        }
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
    }
  
    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })
  
    render() {
      return (
        <Modal
            dimmer="blurring"
            onOpen={this.open}
            onClose={this.close}
            size="small"
            closeIcon={true}
            trigger={<Button compact={true} fluid={true} circular={true}> Attachment </Button>}
        >
          <Modal.Header>Attachment for this card</Modal.Header>
          <Modal.Content>
            <Segment vertical={true} ><Icon name="file" />Choose a file</Segment>
            <Segment vertical={true} >Google Drive</Segment>
            <Segment vertical={true} >External link</Segment>
          </Modal.Content>
        </Modal>
      )
    }
}

export default AttachmentsModal
