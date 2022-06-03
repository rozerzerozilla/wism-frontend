import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import AdminFooter from "./layout/admin.footer";
import AdminHeader from "./layout/admin.header";
import AdminNavMenu from "./layout/admin.navmenu";
import { useDispatch, useSelector } from "react-redux";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/admin.actions";
import FormAddStaff from "./support/form.add.staff";
import { AddBStaffs } from "../../../helpers/admin.joi";
const AddBusinessStaff = () => {
  const { id } = useParams();
  const history = useHistory();
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
    business_id: id,
    role: 2,
  });

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
        "/home/bstaffs",
        userData,
        setErrors,
        setSuccess,
        setIsLoading
      )
    );
    // setUserData({});
    history.push(`/admin/business/${id}`);
  };

  const validateForm = () => {
    const results = AddBStaffs.validate(userData);
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
        `/home/services/${id}`,
        setErrors,
        setIsLoading
      )
    );
  }, [dispatch]);

  return (
    <>
      <AdminNavMenu path="business" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <AdminHeader header="Add Staff" />
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

        <AdminFooter />
      </main>
    </>
  );
};

export default AddBusinessStaff;
