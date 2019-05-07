import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom'
import * as loginActions from '../actions/Login.actions';

export class Login extends React.Component {

  render() {
  	return (
  		<div>{JSON.stringify(this.props.login)}</div>
  	);
  }
}

// map state from store to props
const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}
// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))