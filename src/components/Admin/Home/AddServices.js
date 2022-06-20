import { useEffect, useState } from "react";
import AdminFooter from "./layout/admin.footer";
import AdminHeader from "./layout/admin.header";
import AdminNavMenu from "./layout/admin.navmenu";
import FormAddServices from "./support/form.add.services";
import { useDispatch } from "react-redux";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/admin.actions";
import { AddService } from "../../../helpers/admin.joi";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const AdminAddService = () => {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    description: "",
    prefix: "",
    service_time: "",
    business_id: id,
  });

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
    history.push(`/admin/business/${id}`);
  };

  const validateForm = () => {
    const results = AddService.validate(userData);
    if (results.error) {
      toast.error(results.error.details[0].message)
      return false;
    }
    setErrors(null);
    return results.value;
  };

  useEffect(()=>{
    if(errors){
      toast.error(errors)
    }
    if(success){
      toast.success(success)
    }
  },[errors, success])

  return (
    <>
      <AdminNavMenu path="business" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <AdminHeader header="Add Services" />
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

        <AdminFooter />
      </main>
    </>
  );
};

export default AdminAddService;
