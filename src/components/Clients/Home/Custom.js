import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from 'react-responsive-modal';
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/client.actions";
import { AddCustomForm } from "../../../helpers/client.joi";
import ClientsFooter from "./layout/clients.footer";
import ClientsHeader from "./layout/clients.header";
import ClientsNavMenu from "./layout/clients.navmenu";
import FormCustomFields from "./support/form.custom.fields";
import UnauthorizedModal from "../../Admin/Home/UnauthorizedModal";

const ClientCustomForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openModal, setOpenModal] = useState(false);


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
    return () => {
      dispatch({
        type: ActionTypes.GET_CLIENT_CUSTOM_FORM,
        payload:[]
      })
    }
  }, [dispatch, window.location]);

  useEffect(() => {
    if(success) {
      setOpenModal(false)
      setSuccess(false);
    }
  },[success])

  useEffect(() => {
    if(errors) {
      setOpenModal(false)
      setSuccess(false);
    }
  },[errors])

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
                <div className="card-header pb-2">
                  <div className="row align-items-center">
                    <div className="col-6">
                      <h6>Custom Form Fields</h6>
                    </div>
                    <div className="col-6 text-center d-flex flex-row-reverse">
                      <button className="btn bg-gradient-info w-50" onClick={()=>setOpenModal(true)}>
                        Add Custom Form Field
                      </button>
                    </div>
                  </div>
                </div>
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
                <div className="card-body px-0 pt-0 pb-2">
                  <FormCustomFields
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
      <Modal open={openModal} onClose={()=>setOpenModal(false)} center>
      <h5>Add Custom Form Field</h5>
        <form onSubmit={onSubmit} className="mx-4 my-4">
          <div className="mb-3">
            <div className="row">
              <div className="col-12">
                <label>Field/Display Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Display Name"
                  name="name"
                  required
                  value={userData.name || ""}
                  onChange={(e) => {
                    setUserData({ ...userData, name: e.target.value });
                  }}
                />
              </div>
              <div className="col-12">
                <label>Field Type</label>
                <select
                  className="form-control"
                  name="type"
                  onChange={(e) => {
                    setUserData({ ...userData, type: e.target.value });
                  }}
                >
                  <option value="">Choose Type</option>
                  <option value="Text" key="1">
                    Text
                  </option>
                  <option value="Date" key="2">
                    Date
                  </option>
                  <option value="Dropdown" key="3">
                    Dropdown
                  </option>
                </select>
              </div>
              <div className="col-12">
                <label>Is It Required?</label>
                <select
                  className="form-control"
                  name="is_required"
                  onChange={(e) => {
                    setUserData({ ...userData, is_required: e.target.value });
                  }}
                >
                  <option value="0" key="1">
                    No
                  </option>
                  <option value="1" key="2">
                    Yes
                  </option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label>Values</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Valaues(for dropdown enter values seperated by commas)"
                  name="given_values"
                  value={userData.given_values || ""}
                  onChange={(e) => {
                    setUserData({ ...userData, given_values: e.target.value });
                  }}
                />
              </div>
              <div className="col-6">
                <label>Default Value</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Default Value"
                  name="def_values"
                  value={userData.def_values || ""}
                  onChange={(e) => {
                    setUserData({ ...userData, def_values: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-12">
              <button
                type="submit"
                className="btn bg-gradient-info w-100 mt-4 mb-0 mx-auto"
                disabled={isLoading}
              >
                {isLoading && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                &nbsp;&nbsp;Add Custom Form Field
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ClientCustomForm;
