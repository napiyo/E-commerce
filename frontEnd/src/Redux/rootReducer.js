import CartReducer from "./CartReducer";
import {combineReducers} from 'redux';
import UserReducer from './UserReducer'
const rootReducers = combineReducers({
    CartReducer,UserReducer
})

export default rootReducers;