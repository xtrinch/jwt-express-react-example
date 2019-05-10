import React from 'react';
import { Button } from 'react-bootstrap';

export class User extends React.Component {
  
  constructor(props) {
    super(props);
    this.likePerson = this.likePerson.bind(this);
    this.unlikePerson = this.unlikePerson.bind(this);
  }

  likePerson() {
    this.props.likeUser(this.props.user);
  }

  unlikePerson() {
    this.props.unlikeUser(this.props.user);
  }

  isMe() {
    if (this.props.user.username === this.props.profileState.me.username) {
      return true;
    }
  }

  render() {
  	return (
  		<tr>
            <td>{this.props.user.username}</td>
            <td>{this.props.user.likes}</td>
            { this.props.appState.loggedIn && !this.isMe() && this.props.user.liked === 0 && <td><Button variant="primary" onClick={this.likePerson}>Like</Button></td> }
            { this.props.appState.loggedIn && !this.isMe() && this.props.user.liked === 1 && <td><Button variant="primary" onClick={this.unlikePerson}>Unlike</Button></td> }
        </tr>
  	);
  }
}
