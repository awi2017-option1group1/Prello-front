import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import { Router, Route, hashHistory } from 'react-router'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import App from './App'
import LoginPage from './LoginPage'

import registerServiceWorker from './registerServiceWorker'
import './index.css'

/*
ReactDOM.render(
  <App />,  //Element
  document.getElementById('root') as HTMLElement  //container
  //callback 
);
registerServiceWorker();
*/
ReactDOM.render(
  <BrowserRouter>
  <Switch>
      <Route path="/App" component={App}/>
      <Route path="/Login" component={LoginPage}/>
  </Switch>
  </BrowserRouter>, 
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
