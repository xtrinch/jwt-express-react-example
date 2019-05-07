import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './App.reducer';
import usersReducer from './Users.reducer';
import signupReducer from './SignUp.reducer';
import loginReducer from './Login.reducer';
import forgotpasswordReducer from './ForgotPassword.reducer';

export default combineReducers({
  app:appReducer,
  users:usersReducer,
  signup:signupReducer,
  login:loginReducer,
  forgotpassword:forgotpasswordReducer,
  routing
})