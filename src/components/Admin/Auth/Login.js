import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
//joi validation
import * as Joi from "../../../helpers/admin.joi";
//import actions
import { Login } from "../../../redux/actions/admin.actions";
import ActionTypes from "../../../helpers/action.types";
import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";
import LoginBg from "../../../assets/img/login_bg.jpg";
import FormLogin from "./FormLogin";

//validate the login
import * as API from "../../../api/admin.api";

const AdminLogin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState({ username: "", password: "" });

  const onSubmit = (event) => {
    event.preventDefault();
    const validInputs = validateForm();
    if (!validInputs) return null;
    setIsLoading(true);
    dispatch(
      Login(
        ActionTypes.LOGIN,
        "/auth/login",
        userData,
        setErrors,
        setSuccess,
        setIsLoading,
        history
      )
    );
  };

  const validateForm = () => {
    const results = Joi.Login.validate(userData);
    if (results.error) {
      setErrors(results.error.details[0].message);
      return false;
    }
    setErrors("");
    return results.value;
  };

  useEffect(() => {
    async function checkLoggedIn() {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData) {
          return;
        }
        if (!userData.adminID) {
          localStorage.clear();
          return;
        }
        const { data } = await API.authPostData("/auth/validate", {
          adminID: userData.adminID,
          token: userData.token,
        });
        if (data.valid) {
          history.replace("/admin/dashboard");
        }
      } catch (e) {}
    }
    checkLoggedIn();
  }, [history]);

  return (
    <>
      <AuthHeader />
      <main className="main-content  mt-0">
        <section>
          <div className="page-header min-vh-75">
            <div className="container">
              <div className="row">
                <div className="col-md-6 d-flex flex-column mx-auto">
                  <div className="card card-plain mt-8">
                    <div className="card-header pb-0 text-left bg-transparent">
                      <h3 className="font-weight-bolder text-info text-gradient">
                        Welcome to WiSM
                      </h3>
                      <p className="mb-0" style={{ color: "white" }}>
                        Please Login!
                      </p>
                    </div>

                    <div className="card-body">
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
                      <FormLogin
                        userData={userData}
                        setUserData={setUserData}
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="oblique position-absolute top-0 h-100 d-md-block d-none me-n8">
                    <div
                      className="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                      style={{ backgroundImage: `url(${LoginBg})` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <AuthFooter />
    </>
  );
};

export default AdminLogin;
