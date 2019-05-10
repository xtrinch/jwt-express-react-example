import { userService } from "../services/authentication.service";
import {fetchUserData} from "./Profile.actions";

export const getAuth = () => {
    return {
        type:'GET_AUTH'
    }
}

export const logoutSuccess = () => {
    return {
        type:'LOGOUT_SUCCESS'
    }
}

export const loginSuccess = () => {
    return {
        type:'LOGIN_SUCCESS'
    }
}

export const loginFailed = (message) => {
    return {
        type:'LOGIN_FAILED',
        message: message
    }
}

export const loginRequest = () => {
    return {
        type:'LOGIN_REQUEST'
    }
}

export const login = (loginData, ownProps) => {
    return async (dispatch) => {
        dispatch(loginRequest());

        const response = await fetch( "/api/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })

        if(response.ok){
            response.json().then(data => {
                dispatch(loginSuccess(data));
                userService.setToken(data.token);
                dispatch(fetchUserData());
                ownProps.history.push('/');
                // TODO: redirect to home
            }).catch(err => dispatch(loginFailed(err)));
        }
        else{
            response.json().then(error => {
                dispatch(loginFailed(error));
            }).catch(err => dispatch(loginFailed(err)));
        }

        return response;
    }
}

export const logout = () => {
    return (dispatch) => {
        userService.logout();
        dispatch(logoutSuccess());
    }
}

export const reinitializeState = () => {
    return {
        type:'REINITIALIZE_STATE'
    }
}

