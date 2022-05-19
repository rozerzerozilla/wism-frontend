import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ClientsFooter from "./layout/clients.footer";
import ClientsHeader from "./layout/clients.header";
import ClientsNavMenu from "./layout/clients.navmenu";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/client.actions";
import DisplayBusiness from "./support/display.business";
const ClientBusiness = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const dispatch = useDispatch();
  var business;
  business = useSelector((state) => state.clients.business);
  useEffect(() => {
    dispatch(
      Actions.getData(
        ActionTypes.GET_CLIENT_BUSINESS,
        "/home/business",
        setErrors,
        setIsLoading
      )
    );
  }, [dispatch]);
  return (
    <>
      <ClientsNavMenu path="business" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <ClientsHeader header="Business Details" />
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <div className="row">
                    <div className="col-9">
                      <h6>Business Contents</h6>
                    </div>
                    <div className="col-3">
                      {business.length === 0 && (
                        <Link
                          to="/clients/addbusiness"
                          className="btn btn-primary"
                        >
                          Add Business Details
                        </Link>
                      )}
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
                      {errors === "Unauthorized access!"
                        ? window.location.reload()
                        : errors}
                    </div>
                  )}
                  {isLoading && (
                    <div className="text-center my-5">
                      <div className="spinner-border text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  )}
                  {business.length !== 0 && (
                    <DisplayBusiness details={business} />
                  )}
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

export default ClientBusiness;
