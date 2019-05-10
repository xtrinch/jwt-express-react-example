const INITIAL_STATE = {
	me: {}
}

const forgotpasswordReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
	  case 'PROFILE_DATA_REQ_SUCCESS':
	  	return {...currentState, me:action.data}
	default:
	       return currentState;
	}
}

export default forgotpasswordReducer;
