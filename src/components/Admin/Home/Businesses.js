import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AdminFooter from "./layout/admin.footer";
import AdminHeader from "./layout/admin.header";
import AdminNavMenu from "./layout/admin.navmenu";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/admin.actions";
import DisplayBusinesses from "./support/display.businesses";
import UnauthorizedModal from "./UnauthorizedModal";

const AdminBusinesses = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);
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
  //disable or enable staffs
  const toggleBusiness = (checked, id) => {
    dispatch(
      Actions.putData(
        ActionTypes.ADMIN_PUT_BUSINESS,
        "/home/business",
        { id, checked },
        setErrors,
        setSuccess,
        setIsLoading
      )
    );
    dispatch(
      Actions.getData(
        ActionTypes.ADMIN_GET_BUSINESSES,
        "/home/business",
        setErrors,
        setIsLoading
      )
    );
  };

  return (
    <>
      <AdminNavMenu path="business" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <AdminHeader header="Business Details" />
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <div className="row">
                    <div className="col-9">
                      <h6>Businesses</h6>
                    </div>
                    <div className="col-3">
                      <Link to="/admin/addbusiness" className="btn btn-primary">
                        Add Business
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <br />
                  {errors && (errors !== "Unauthorized access!" && errors !== "Unauthorized") && (
                    <div className="d-flex  text-center w-100">
                      <p className="mx-auto text-danger text-center text-capitalize text-secondary text-md font-weight-bolder opacity-10">
                        {errors}
                      </p>
                    </div>
                  )}

                  {errors && (errors === "Unauthorized access!" || errors === "Unauthorized") &&
                    <UnauthorizedModal />
                  }
                  {isLoading && (
                    <div className="text-center my-5">
                      <div className="spinner-border text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  )}

                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                            Business
                          </th>

                          <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                            Category
                          </th>

                          <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                            Status
                          </th>
                          <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {business &&
                          business.map((client) => (
                            <DisplayBusinesses
                              client={client}
                              key={client.id}
                              toggleBusiness={toggleBusiness}
                            />
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AdminFooter />
      </main>
    </>
  );
};

export default AdminBusinesses;
