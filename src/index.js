import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import djapp from './imports/redux/redusers';
import { Provider } from 'react-redux';
import uploadedSounds from './imports/containers/upload';
import DJControl from './imports/containers/djcontroller';
import registerServiceWorker from './registerServiceWorker';
import "./stylesheet/upload.css";

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

let store = createStore(djapp);


const Routers = () => (
  <Router>
    <Switch>
      <Route path="/upload" component={uploadedSounds} />
      <Route path="/dj-controller" component={DJControl} />
      <Redirect to="/upload" />
    </Switch>
  </Router>
);

ReactDOM.render(
  <Provider store={store}>
    <Routers />
  </Provider>, document.getElementById('root'));

registerServiceWorker();
