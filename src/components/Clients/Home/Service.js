import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import ClientsFooter from "./layout/clients.footer";
import ClientsHeader from "./layout/clients.header";
import ClientsNavMenu from "./layout/clients.navmenu";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/client.actions";
import DisplayServices from "./support/display.services";
const ClientService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  var services;
  services = useSelector((state) => state.clients.services);
  useEffect(() => {
    dispatch(
      Actions.getData(
        ActionTypes.GET_CLIENT_SERVICE,
        "/home/services",
        setErrors,
        setIsLoading
      )
    );
  }, [dispatch]);

  const removeService = (id) => {
    dispatch(
      Actions.deleteData(
        ActionTypes.DELETE_SERVICE,
        `/home/services/${id}`,
        setErrors,
        setSuccess,
        setIsLoading
      )
    );
  };

  return (
    <>
      <ClientsNavMenu path="services" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <ClientsHeader header="Services" />
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <div className="row">
                    <div className="col-9">
                      <h6>Services</h6>
                    </div>
                    <div className="col-3">
                      <Link
                        to="/clients/addservices"
                        className="btn btn-primary"
                      >
                        Add Service
                      </Link>
                    </div>
                  </div>
                </div>
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
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0 mx-1">
                    <table className="table align-items-center mb-0 ">
                      <thead>
                        <tr>
                          <th className="text-centertext-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Name
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Description
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Prefix
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Service Time
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Staffs
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {services &&
                          services.map((service) => (
                            <DisplayServices
                              service={service}
                              key={service.id}
                              removeService={removeService}
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

export default ClientService;
