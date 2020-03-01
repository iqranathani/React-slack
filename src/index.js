import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Root = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/Register" component={Register} />
            <Route path="/Login" component={Login} />
        </Switch>
    </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
