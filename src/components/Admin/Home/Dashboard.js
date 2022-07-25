import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminFooter from "./layout/admin.footer";
import AdminHeader from "./layout/admin.header";
import AdminNavMenu from "./layout/admin.navmenu";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/admin.actions";
const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const dispatch = useDispatch();
  var business;
  business = useSelector((state) => state.admin.businesses);

  useEffect(() => {
    dispatch(
      Actions.getData(
        ActionTypes.ADMIN_GET_BUSINESSES,
        "/home/business",
        setErrors,
        setIsLoading
      )
    );
  }, [dispatch]);
  return (
    <>
      <AdminNavMenu path="dashboard" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <AdminHeader header="Dashboard" />
        <div className="container mt-4 content-view">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <h6>Dashboard Contents</h6>
                  {errors && errors === "Unauthorized access!"
                    ? window.location.reload()
                    : ""}
                </div>
                <div className="card-body px-0 pt-0 pb-2"></div>
              </div>
            </div>
          </div>
        </div>

        <AdminFooter />
      </main>
    </>
  );
};

export default AdminDashboard;
