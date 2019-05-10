export const registerSuccess = () => {
    return {
        type:'REGISTER_SUCCESS'
    }
}

export const registerFailed = (message) => {
    return {
        type:'REGISTER_FAILED',
        message
    }
}

export const registerRequest = () => {
    return {
        type:'REGISTER_REQUEST'
    }
}

export const register = (loginData) => {
    return (dispatch) => {
        dispatch(registerRequest());
        // Returns a promise
        return fetch( "/api/signup", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData),
        })
            .then(response => {
                if(response.ok){
                    response.json().then(data => {
                        dispatch(registerSuccess(data));
                    }).catch(err => dispatch(registerFailed(err)));
                }
                else{
                    response.json().then(error => {
                        dispatch(registerFailed(error));
                    }).catch(err => dispatch(registerFailed(err)));
                }
            })
    }
}

export const reinitializeState = () => {
    return {
        type:'REINITIALIZE_STATE'
    }
}
