import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/*Pages Components Imports */
import App from './App';
import LoginPage from './LoginPage';

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'semantic-ui-css/semantic.min.css';

/*Routes*/
ReactDOM.render(
  <BrowserRouter>
  <Switch>
      <Route path="/App" component={ App }/>
      <Route path="/Login" component={ LoginPage }/>
  </Switch>
  </BrowserRouter>, document.getElementById('root')
);
registerServiceWorker();

