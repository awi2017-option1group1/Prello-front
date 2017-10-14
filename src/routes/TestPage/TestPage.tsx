import * as React from 'react'

import { API } from '../../services/http'

class TestPageProps {

}

class TestPageState {
    secret: string
    error: string | null
}

class TestPage extends React.Component<TestPageProps, TestPageState> {

    constructor(props: TestPageProps) {
        super(props)
        this.state = {
            secret: '',
            error: null
        }
    }

    componentWillMount() {
        API.get('/protected').then(
            response => this.setState({ secret: response.secret }),
            error => this.setState({ error: error.message })
        )
    }

    render() {
        if (this.state.error) {
            return (
                <h1>{this.state.error}</h1>
            )
        }

        return (
            <div>
                <h1>Protected page</h1>
                <p>{this.state.secret}</p>
            </div>
        )
    }
}

export default TestPage
