import ClientsFooter from "./layout/clients.footer";
import ClientsHeader from "./layout/clients.header";
import ClientsNavMenu from "./layout/clients.navmenu";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/client.actions";
import DisplayStaff from "./support/display.staff";
const ClientCode = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(false);
  const dispatch = useDispatch();
  var qrcodes;
  qrcodes = useSelector((state) => state.clients.qrcodes);
  useEffect(() => {
    dispatch(
      Actions.getData(
        ActionTypes.GET_QRCODE,
        "/home/qrcodes",
        setErrors,
        setIsLoading
      )
    );
  }, [dispatch]);
  return (
    <>
      <ClientsNavMenu path="codes" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <ClientsHeader header="Dashboard" />
        <div className="container mt-4">
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
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0"></div>
                <div
                  className="card-body px-0 pt-0 pb-2"
                  style={{ textAlign: "center" }}
                >
                  {qrcodes && (
                    <>
                      {`https://www.wism.in/business/${qrcodes.id}`}
                      {qrcodes.bname}
                      <img
                        src={qrcodes.qrcode}
                        alt="qrcode"
                        width={250}
                        height={250}
                        style={{ display: "block", margin: "auto" }}
                      />
                    </>
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

export default ClientCode;
