const INITIAL_STATE = {
	users: [],
	loading: true,
	error: false
}

const usersReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
  	case 'FETCH_USERS_SUCCESS':
  		return {...currentState, loading: false, users: action.users, error: false};
  	case 'FETCH_USERS_REQUEST':
  		return {...currentState, loading: true, error: false};	
  	case 'FETCH_USERS_FAILED':
  	  	return {...currentState, error: true, loading: false};	
	default:
	    return currentState;
  }
}

export default usersReducer;