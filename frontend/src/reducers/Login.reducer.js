import { LOCATION_CHANGE } from 'react-router-redux'

const INITIAL_STATE = {
	login: "Oh my god log me in to this great thingy",
	error: false,
	loading: false,
	errorMessage: {},
}

const loginReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
	  case 'LOGIN_REQUEST':
	  	return {...currentState, loading:true, error: false, errorMessage: ""};
	  case 'LOGIN_FAILED':
	  	return {...currentState, loading:false, error: true, errorMessage: action.message};
	  case 'LOGIN_SUCCESS':
	  	return {...currentState, loading:false, error: false, errorMessage: ""};
	  case LOCATION_CHANGE:
		  return {...currentState, ...INITIAL_STATE};
	default:
	   return currentState;
	}
}

export default loginReducer;
