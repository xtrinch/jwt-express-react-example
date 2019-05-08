import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom'
import * as signupActions from '../actions/SignUp.actions';

export class SignUp extends React.Component {

  render() {
  	return (
  		<div>{JSON.stringify(this.props.signup)}</div>
  	);
  }
}

// map state from store to props
const mapStateToProps = (state) => {
  return {
    signup: state.signup
  }
}
// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp))