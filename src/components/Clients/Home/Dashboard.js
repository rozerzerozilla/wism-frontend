import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/client.actions";

import ClientsFooter from "./layout/clients.footer";
import ClientsHeader from "./layout/clients.header";
import ClientsNavMenu from "./layout/clients.navmenu";
const ClientDashboard = () => {
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
      <ClientsNavMenu path="dashboard" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <ClientsHeader header="Dashboard" />
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  {errors && errors === "Unauthorized access!"
                    ? window.location.reload()
                    : ""}
                  <h6>
                    Add your Business, Services and Staffs to start getting
                    leads!
                  </h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2"></div>
              </div>
            </div>
          </div>
        </div>

        <ClientsFooter />
      </main>
    </>
  );
};

export default ClientDashboard;
