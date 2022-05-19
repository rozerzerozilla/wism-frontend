import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AdminFooter from "./layout/admin.footer";
import AdminHeader from "./layout/admin.header";
import AdminNavMenu from "./layout/admin.navmenu";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/admin.actions";
import DisplayEmployees from "./support/display.emp";
import UnauthorizedModal from "./UnauthorizedModal";

const AdminEmployees = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const disptach = useDispatch();
  const staffs = useSelector((state) => state.admin.staffs);
  const isStaffloading = useSelector((state) => state.admin.isStaffloading)

  const sessionLogout = () => {
    localStorage.clear();
    //setAccess(true)
  }

  useEffect(() => {
    disptach(Actions.getData(ActionTypes.GET_ADMIN_STAFFS, "/home/employees", setErrors, setIsLoading));
  }, [disptach]);

  return (
    <>
      <AdminNavMenu path="staffs" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg">
        <AdminHeader header="Employees" />
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <div className="row">
                    <div className="col-9">
                      <h6>Available Employees</h6>
                    </div>
                    <div className="col-3">
                      <Link className="btn btn-success" to="/admin/addemployee">
                        Add Employee
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  {/* {errors && (
                    <div
                      className="alert alert-danger"
                      role="alert"
                      style={{ color: "white" }}
                    >
                      {errors}
                    </div>
                  )} */}
                  {errors && (errors === "Unauthorized access!" || errors === "Unauthorized") &&
                    <UnauthorizedModal
                      sessionLogout={sessionLogout}
                    />
                  }
                  {isLoading && (
                    <div className="text-center my-5">
                      <div className="spinner-border text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  )}
                  {!isLoading && !isStaffloading && (<div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                            Staff
                          </th>
                          <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10 ps-2">
                            Phone
                          </th>
                          <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10 ps-2">
                            Email
                          </th>
                          <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                            Role
                          </th>
                          <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                            Status
                          </th>
                          <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                            Created
                          </th>
                          <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {staffs &&
                          staffs.map((staff) => (
                            <DisplayEmployees staff={staff} key={staff.id} />
                          ))}
                      </tbody>
                    </table>
                  </div>)}
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

export default AdminEmployees;
