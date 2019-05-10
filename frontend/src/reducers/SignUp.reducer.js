import {LOCATION_CHANGE} from "react-router-redux";

const INITIAL_STATE = {
	signup: "Oh my god sign me up for this amazing application",
	loading: false,
	error: false,
	success: false,
	errorMessage: {},
}

const signupReducer = (currentState = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'REINITIALIZE_STATE':
			return {...currentState, loading:false, error: false, errorMessage: "", success: false};
	  case 'REGISTER_REQUEST':
		  return {...currentState, loading:true, error: false, errorMessage: "", success: false};
	  case 'REGISTER_FAILED':
		  return {...currentState, loading:false, error: true, errorMessage: action.message, success: false};
	  case 'REGISTER_SUCCESS':
		  return {...currentState, loading:false, error: false, errorMessage: "", success: true};
	  case LOCATION_CHANGE:
		  return {...currentState, ...INITIAL_STATE};
	  default:
	    	return currentState;
	}
}

export default signupReducer;
