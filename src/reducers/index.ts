import { combineReducers } from 'redux';
import authReducer from './Login';
import deviceInfo from './deviceInfo';
import activePage from './activePage';

const rootReducer = combineReducers({
    authReducer,
    deviceInfo,
    activePage
});

export default rootReducer;