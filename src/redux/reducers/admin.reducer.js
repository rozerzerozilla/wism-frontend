import ActionTypes from "../../helpers/action.types";
const initialState = {
  categories: [],
  subcategories: [],
  subcategory: [],
  business: [],
  businesses: [],
  roles: [],
  staffs: [],
  staff:[],
  profile: [],
};

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ADMIN_ROLE:
      return { ...state, roles: action.payload };

    case ActionTypes.GET_ADMIN_STAFFS:
      return { ...state, staffs: action.payload };

      case ActionTypes.GET_ADMIN_STAFF:
      return { ...state, staff: action.payload };

    case ActionTypes.POST_ADMIN_STAFFS:
      return { ...state, staffs: [...state.staffs, action.payload] };

    case ActionTypes.GET_CATEGORIES:
      return { ...state, categories: action.payload };

    case ActionTypes.POST_CATEGORIES:
      return { ...state, categories: [...state.categories, action.payload] };

    case ActionTypes.GET_SUBCATEGORIES:
      return { ...state, subcategories: action.payload };

    case ActionTypes.POST_SUBCATEGORIES:
      return {
        ...state,
        subcategories: [...state.subcategories, action.payload],
      };

    case ActionTypes.GET_ADMIN_PROFILE:
      return { ...state, profile: action.payload };

    case ActionTypes.POST_ADMIN_PROFILE:
      return { ...state, profile: action.payload };

    case ActionTypes.GET_SUBCATEGORY:
      return { ...state, subcategory: action.payload };

    case ActionTypes.ADMIN_GET_BUSINESSES:
      return { ...state, businesses: action.payload };
    case ActionTypes.ADMIN_GET_BUSINESS:
      return { ...state, business: action.payload };
    default:
      return state;
  }
};
export default AdminReducer;
