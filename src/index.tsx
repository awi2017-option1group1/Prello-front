
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { Container } from 'semantic-ui-react'

/*Pages Components Imports */
import App from './App'
import { LoginPage } from './routes/LoginPage'
import Board from './components/Board'
import Layout from './components/Layout'

import registerServiceWorker from './registerServiceWorker'
import './index.css'

import store from './redux/store'
export const history = createHistory()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <div>
          <Route exact={true} path="/" component={App}/>
          <Container>
            <Route path="/Login" component={LoginPage}/>
            <Route path="/board" component={Board}/>
          </Container>
        </div>
      </Layout>
    </ConnectedRouter>
  </Provider>, 
  document.getElementById('root')
)
registerServiceWorker()
