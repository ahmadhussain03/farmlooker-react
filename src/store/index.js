import { createStore } from "redux";

import reducers from "./reducers/reducers";
import { intialState as authIntialState } from "./reducers/authReducer";

const initialStates = {
  auth: authIntialState
};
const store = createStore(
  reducers,
  initialStates,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;