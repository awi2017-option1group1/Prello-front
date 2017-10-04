
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { } from 'react-router-dom'

/*Pages Components Imports */
import App from './App'
import { LoginPage } from './routes/LoginPage'
import Board from './components/Board'

import registerServiceWorker from './registerServiceWorker'
import './index.css'

import store from './redux/store'
export const history = createHistory()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact={true} path="/" component={App}/>
        <Route path="/Login" component={LoginPage}/>
        <Route path="/board" component={Board}/>
      </div>
    </ConnectedRouter>
  </Provider>, 
  document.getElementById('root')
)
registerServiceWorker()
