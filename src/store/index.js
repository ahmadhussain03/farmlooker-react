import { createStore } from "redux";

import reducers from "./reducers/reducers";
import { intialState as authIntialState } from "./reducers/authReducer";
import { intialState as menuInitalState } from './reducers/menuReducer'

const initialStates = {
  auth: authIntialState,
  menu: menuInitalState
};
const store = createStore(
  reducers,
  initialStates,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;