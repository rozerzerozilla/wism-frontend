import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/client.actions";
import { AddCustomForm } from "../../../helpers/client.joi";
import ClientsFooter from "./layout/clients.footer";
import ClientsHeader from "./layout/clients.header";
import ClientsNavMenu from "./layout/clients.navmenu";
import FormCustomFields from "./support/form.custom.fields";
const ClientCustomForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    type: "",
    is_required: "",
    given_values: "",
    def_values: "",
  });
  var customFormFields = [];
  customFormFields = useSelector((state) => {
    return state.clients.custom_form;
  });
  const onSubmit = (event) => {
    event.preventDefault();
    const validInputs = validateForm();
    if (!validInputs) return null;
    setIsLoading(true);
    dispatch(
      Actions.postData(
        ActionTypes.POST_CLIENT_CUSTOM_FORM,
        "/home/customform",
        userData,
        setErrors,
        setSuccess,
        setIsLoading
      )
    );
    setUserData({});
  };

  const validateForm = () => {
    const results = AddCustomForm.validate(userData);
    if (results.error) {
      setErrors(results.error.details[0].message);
      return false;
    }
    setErrors("");
    return results.value;
  };

  useEffect(() => {
    dispatch(
      Actions.getData(
        ActionTypes.GET_CLIENT_CUSTOM_FORM,
        "/home/customform",
        setErrors,
        setIsLoading
      )
    );
  }, [dispatch]);

  const removeField = (id) => {
    dispatch(
      Actions.deleteData(
        ActionTypes.DELETE_CUSTOM_FIELD,
        `/home/customform/${id}`,
        setErrors,
        setSuccess,
        setIsLoading
      )
    );
  };

  return (
    <>
      <ClientsNavMenu path="form" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <ClientsHeader header="Custom Form Fields" />
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <h6>Custom Form Fields</h6>
                </div>
                {errors && (
                  <div
                    className="alert alert-danger mx-5"
                    role="alert"
                    style={{ color: "white" }}
                  >
                    {errors}
                  </div>
                )}

                {success && (
                  <div
                    className="alert alert-success mx-5"
                    role="alert"
                    style={{ color: "white" }}
                  >
                    {success}
                  </div>
                )}
                <div className="card-body px-0 pt-0 pb-2">
                  <FormCustomFields
                    onSubmit={onSubmit}
                    userData={userData}
                    setUserData={setUserData}
                    isLoading={isLoading}
                    customFormFields={customFormFields}
                    removeField={removeField}
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

export default ClientCustomForm;
