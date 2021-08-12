const authReducer = (state = {}, actions) => {
    switch (actions.type) {
      case "SET_LOGIN":
        return { ...state, loggedIn: true, user: actions.payload };
      case "SET_LOGOUT":
        return { ...state, loggedIn: false, user: {} };
      default:
        return state;
    }
  };

export const intialState = {
    loggedIn: false,
    user: {}
}
  
export default authReducer;