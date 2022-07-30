import { useState, useEffect } from "react";
import ClientsFooter from "./layout/clients.footer";
import ClientsHeader from "./layout/clients.header";
import ClientsNavMenu from "./layout/clients.navmenu";
import { useDispatch, useSelector } from "react-redux";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/client.actions";
import FormAddStaff from "./support/form.add.staff";
import { AddStaffs } from "../../../helpers/client.joi";
import { useHistory } from "react-router-dom";
const AddStaff = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  var added_services;
  added_services = useSelector((state) => state.clients.services);
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    services: [],
    break_time: "",
    role: 2,
  });
  const history = useHistory();
  const onSubmit = (event) => {
    event.preventDefault();
    const validInputs = validateForm();
    if (!validInputs) return null;

    if (userData.services) {
      userData.services = userData.services.toString();
    }
    if (userData.break_time) {
      userData.break_time = JSON.stringify(userData.break_time);
    }

    setIsLoading(true);
    dispatch(
      Actions.postData(
        ActionTypes.POST_CLIENT_STAFFS,
        "/home/staff",
        userData,
        setErrors,
        setSuccess,
        setIsLoading
      )
    );
    // setUserData({});
    //window.location.reload();
    // history.push("/clients/staffs");
    history.goBack()


  };

  const validateForm = () => {
    const results = AddStaffs.validate(userData);
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
        ActionTypes.GET_CLIENT_SERVICE,
        "/home/services",
        setErrors,
        setIsLoading
      )
    );
  }, [dispatch]);

  return (
    <>
      <ClientsNavMenu path="staffs" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <ClientsHeader header="Add Staff" />
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                {errors && (
                  <div
                    className="alert alert-danger mx-5"
                    role="alert"
                    style={{ color: "white" }}
                  >
                    {errors}
                  </div>
                )}

                {/* {success && (
                  <div
                    className="alert alert-success mx-5"
                    role="alert"
                    style={{ color: "white" }}
                  >
                    <h5 style={{ color: "white" }}>
                      Staff Added successfully, please visit Staffs Tab to check
                      the details
                    </h5>
                  </div>
                )} */}
                <div className="card-body px-0 pt-0 pb-2">
                  <FormAddStaff
                    onSubmit={onSubmit}
                    userData={userData}
                    setUserData={setUserData}
                    isLoading={isLoading}
                    services={added_services}
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

export default AddStaff;
