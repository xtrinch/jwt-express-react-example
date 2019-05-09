import decode from 'jwt-decode';

export const userService = {
    loggedIn:loggedIn,
    setToken:setToken,
    isTokenExpired:isTokenExpired,
    getToken:getToken,
};

function loggedIn() {
    const token = this.getToken()
    // token exists && is not expired
    return !!token && !this.isTokenExpired(token)
}

function isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired.
                return true;
            }
            else
                return false;
        }
        catch (err) {
            console.log("expired check failed! Line 42: AuthService.js");
            return false;
        }
    }

function setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
}

function getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
}

function logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
}

    // getConfirm = () => {
    //     // Using jwt-decode npm package to decode the token
    //     let answer = decode(this.getToken());
    //     console.log("Recieved answer!");
    //     return answer;
    // }
    //
    // fetch = (url, options) => {
    //     // performs api calls sending the required authentication headers
    //     const headers = {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     }
    //     // Setting Authorization header
    //     // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    //     if (this.loggedIn()) {
    //         headers['Authorization'] = 'Bearer ' + this.getToken()
    //     }
    //
    //     return fetch(url, {
    //         headers,
    //         ...options
    //     })
    //         .then(this._checkStatus)
    //         .then(response => response.json())
    // }
    //
    // _checkStatus = (response) => {
    //     // raises an error in case response status is not a success
    //     if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
    //         return response
    //     } else {
    //         var error = new Error(response.statusText)
    //         error.response = response
    //         throw error
    //     }
    // }
