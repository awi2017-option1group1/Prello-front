import * as React from 'react'

import './IndexPage.css'
const logo = require('./logo.svg')

class IndexPage extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to Prello</h2>
                </div>
                <p className="App-intro">
                    Work in progress
                </p>
            </div>
        )
    }
}

export default IndexPage
