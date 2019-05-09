const INITIAL_STATE = {
	loggedIn: false
}

const appReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
  	case 'LOGIN_SUCCESS':
	  	return {...currentState, loggedIn: true};
	default:
	       return currentState;
	}
}

export default appReducer;
