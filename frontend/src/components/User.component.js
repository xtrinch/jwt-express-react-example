import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import * as userActions from '../actions/Users.actions';

export class User extends React.Component {
  
  constructor(props) {
    super(props);
    this.likePerson = this.likePerson.bind(this);
  }

  likePerson() {
    this.props.likeUser(this.props.user);
  }

  render() {
  	return (
  		<ListGroup.Item>
        {this.props.user.username},
        5 likes
        &nbsp;&nbsp;
        <Button variant="primary" onClick={this.likePerson}>Like</Button>
      </ListGroup.Item>
  	);
  }
}