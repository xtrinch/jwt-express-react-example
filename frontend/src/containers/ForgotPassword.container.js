import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom'
import * as forgotpasswordActions from '../actions/ForgotPassword.actions';

export class ForgotPassword extends React.Component {

  render() {
  	return (
  		<div>{JSON.stringify(this.props.forgotpassword)}</div>
  	);
  }
}

// map state from store to props
const mapStateToProps = (state) => {
  return {
    forgotpassword: state.forgotpassword
  }
}
// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPassword))