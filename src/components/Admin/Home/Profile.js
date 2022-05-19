import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminFooter from "./layout/admin.footer";
import AdminHeader from "./layout/admin.header";
import AdminNavMenu from "./layout/admin.navmenu";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/admin.actions";
import AdminFormUpdateProfile from "./support/form.update.profile";
import { profile } from "../../../helpers/admin.joi";
const AdminProfile = () => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.admin.profile);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    image: "",
    password: "",
    newPassword: "",
    repeatPassword: "",
  });
  const [profileImage, setProfileImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const validInputs = validateForm();
    if (!validInputs) return null;
    const formData = new FormData();
    if (selectedImage) {
      formData.append("image", selectedImage, selectedImage.name);
    }
    formData.append("id", event.target.elements.id.value);
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("newPassword", userData.newPassword);
    formData.append("repeatPassword", userData.repeatPassword);
    setIsLoading(true);
    //dispatch the action
    dispatch(
      Actions.postData(
        ActionTypes.POST_ADMIN_PROFILE,
        "/home/profile",
        formData,
        setErrors,
        setSuccess,
        setIsLoading
      )
    );
  };
  const validateForm = () => {
    const results = profile.validate(userData);
    if (results.error) {
      console.log(results.error);
      setErrors(results.error.details[0].message);
      return false;
    }
    setErrors("");
    return results.value;
  };
  useEffect(() => {
    dispatch(
      Actions.getData(
        ActionTypes.GET_ADMIN_PROFILE,
        "/home/profile",
        setErrors,
        setIsLoading
      )
    );
  }, [dispatch]);

  return (
    <>
      <AdminNavMenu path="profile" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <AdminHeader header="Profile" />
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <h6>Profile Details</h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  {errors && (
                    <div
                      className="alert alert-danger"
                      role="alert"
                      style={{ color: "white" }}
                    >
                      {errors}
                    </div>
                  )}
                  {success && (
                    <div
                      className="alert alert-success"
                      role="alert"
                      style={{ color: "white" }}
                    >
                      {success}
                    </div>
                  )}
                  {isLoading && (
                    <div className="text-center my-5">
                      <div className="spinner-border text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  )}
                  <AdminFormUpdateProfile
                    profileData={profileData}
                    profileImage={profileImage}
                    setUserData={setUserData}
                    setProfileImage={setProfileImage}
                    userData={userData}
                    isLoading={isLoading}
                    onSubmit={onSubmit}
                    setSelectedImage={setSelectedImage}
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

export default AdminProfile;
