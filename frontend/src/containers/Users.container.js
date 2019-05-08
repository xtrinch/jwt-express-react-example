import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom'
import * as userActions from '../actions/Users.actions';
import { User } from '../components/User.component';
import { ListGroup } from 'react-bootstrap';

export class Users extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.fetchUsers();
  }

  render() {
  	return (
  		<div>
  			<h1 style={{padding: '20px'}}>Users</h1>
	  		<ListGroup>
		  		{this.props.state.users.map((value, index) => {
			        return <User key={index} likeUser={this.props.likeUser} user={value}></User>
			    })}
		    </ListGroup>
	    </div>
  	);
  }
}

// map state from store to props
const mapStateToProps = (state) => {
  return {
    state: state.users
  }
}
// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  	fetchUsers: () => dispatch(userActions.fetchUsers()),
  	likeUser: (user) => dispatch(userActions.likeUser(user)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users))