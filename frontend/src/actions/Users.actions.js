import { userService } from "../services/authentication.service";

export const likeUserRequest = (user) => {
	return {
		type: 'LIKE_USER',
		user: user,
		dispatchedAt: Date.now
	}
}

export const unlikeUserRequest = (user) => {
    return {
        type: 'UNLIKE_USER',
        user: user,
        dispatchedAt: Date.now
    }
}

export const unlikeUserSuccess = () => {
    return {
        type: 'UNLIKE_USER_SUCCESS',
        dispatchedAt: Date.now
    }
}

export const likeUserSuccess = () => {
    return {
        type: 'LIKE_USER_SUCCESS',
        dispatchedAt: Date.now
    }
}

export const unlikeUserFailed = () => {
    return {
        type: 'UNLIKE_USER_FAILED',
        dispatchedAt: Date.now
    }
}

export const likeUserFailed = () => {
    return {
        type: 'LIKE_USER_FAILED',
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
  return async (dispatch) => {
    dispatch(fetchUsersRequest());

    const response = await fetch( "/api/most-liked", {
        headers: {
            'Authorization': userService.getToken()
        }
    });

    if(response.ok){
        response.json().then(data => {
            data.sort(function(a, b){
                return b.likes - a.likes;
            });
            dispatch(fetchUsersSuccess(data));
        }).catch(err => dispatch(fetchUsersFailed(err)));
    }
    else{
        response.json().then(error => {
          dispatch(fetchUsersFailed(error));
        }).catch(err => dispatch(fetchUsersFailed(err)));
    }

    return response;
  }
}

export const likeUser = (user) => {
    return async (dispatch) => {
        const response = await fetch( `/api/user/${user.username}/like`, {
            method: 'POST',
            headers: {
                'Authorization': userService.getToken()
            }
        });

        if(response.ok){
            dispatch(likeUserSuccess());
        }
        else{
            dispatch(likeUserFailed());
        }

        dispatch(fetchUsers());
        return response;
    }
}

export const unlikeUser = (user) => {
    return async (dispatch) => {
        const response = await fetch( `/api/user/${user.username}/unlike`, {
            method: 'POST',
            headers: {
                'Authorization': userService.getToken()
            }
        });

        if(response.ok){
            dispatch(unlikeUserSuccess());
        }
        else{
            dispatch(unlikeUserFailed());
        }

        dispatch(fetchUsers());

        return response;
    }
}
