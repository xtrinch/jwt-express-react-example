import React, { Component } from 'react';
import './App.css';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Users from './containers/Users.container';
import SignUp from './containers/SignUp.container';
import Login from './containers/Login.container';
import ForgotPassword from './containers/ForgotPassword.container';
import { Navbar, Nav } from 'react-bootstrap';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
                  <Nav.Link as={Link} to="/login/">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/forgotpassword/">
                    Forgot password
                  </Nav.Link>
                </Nav>
              </Navbar>

              <Route path="/" exact component={Users} />
              <Route path="/signup/" component={SignUp} />
              <Route path="/login/" component={Login} />
              <Route path="/forgotpassword/" component={ForgotPassword} />
            </div>
          </Router>
      </Provider>
    );
  }
}

export default App;
