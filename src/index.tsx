
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App'
import LoginPage from './LoginPage'
import Board from './components/Board'

import registerServiceWorker from './registerServiceWorker'

import './index.css'

import store from './redux/store'
export const history = createHistory()
/*
ReactDOM.render(
  <App />,  //Element
  document.getElementById('root') as HTMLElement  //container
  //callback 
);
registerServiceWorker();
*/
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/App" component={App}/>
        <Route path="/Login" component={LoginPage}/>
        <Route path="/board" component={Board}/>
      </div>
    </ConnectedRouter>
  </Provider>, 
  document.getElementById('root')
)
registerServiceWorker()

/*
ReactDOM.render(
  <Router history={BrowserRouter}>
    <Route path="/" component={App}>
    </Route>
    <Route path="/Login" component={LoginPage}>
    </Route>
  </Router>,
  document.getElementById('root') as HTMLElement  //container
);
registerServiceWorker();
*/
