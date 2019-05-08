export const likeUser = (user) => {
	return {
		type: 'LIKE_USER',
		user: user,
		dispatchedAt: Date.now
	}
}

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
	    return fetch( "/api/most-liked")
            .then(response => {
              if(response.ok){
                response.json().then(data => {
                  dispatch(fetchUsersSuccess(data));
                }).catch(err => dispatch(fetchUsersFailed(err)));
              }
              else{
                response.json().then(error => {
                  dispatch(fetchUsersFailed(error));
                }).catch(err => dispatch(fetchUsersFailed(err)));
              }
            })
	}
}
