const INITIAL_STATE = {
	users: [],
	loading: true
}

const usersReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
  	case 'FETCH_USERS_SUCCESS':
  		return {...currentState, loading: false, users: action.users};
  	case 'FETCH_USERS_REQUEST':
  		return {...currentState, loading: true};	
	default:
	    return currentState;
  }
}

export default usersReducer;