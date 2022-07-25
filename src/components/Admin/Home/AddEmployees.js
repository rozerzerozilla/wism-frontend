import { useState } from "react";
import {useHistory} from "react-router-dom"
import { useDispatch } from "react-redux";
import AdminFooter from "./layout/admin.footer";
import AdminHeader from "./layout/admin.header";
import AdminNavMenu from "./layout/admin.navmenu";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/admin.actions";
import FormAddEmp from "./support/form.add.emp";
import { AddStaffs } from "../../../helpers/admin.joi";
import { toast } from "react-toastify";
const AdminAddEmp = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    role: 2,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    const validInputs = validateForm();
    if (!validInputs) return null;

    setIsLoading(true);
    dispatch(
      Actions.postData(
        ActionTypes.POST_ADMIN_STAFFS,
        "/home/employees",
        userData,
        setErrors,
        setSuccess,
        setIsLoading
      )
    );
    // setUserData({});
  };
  if (success) {
    history.push("/admin/employees");
  }

  const validateForm = () => {
    const results = AddStaffs.validate(userData);
    if (results.error) {
      setErrors(results.error.details[0].message);
      return false;
    }
    setErrors("");
    return results.value;
  };

  return (
    <>
      <AdminNavMenu path="staffs" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <AdminHeader header="Add Employee" />
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                {errors && toast.success(errors)}

                {success && toast.success('Added Successfully')}
                <div className="card-body px-0 pt-0 pb-2">
                  <FormAddEmp
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

        <AdminFooter />
      </main>
    </>
  );
};

export default AdminAddEmp;
