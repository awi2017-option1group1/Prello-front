import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import Layout from './components/Layout'

import { AUTH } from './services/auth'
import { requireNotAuth, requireAuth } from './components/Auth'

// import registerServiceWorker from './registerServiceWorker'
import './index.css'

import store, { history } from './redux/store'
import { actionCreators } from './redux/auth/actions'

/* Pages Components Imports */
import IndexPage from './routes/IndexPage'
import RegisterPage from './routes/RegisterPage'
import RegisterSuccessPage from './routes/RegisterSuccessPage'
import BoardPage from './routes/BoardPage'
import PageNotFound from './routes/PageNotFound'

/* Authenticate user */
AUTH.get('/me')
.then(
    response => {
        store.dispatch(
            actionCreators.loginSuccess(response.me)
        )
    }
)
.catch(error => store.dispatch(
    actionCreators.loginFail()
))

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Layout>
                <Switch>
                    <Route exact={true} path="/" component={IndexPage}/>
<<<<<<< 020be93cd86e825b9f590fd5426e1552751b3a7b

                    <Route path="/register/success" component={requireNotAuth(RegisterSuccessPage)}/>
                    <Route path="/register" component={requireNotAuth(RegisterPage)}/>
                    
                    <Route path="/board" component={requireAuth(BoardPage)}/>
                    
                    <Route component={PageNotFound}/>
=======
                    <Container>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/logout" component={LogoutPage}/>
                        <Route path="/board/:id" component={BoardPage}/>
                        <Route path="*" component={PageNotFound}/>
                    </Container>
>>>>>>> fix(routes): fixed board id on route
                </Switch>
            </Layout>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)
// registerServiceWorker()
