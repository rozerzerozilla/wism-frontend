import ActionTypes from "../../helpers/action.types";
const initialState = {
  categories: [],
  subcategories: [],
  subcategory: [],
  business: [],
  services: [],
  staffs: [],
  staff: [],
  custom_form: [],
  tokens: [],
  latlng: {},
  qrcodes: [],
};

const ClientReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case ActionTypes.GET_SUBCATEGORIES:
      return { ...state, subcategories: action.payload };
    case ActionTypes.GET_SUBCATEGORY:
      return { ...state, subcategory: action.payload };
    case ActionTypes.GET_CLIENT_BUSINESS:
      return { ...state, business: action.payload };

    case ActionTypes.POST_CLIENT_SERVICE:
      return { ...state, services: [...state.services, action.payload] };

    case ActionTypes.DELETE_SERVICE:
      return { ...state, services: action.payload };

    case ActionTypes.GET_CLIENT_SERVICE:
      return { ...state, services: action.payload };

    case ActionTypes.POST_CLIENT_CUSTOM_FORM:
      return { ...state, custom_form: [...state.custom_form, action.payload] };

    case ActionTypes.GET_CLIENT_CUSTOM_FORM:
      return { ...state, custom_form: action.payload };

    case ActionTypes.DELETE_CUSTOM_FIELD:
      return { ...state, custom_form: action.payload };

    case ActionTypes.POST_CLIENT_STAFFS:
      return { ...state, staffs: [...state.staffs, action.payload] };

    case ActionTypes.GET_CLIENT_STAFF:
      return { ...state, staff: action.payload };
    case ActionTypes.GET_CLIENT_STAFFS:
      return { ...state, staffs: action.payload };
    case ActionTypes.CLIENT_GET_TOKENS:
      return { ...state, tokens: action.payload };

    case ActionTypes.UPDATE_TOKENS:
      return { ...state, tokens: action.payload };

    case ActionTypes.GET_LATLNG:
      return { ...state, latlng: action.payload };

    case ActionTypes.GET_QRCODE:
      return { ...state, qrcodes: action.payload };

    default:
      return state;
  }
};
export default ClientReducer;
