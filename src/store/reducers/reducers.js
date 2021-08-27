import { combineReducers } from "redux";
import authReducer from "./authReducer";
import menuReducer from "./menuReducer";

const reducers = combineReducers({ auth: authReducer, menu: menuReducer });

export default reducers;