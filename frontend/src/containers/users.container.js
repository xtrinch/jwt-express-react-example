import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom'
import * as userActions from '../actions/Users.actions';

export class Users extends React.Component {
  // constructor(props){
  //   super(props);
  //   //this.toggleAddTodo = this.toggleAddTodo.bind(this);
  // }

  componentWillMount(){
    this.props.fetchUsers();
  }

  render() {
  	return (
  		<div>{JSON.stringify(this.props.users)}</div>
  	);
  }
}

// map state from store to props
const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}
// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  	fetchUsers: () => dispatch(userActions.fetchUsers()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users))