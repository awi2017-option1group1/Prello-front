import * as React from 'react'

class LogoutPageProps {
    logout: () => void
}

class LogoutPage extends React.Component<LogoutPageProps> {
    constructor(props: LogoutPageProps) {
        super(props)
    }

    componentDidMount() {
        this.props.logout()
    }

    render() {
        return null
    }
}

export default LogoutPage
