import {userService} from "../services/authentication.service";

const INITIAL_STATE = {
	loggedIn: false
}

const appReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
	  case 'GET_AUTH':
	  	return {...currentState, loggedIn: userService.loggedIn()}
  	case 'LOGIN_SUCCESS':
	  	return {...currentState, loggedIn: true};
	case 'LOGOUT_SUCCESS':
	  return {...currentState, loggedIn: false};
	default:
	       return currentState;
	}
}

export default appReducer;
