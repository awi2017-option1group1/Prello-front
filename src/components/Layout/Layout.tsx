import * as React from 'react'
import AlertContainer from 'react-alert'

import { IAlert } from '../../redux/ui/types' 

import Header from '../Header'
import Footer from '../Footer'

class LayoutProps {
    children: React.ReactNode
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

class Layout extends React.Component<LayoutProps> {
    private alert: AlertContainer | null

    constructor(props: LayoutProps) {
        super(props)
        this.alert = null
    }

    componentWillReceiveProps(nextProps: LayoutProps) {
        if (this.alert && nextProps.alert.show && nextProps.alert.msg) {
            this.alert.show(nextProps.alert.msg, {
                type: nextProps.alert.type,
                onClose: this.props.hideAlertMessage
            })
        }
    }      

    render() {
        return (
            <div>
                <AlertContainer 
                    ref={alert => this.alert =  alert} 
                    {...alertOptions}  
                />
        
                <Header />
        
                <main>
                    {this.props.children}
                </main>
        
                <Footer />
            </div>
        )
    }
}

export default Layout
