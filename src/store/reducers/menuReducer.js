const menuReducer = (state = {}, actions) => {
    switch (actions.type) {
      case "SET_OPEN":
        return { ...state, isOpen: true};
      case "SET_CLOSE":
        return { ...state, isOpen: false};
      default:
        return state;
    }
  };

export const intialState = {
    isOpen: true
}
  
export default menuReducer;