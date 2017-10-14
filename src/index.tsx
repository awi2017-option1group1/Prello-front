import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { Container } from 'semantic-ui-react'

/*Pages Components Imports */
import Layout from './components/Layout'

import { AUTH } from './services/auth'

import registerServiceWorker from './registerServiceWorker'
import './index.css'

import store, { history } from './redux/store'
import { actionCreators } from './redux/login/actions'

/* Pages Components Imports */
import IndexPage from './routes/IndexPage'
import LoginPage from './routes/LoginPage'
import BoardPage from './routes/BoardPage'
import PageNotFound from './routes/PageNotFound'

/* Authenticate user */
if (AUTH.isUserAuthenticated()) {
    store.dispatch(
        actionCreators.loginSuccess(AUTH.getUserToken()!)
    )
}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Layout>
                <Switch>
                    <Route exact={true} path="/" component={IndexPage}/>
                    <Container>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/board" component={BoardPage}/>
                        <Route path="*" component={PageNotFound}/>
                    </Container>
                </Switch>
            </Layout>
        </ConnectedRouter>
    </Provider>, 
    document.getElementById('root')
)
registerServiceWorker()
