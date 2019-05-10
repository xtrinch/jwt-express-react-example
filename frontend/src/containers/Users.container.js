import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom'
import * as userActions from '../actions/Users.actions';
import { User } from '../components/User.component';
import { Card, Table } from 'react-bootstrap';

export class Users extends React.Component {
  // constructor(props){
  //   super(props);
  // }

  componentWillMount(){
    this.props.fetchUsers();
  }

  render() {
  	return (
  		<Card style={{ width: '90vw', margin: '0 auto', marginTop:'30px' }}>
        <Card.Body>
            <Card.Title>Users</Card.Title>
	  		<Table striped bordered hover>
                <thead>
                    <tr>
                        <td>Username</td>
                        <td># likes</td>
                        { this.props.loginState.loggedIn && <td></td> }
                    </tr>
                </thead>
                <tbody>
		  		{this.props.state.users.map((value, index) => {
			        return <User key={index} likeUser={this.props.likeUser} unlikeUser={this.props.unlikeUser} user={value} appState={this.props.loginState}></User>
			    })}
                </tbody>
		    </Table>
		    {this.props.state.error && <div>Error while fetching users.</div>}
		  	{this.props.state.loading && <div>Loading users...</div>}
	    </Card.Body>
	    </Card>
  	);
  }
}

// map state from store to props
const mapStateToProps = (state) => {
  return {
    state: state.users,
    loginState: state.login,
  }
}

// map actions to props
const mapDispatchToProps = (dispatch) => {
  return {
  	fetchUsers: () => dispatch(userActions.fetchUsers()),
  	likeUser: (user) => dispatch(userActions.likeUser(user)),
    unlikeUser: (user) => dispatch(userActions.unlikeUser(user)),
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users))
