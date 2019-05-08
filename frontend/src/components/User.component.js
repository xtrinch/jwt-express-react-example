import React from 'react';
import { Button } from 'react-bootstrap';

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
  		<tr>
            <td>{this.props.user.username}</td>
            <td>{this.props.user.likes}</td>
            <td><Button variant="primary" onClick={this.likePerson}>Like</Button></td>
      </tr>
  	);
  }
}
