import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom'
import * as signupActions from '../actions/SignUp.actions';
import { Form, Button, Card } from "react-bootstrap";

export class SignUp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
    };
    this.register = this.register.bind(this);
  }

  componentWillMount() {
    this.props.reinitializeState();
  }

  register(e) {
    this.props.registerRequest(this.state);
    e.preventDefault();
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


  render() {
  	return (
  		<Card style={{ width: '18rem', margin: '0 auto', marginTop:'30px' }}>
        <Card.Body>
          <Card.Title>Register</Card.Title>
          <Form onSubmit={(e) => this.register(e)}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                value={this.state.email}
                onChange={this.handleChange}
                type="email"
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                minLength={8}
              />
            </Form.Group>
            <Button
              block
              disabled={!this.validateForm()}
              type="submit"
              variant="primary"
            >
              Register
            </Button>
            {this.props.state.loading && <div><br/>Registering you...</div>}
            {this.props.state.error && <div><br/>{JSON.stringify(this.props.state.errorMessage.message)}</div>}
            {this.props.state.success && <div><br/>Success! You can now log in.</div>}
          </Form>
        </Card.Body>
      </Card>
  	);
  }
}

// map state from store to props
const mapStateToProps = (state) => {
  return {
    state: state.signup
  }
}
// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    registerRequest: (registerData) => dispatch(signupActions.register(registerData)),
    reinitializeState: () => dispatch(signupActions.reinitializeState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp))
