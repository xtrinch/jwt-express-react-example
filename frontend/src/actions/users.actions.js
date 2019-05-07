const apiUrl = "/api/";

export const fetchUsersSuccess = (users) => {
  return {
    type: 'FETCH_USERS_SUCCESS',
    users: users,
    receivedAt: Date.now
  }
}

export const fetchUsersFailed = (error) => {
  return {
    type:'FETCH_USERS_FAILED',
    error
  }
}

export const fetchUsersRequest = () => {
  return {
    type:'FETCH_USERS_REQUEST'
  }
}

export const fetchUsers = () => {
  return (dispatch) => {
	dispatch(fetchUsersRequest());
	    // Returns a promise
	    return fetch(apiUrl + "users")
            .then(response => {
            	console.log(response);
              // if(response.ok){
              //   response.json().then(data => {
              //     dispatch(fetchUsersSuccess(data.users));
              //   })
              // }
              // else{
              //   response.json().then(error => {
              //     dispatch(fetchUsersFailed(error));
              //   })
              // }
            })
	}
}