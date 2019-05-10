import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import Users from './containers/Users.container';
import SignUp from './containers/SignUp.container';
import Login from './containers/Login.container';
import Profile from './containers/Profile.container';
import { Navbar, Nav } from 'react-bootstrap';
import {userService} from "./services/authentication.service";
import * as loginActions from './actions/Login.actions';
import * as profileActions from './actions/Profile.actions';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        userService.loggedIn() === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.getAuth()
    this.props.fetchUserData();
  }

  render() {
    return (
          <Router>
            <div>
              <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand>Popularity app</Navbar.Brand>
                <Nav className="mr-auto">
                  <Nav.Link as={Link} to="/">
                    List users
                  </Nav.Link>
                  {!this.props.loginState.loggedIn &&
                    <Nav.Link as={Link} to="/signup/">
                      Sign up
                    </Nav.Link>
                  }
                  { !this.props.loginState.loggedIn &&
                    <Nav.Link as={Link} to="/login/">
                      Login
                    </Nav.Link>
                  }
                  { this.props.loginState.loggedIn &&
                    <Nav.Link as={Link} to="/profile/">
                      Profile
                    </Nav.Link>
                  }
                  { this.props.loginState.loggedIn &&
                  <Nav.Link as={Link} to="/" onClick={(e) => {e.preventDefault(); this.props.logoutRequest()}} >
                    Log out
                  </Nav.Link>
                  }
                </Nav>

                {this.props.loginState.loggedIn &&
                  <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                      Signed in as: <Link to="/profile/">{this.props.profileState.me.username}</Link>
                    </Navbar.Text>
                  </Navbar.Collapse>
                }
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

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    logoutRequest: () => dispatch(loginActions.logout()),
    getAuth: () => dispatch(loginActions.getAuth()),
    fetchUserData: () => dispatch(profileActions.fetchUserData())
  }
}

// map state from store to props
const mapStateToProps = (state) => {
  return {
    state: state.app,
    loginState: state.login,
    profileState: state.profile
  }
}

//export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
