import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import AdminFooter from "./layout/admin.footer";
import AdminHeader from "./layout/admin.header";
import AdminNavMenu from "./layout/admin.navmenu";
import { useDispatch, useSelector } from "react-redux";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/admin.actions";
import FormEditStaff from "./support/form.edit.staff";
import { AddBStaffs } from "../../../helpers/admin.joi";
import { toast } from "react-toastify";
const EditBusinessStaff = () => {
  const { id, clientID } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  var added_services;
  added_services = useSelector((state) => state.clients.services);
  var staff = useSelector(state=>state.admin.staff)
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    username: "",
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
    console.log(userData)
    dispatch(
      Actions.patchData(
        ActionTypes.UPDATE_ADMIN_STAFF,
        `/home/bstaffs/${clientID}`,
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
      toast.error(results.error.details[0].message);
      return false;
    }
    setErrors(null);
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
    dispatch(
        Actions.getData(
          ActionTypes.GET_ADMIN_STAFF,
          `/home/bstaffs/${clientID}`,
          setErrors,
          setIsLoading
        )
      );
  }, [dispatch]);

  useEffect(()=>{
    // console.log("staff details", staff, added_services);
    if(staff.length > 0 ){
        // staff[0]?.services_clients.forEach(ele=>)
        const user = {
            name: staff[0].name,
            phone: staff[0].phone,
            email: staff[0].email,
            username: staff[0].username,
            services: [...staff[0]?.services_clients.map(ele=>ele.service_id)],
            break_time: JSON.parse(staff[0]?.break_time),
            business_id: id,
            role: staff[0].role,
        }
        setUserData(user)
        console.log("staff details", user);
    }
  },[staff, added_services])

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
        <AdminHeader header="Edit Staff" />
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-body px-0 pt-0 pb-2">
                  <FormEditStaff
                    onSubmit={onSubmit}
                    userData={userData}
                    staff={staff}
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

export default EditBusinessStaff;
