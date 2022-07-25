import { combineReducers } from "redux";
import auth from "./auth.reducer";
import ClientReducer from "./clients.reducer";
import AdminReducer from "./admin.reducer";
import HomeReducer from "./home.reducer";
const reducer = combineReducers({
  auth: auth,
  clients: ClientReducer,
  admin: AdminReducer,
  home: HomeReducer,
});
export default reducer;
