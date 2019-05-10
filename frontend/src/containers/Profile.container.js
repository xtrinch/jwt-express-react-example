import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom'
import { Form, Button, Card } from "react-bootstrap";
import * as profileActions from "../actions/Profile.actions";

export class ForgotPassword extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      oldPassword: "",
      newPassword: ""
    };
  }

  componentWillMount(){
    this.props.fetchUserData();
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  validateForm() {
    return this.state.oldPassword.length > 0 && this.state.newPassword.length > 0;
  }

  render() {
  	return (
  		<Card style={{ width: '18rem', margin: '0 auto', marginTop:'30px' }}>
        <Card.Body>
          <Card.Title>Profile</Card.Title>
          <div>
            <h6>Username</h6>
            <div>{this.props.state.me.username}</div>
          </div>
          <br/>
          <div>
            <h6>Email</h6>
            <div>{this.props.state.me.email}</div>
          </div>
          <br/>
          <Form onSubmit={this.login}>
            <Form.Group controlId="email">
              <Form.Label>Old password</Form.Label>
              <Form.Control
                value={this.state.oldPassword}
                onChange={this.handleChange}
                type="text"
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>New password</Form.Label>
              <Form.Control
                value={this.state.newPassword}
                onChange={this.handleChange}
                type="password"
              />
            </Form.Group>
            <Button
              block
              disabled={!this.validateForm()}
              type="submit"
              variant="primary"
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
  	);
  }
}

// map state from store to props
const mapStateToProps = (state) => {
  return {
    state: state.profile
  }
}
// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserData: () => dispatch(profileActions.fetchUserData()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword))
