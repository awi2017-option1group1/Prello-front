import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import Layout from './components/Layout'

import { AUTH } from './services/auth'
import { requireNotAuth, requireAuth } from './components/Auth'

import './index.css'

import store, { history } from './redux/store'
import { actionCreators } from './redux/auth/actions'

import { wsClient } from './services/websockets'
import { RealTimeRedux } from './redux/realtime'

/* Pages Components Imports */
import IndexPage from './routes/IndexPage'
import RegisterPage from './routes/RegisterPage'
import RegisterSuccessPage from './routes/RegisterSuccessPage'
import BoardPage from './routes/BoardPage'
import BoardsListPage from './routes/BoardsPage'
import PageNotFound from './routes/PageNotFound'
import ProfilePage from './routes/ProfilePage'

/* Authenticate user */
AUTH.get('/me')
.then(
    response => {
        store.dispatch(
            actionCreators.loginSuccess(response.me)
        )

        wsClient.initialize()
        wsClient.on('connected', () => {
            wsClient.on('authorized', () => {
                wsClient.emit('request-connection', { object: 'board', id: 3 })

                RealTimeRedux(wsClient)
            })
        
            wsClient.on('unauthorized', () => null)
        })
    },
    error => {
        store.dispatch(
            actionCreators.loginFail()
        )
    }
)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Layout>
                <Switch>
                    <Route exact={true} path="/" component={IndexPage}/>
                    
                    <Route path="/register/success" component={requireNotAuth(RegisterSuccessPage)}/>
                    <Route path="/register" component={requireNotAuth(RegisterPage)}/>
                    <Route path="/overview" component={requireAuth(BoardsListPage)}/>
                    <Route path="/boards/:id" component={requireAuth(BoardPage)}/>
                    <Route path="/profile" component={requireAuth(ProfilePage)}/>

                    <Route component={PageNotFound}/>
                </Switch>
            </Layout>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)
