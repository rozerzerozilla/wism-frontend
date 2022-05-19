import ActionTypes from "../../helpers/action.types";
const initialState = {
  categories: [],
  homecategories: [],
  homecategory: [],
  subcategories: [],
  subcategory: [],
  address: [],
  businesses: [],
  business: [],
  timeslots: [],
  tokens: [],
  city: [],
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_CATEGORIES:
      return { ...state, categories: action.payload };

    case ActionTypes.GET_HOME_CATEGORIES:
      return { ...state, homecategories: action.payload };

    case ActionTypes.GET_HOME_CATEGORY:
      return { ...state, homecategory: action.payload };

    case ActionTypes.GET_SUBCATEGORIES:
      return { ...state, subcategories: action.payload };
    case ActionTypes.GET_SUBCATEGORY:
      return { ...state, subcategory: action.payload };
    case ActionTypes.PUBLIC_GET_BUSINESSES:
      return { ...state, businesses: action.payload };
    case ActionTypes.PUBLIC_GET_BUSINESS:
      return { ...state, business: action.payload };
    case ActionTypes.PUBLIC_GET_TIMESLOTS:
      return { ...state, timeslots: action.payload };
    case ActionTypes.PUBLIC_GET_TOKENS:
      return { ...state, tokens: action.payload };
    case ActionTypes.PUBLIC_POST_TOKEN:
      return { ...state, tokens: [...state.tokens, action.payload] };
    case ActionTypes.GET_CITY_NAME:
      return { ...state, city: action.payload };

    default:
      return state;
  }
};
export default HomeReducer;
