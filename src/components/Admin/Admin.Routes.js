import { Route, useHistory } from "react-router-dom";
import { useEffect } from "react";
import * as API from "../../api/admin.api";
const AdminRoutes = ({ component: Component, ...rest }) => {
  const history = useHistory();
  useEffect(() => {
    async function checkLoggedIn() {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData) {
          history.replace("/admin/login");
        }
        if (!userData.adminID) {
          localStorage.clear();
          history.replace("/admin/login");
        }
        const { data } = await API.authPostData("/auth/validate", {
          adminID: userData.adminID,
          token: userData.token,
        });

        if (!data.valid) {
          localStorage.clear();
          history.replace("/admin/login");
        }
      } catch (e) {
        localStorage.clear();
        history.replace("/admin/login");
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

export default AdminRoutes;
