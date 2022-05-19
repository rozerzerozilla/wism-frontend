import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import ClientsFooter from "./layout/clients.footer";
import ClientsHeader from "./layout/clients.header";
import ClientsNavMenu from "./layout/clients.navmenu";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/client.actions";
import DisplayStaff from "./support/display.staff";
const ClientStaff = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(false);
  const dispatch = useDispatch();
  var staffs;
  staffs = useSelector((state) => state.clients.staffs);
  useEffect(() => {
    dispatch(
      Actions.getData(
        ActionTypes.GET_CLIENT_STAFFS,
        "/home/staff",
        setErrors,
        setIsLoading
      )
    );
  }, [dispatch]);

  //disable or enable staffs
  const toggleStaff = (checked, id) => {
    dispatch(
      Actions.putData(
        ActionTypes.UPDATE_CLIENT_STAFFS,
        "/home/staff",
        { id, checked },
        setErrors,
        setSuccess,
        setIsLoading
      )
    );
    dispatch(
      Actions.getData(
        ActionTypes.GET_CLIENT_STAFFS,
        "/home/staff",
        setErrors,
        setIsLoading
      )
    );
  };

  return (
    <>
      <ClientsNavMenu path="staffs" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <ClientsHeader header="Available Staffs" />
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <div className="row">
                    <div className="col-10">
                      <h6>Business Contents</h6>
                    </div>
                    <div className="col-2">
                      <Link to="/clients/addstaffs" className="btn btn-primary">
                        Add Staff
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <br />
                  {errors && (
                    <div
                      className="alert alert-danger"
                      role="alert"
                      style={{ color: "white" }}
                    >
                      {errors}
                    </div>
                  )}
                  {isLoading && (
                    <div className="text-center my-5">
                      <div className="spinner-border text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  )}
                  <div className="table-responsive p-0 mx-1">
                    <table className="table align-items-center mb-0 ">
                      <thead>
                        <tr>
                          {/* <th className="text-centertext-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Available
                          </th> */}
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Added
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Name
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Role
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Phone
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Email
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Status
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {staffs &&
                          staffs.map((staff) => (
                            <DisplayStaff
                              toggleStaff={toggleStaff}
                              staff={staff}
                              key={staff.id}
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

        <ClientsFooter />
      </main>
    </>
  );
};

export default ClientStaff;
