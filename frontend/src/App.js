import React, { Component } from 'react';
import './App.css';
import configureStore from './store/configureStore';
import {connect, Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Link, withRouter, Redirect} from "react-router-dom";
import Users from './containers/Users.container';
import SignUp from './containers/SignUp.container';
import Login from './containers/Login.container';
import Profile from './containers/Profile.container';
import { Navbar, Nav } from 'react-bootstrap';
import {LOCATION_CHANGE} from "react-router-redux";
import {userService} from "./services/authentication.service";

//const store = configureStore()

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        userService.loggedIn() === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
          <Router>
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
                  { !this.props.state.loggedIn &&
                    <Nav.Link as={Link} to="/login/">
                      Login
                    </Nav.Link>
                  }
                  { this.props.state.loggedIn &&
                    <Nav.Link as={Link} to="/profile/">
                      Profile
                    </Nav.Link>
                  }
                  { this.props.state.loggedIn &&
                  <Nav.Link as={Link} to="/">
                    Log out
                  </Nav.Link>
                  }
                </Nav>
              </Navbar>

              <Route path="/" exact component={Users} />
              <Route path="/signup/" component={SignUp} />
              <Route path="/login/" component={Login} />
              <PrivateRoute path="/profile/" component={Profile} />
            </div>
          </Router>
    );
  }
}

// map state from store to props
const mapStateToProps = (state) => {
  return {
    state: state.app
  }
}

//export default App;
export default connect(mapStateToProps)(App);
