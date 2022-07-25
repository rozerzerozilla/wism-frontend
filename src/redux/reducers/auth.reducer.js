import ActionTypes from "../../helpers/action.types";
const initialState = { userData: "" };
const auth = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN || ActionTypes.REGISTER || ActionTypes.VERIFY:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};
export default auth;
