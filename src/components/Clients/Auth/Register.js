import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
//joi validation
import * as Joi from "../../../helpers/client.joi";
//import actions
import { Register } from "../../../redux/actions/client.actions";
import ActionTypes from "../../../helpers/action.types";
import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";
import LoginBg from "../../../assets/img/login_bg.jpg";
import FormRegister from "./FormRegister";
import axios from "axios";
import {URL} from "../../../api/clients.api"
const ClientRegister = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [validateOtp, setValidateOtp] = useState(false);
  const [otpSend, setOTPSend] = useState(false)
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const [otp, setOtp] = useState('');
  const [validateUrlId, setValidateUrlId] = useState('');
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    password: "",
    otp: "",
  });
  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (otpSend) {
      axios.post(URL + '/auth/phone/validate-otp/' + validateUrlId,
        { "phone": userData.phone, otp: userData.otp }).then(res => {
          setOTPSend(false)
          setValidateOtp(true);
          setIsLoading(false);
      }).catch(error => {
        setValidateOtp(false);
        setIsLoading(false);
      })
    } else if (validateOtp) {
      console.log('Regiter')
      const validInputs = validateForm();
      if (!validInputs) return null;
      // dispatch(
      //   Register(
      //     ActionTypes.REGISTER,
      //     "/auth/register",
      //     userData,
      //     setErrors,
      //     setSuccess,
      //     setIsLoading,
      //     history
      //   )
      // );
    } else {
      axios.post(URL + '/auth/phone/otp', { "phone": userData.phone }).then(res => {
        setUserData(prevState => ({ ...prevState, otp: res.data.otp }))
        setValidateUrlId(res.data.id)
        setOTPSend(true)
        setIsLoading(false)
      }).catch(error => {
        setOTPSend(false);
        setIsLoading(false);
      })
    }
    
    
  };

  const validateForm = () => {
    const results = Joi.Register.validate(userData);
    if (results.error) {
      setErrors(results.error.details[0].message);
      return false;
    }
    setErrors("");
    return results.value;
  };

  return (
    <>
      <AuthHeader />
      <main className="main-content  mt-0">
        <section>
          <div className="page-header min-vh-75">
            <div className="container">
              <div className="row">
                <div className="col-md-6 d-flex flex-column mx-auto">
                  <div className="card card-plain mt-5">
                    <div className="card-header pb-0 text-left bg-transparent">
                      <h3 className="font-weight-bolder text-info text-gradient">
                        Welcome to WiSM
                      </h3>
                      <p className="mb-0" style={{ color: "white" }}>
                        Sign up page is for those who wish to add their
                        business/organization to use the Walk-in Service
                        Manager. Please enter a valid phone number. An OTP will
                        be sent for verification.
                        <br />
                        Once the details of your organization is entered, we
                        will verify the address to ensure its existence.
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
                      <FormRegister
                        otpSend={otpSend}
                        validateOtp={validateOtp}
                        userData={userData}
                        setUserData={setUserData}
                        onSubmit={onSubmit}
                        isLoading={isLoading}
                      />
                    </div>

                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                      <p className="mb-4 mx-auto" style={{ color: "white" }}>
                        Already have an account?
                        <Link
                          to="/clients/login"
                          className="text-info font-weight-bold"
                        >
                          &nbsp;&nbsp;Login
                        </Link>
                      </p>
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

export default ClientRegister;
