import {userService} from "../services/authentication.service";

export const profileDataFetchSuccess = (data) => {
    return {
        type:'PROFILE_DATA_REQ_SUCCESS',
        data
    }
}

export const profileDataFetchFailure = () => {
    return {
        type:'PROFILE_DATA_REQ_FAILURE'
    }
}

export const fetchUserData = () => {
    return async (dispatch) => {
        const response = await fetch( "/api/me", {
            method: 'GET',
            headers: {
                'Authorization': userService.getToken()
            }
        })

        if(response.ok){
            response.json().then(data => {
                dispatch(profileDataFetchSuccess(data));
            }).catch(err => dispatch(profileDataFetchFailure(err)));
        }
        else{
            response.json().then(error => {
                dispatch(profileDataFetchFailure(error));
            }).catch(err => dispatch(profileDataFetchFailure(err)));
        }

        return response;
    }
}
