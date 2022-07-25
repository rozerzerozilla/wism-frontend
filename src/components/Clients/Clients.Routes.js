import { Route, useHistory } from "react-router-dom";
import { useEffect } from "react";
import * as API from "../../api/clients.api";
const ClientsRoutes = ({ component: Component, ...rest }) => {
  const history = useHistory();
  useEffect(() => {
    async function checkLoggedIn() {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData) {
          history.replace("/clients/login");
        }
        if (!userData.clientID) {
          localStorage.clear();
          history.replace("/clients/login");
        }
        const { data } = await API.authPostData("/auth/validate", {
          clientID: userData.clientID,
          token: userData.token,
        });
        if (!data.valid) {
          localStorage.clear();
          history.replace("/clients/login");
        }
      } catch (e) {
        localStorage.clear();
        history.replace("/clients/login");
      }
    }
    checkLoggedIn();
  }, [history]);
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};

export default ClientsRoutes;
