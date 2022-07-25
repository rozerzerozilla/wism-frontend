import { useEffect, useState } from "react";
import ClientsFooter from "./layout/clients.footer";
import ClientsHeader from "./layout/clients.header";
import ClientsNavMenu from "./layout/clients.navmenu";
import FormAddServices from "./support/form.add.services";
import { useDispatch } from "react-redux";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/client.actions";
import { AddService } from "../../../helpers/client.joi";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const ClientAddService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    description: "",
    prefix: "",
    service_time: "",
  });
  const history = useHistory();
  const onSubmit = (event) => {
    event.preventDefault();
    const validInputs = validateForm();
    if (!validInputs) return null;
    setIsLoading(true);
    dispatch(
      Actions.postData(
        ActionTypes.POST_CLIENT_SERVICE,
        "/home/services",
        userData,
        setErrors,
        setSuccess,
        setIsLoading
      )
    );
    setUserData({});
    //window.location.reload();
    history.push("/clients/services");
  };

  const validateForm = () => {
    const results = AddService.validate(userData);
    if (results.error) {
      setErrors(results.error.details[0].message);
      return false;
    }
    setErrors("");
    return results.value;
  };

  useEffect(() => {
    if (success !== false && success !== "" && success !== null) {
      toast.error(success)
    }
    if(errors !== false && errors !== "" && errors !== null) {
      toast.error(errors)
    }
  },[success, errors])

  return (
    <>
      <ClientsNavMenu path="services" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <ClientsHeader header="Add Services" />
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <h6>Add Service</h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <FormAddServices
                    onSubmit={onSubmit}
                    userData={userData}
                    setUserData={setUserData}
                    isLoading={isLoading}
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

export default ClientAddService;
