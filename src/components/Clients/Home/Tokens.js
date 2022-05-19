import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ClientsFooter from "./layout/clients.footer";
import ClientsHeader from "./layout/clients.header";
import ClientsNavMenu from "./layout/clients.navmenu";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/client.actions";
import DisplayTokens from "./support/display.tokens";
const ClientTokens = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(false);
  const [disableSelect, setDisableSelect] = useState(false);
  const dispatch = useDispatch();
  var tokens;
  tokens = useSelector((state) => state.clients.tokens);
  useEffect(() => {
    dispatch(
      Actions.getData(
        ActionTypes.CLIENT_GET_TOKENS,
        "/home/tokens",
        setErrors,
        setIsLoading
      )
    );
  }, [dispatch]);
  const noShow = (id) => {
    dispatch(
      Actions.postData(
        ActionTypes.CLIENT_GET_TOKENS,
        "/home/tokens",
        { id: id, noshow: 1, status: null },
        setErrors,
        setSuccess,
        setIsLoading
      )
    );
  };
  // const completed = (id) => {
  //   dispatch(
  //     Actions.postData(
  //       ActionTypes.CLIENT_GET_TOKENS,
  //       "/home/tokens",
  //       { id: id, noshow: null, status: 1 },
  //       setErrors,
  //       setSuccess,
  //       setIsLoading
  //     )
  //   );
  // };

  const tokenChange = (id, progress) => {
    if (progress === "SERVING") {
      setDisableSelect(true);
    } else {
      setDisableSelect(false);
    }
    dispatch(
      Actions.putData(
        ActionTypes.UPDATE_TOKENS,
        `/home/tokens/${id}`,
        { id, progress },
        setErrors,
        setSuccess,
        setIsLoading
      )
    );
  };

  return (
    <>
      <ClientsNavMenu path="tokens" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <ClientsHeader header="Available Staffs" />
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <div className="row">
                    <div className="col-10">
                      <h6>Tokens</h6>
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
                  <DisplayTokens
                    tokens={tokens}
                    noShow={noShow}
                    isLoading={isLoading}
                    errors={errors}
                    success={success}
                    tokenChange={tokenChange}
                    disableSelect={disableSelect}
                    setDisableSelect={setDisableSelect}
                  />
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

export default ClientTokens;
