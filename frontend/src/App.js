import React, { Component } from 'react';
import './App.css';
import configureStore from './store/configureStore';
import {connect, Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Link, withRouter} from "react-router-dom";
import Users from './containers/Users.container';
import SignUp from './containers/SignUp.container';
import Login from './containers/Login.container';
import Profile from './containers/Profile.container';
import { Navbar, Nav } from 'react-bootstrap';
import { createBrowserHistory } from 'history';
import {LOCATION_CHANGE} from "react-router-redux";

const store = configureStore();
const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
    });
  }
  render() {
    return (
      <Provider store={store}>
          <Router history={history}>
            <div>
              <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand>Popularity app</Navbar.Brand>
                <Nav>
                  <Nav.Link as={Link} to="/">
                    List users
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup/">
                    Sign up
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login/">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/profile/">
                    Profile
                  </Nav.Link>
                </Nav>
              </Navbar>

              <Route path="/" exact component={Users} />
              <Route path="/signup/" component={SignUp} />
              <Route path="/login/" component={Login} />
              <Route path="/profile/" component={Profile} />
            </div>
          </Router>
      </Provider>
    );
  }
}

export default App;
//export default withRouter(connect()(App))
