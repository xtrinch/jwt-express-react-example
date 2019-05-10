import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom'
import { Form, Button, Card } from "react-bootstrap";
import * as profileActions from "../actions/Profile.actions";

export class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      oldpassword: "",
      password: ""
    };
  }

  componentWillMount(){
    this.props.fetchUserData();
    this.props.reinitializeState();
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  validateForm() {
    return this.state.oldpassword.length > 0 && this.state.password.length > 0;
  }

  changePassword(e) {
    this.props.changePassword(this.state);
    e.preventDefault();
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
          <Form onSubmit={(e) => {e.preventDefault(); this.changePassword(e)}}>
            <Form.Group controlId="oldpassword">
              <Form.Label>Old password</Form.Label>
              <Form.Control
                value={this.state.oldpassword}
                onChange={this.handleChange}
                type="password"
                minLength={8}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>New password</Form.Label>
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
              Change password
            </Button>
          </Form>
          {this.props.state.changePassError && <div><br/>{JSON.stringify(this.props.state.changePassErrorMessage.message)}</div>}
          {this.props.state.changePassSuccess && <div><br/>Success! You can now use your new password.</div>}
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
    changePassword: (data) => dispatch(profileActions.changePassword(data)),
    reinitializeState: () => dispatch(profileActions.reinitializeState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
