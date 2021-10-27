import cookie from "js-cookie";

let token = cookie.get("token")

const authReducer = (state = {}, actions) => {
    switch (actions.type) {
      case "SET_LOGIN":
        return { ...state, loggedIn: true, user: actions.payload };
      case "SET_LOGOUT":
        return { ...state, loggedIn: false, user: {} };
      case "SET_FARM":
        const user = state.user
        if(user?.farms?.length){
          user.farms.push(actions.payload)
        } else {
          user.farms = [actions.payload]
        }

        return {...state, user}
      default:
        return state;
    }
  };

export const intialState = {
    loggedIn: token ? true : false,
    user: {}
}
  
export default authReducer;