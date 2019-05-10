const INITIAL_STATE = {
	me: {},
	changePassError: false,
	changePassErrorMessage: {},
	changePassSuccess: false,
	loading: false,
	profileDataError: false,
}

const forgotpasswordReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
	  case 'REINITIALIZE_STATE':
	  	return {...currentState, changePassError: false, changePassErrorMessage: {}, loading:false, changePassSuccess:false};
	  case 'PROFILE_DATA_REQ_SUCCESS':
	  	return {...currentState, me:action.data};
	  case 'PROFILE_DATA_REQ_FAILURE':
		  return {...currentState, profileDataError: true};
	  case 'UPDATE_PASS_FAILURE':
		  return {...currentState, changePassError:true, changePassErrorMessage:action.message, loading: false, changePassSuccess:false};
	  case 'UPDATE_PASS_SUCCESS':
		  return {...currentState, changePassError:false, changePassErrorMessage:{}, changePassSuccess: true, loading: false};
	  default:
	       return currentState;
	}
}

export default forgotpasswordReducer;
