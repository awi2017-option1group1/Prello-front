import * as React from 'react'
import AlertContainer from 'react-alert'

import { IAlert } from '../../redux/ui/types' 

class AlertProps {
    alert: IAlert

    hideAlertMessage: () => void
}

const alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 5000,
    transition: 'scale'
}

class Alert extends React.Component<AlertProps> {
    private alert: AlertContainer | null

    constructor(props: AlertProps) {
        super(props)
        this.alert = null
    }

    componentWillReceiveProps(nextProps: AlertProps) {
        if (this.alert && nextProps.alert.show && nextProps.alert.msg) {
            this.alert.show(nextProps.alert.msg, {
                type: nextProps.alert.type,
                onClose: this.props.hideAlertMessage
            })
        }
    }      

    render() {
        return (
            <AlertContainer 
                ref={alert => this.alert =  alert} 
                {...alertOptions}  
            />
        )
    }
}

export default Alert
