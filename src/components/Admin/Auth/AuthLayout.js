import { Link } from "react-router-dom";
import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";
import AuthFormLogin from "./AuthFormLogin";
import LoginBg from "../../../assets/img/login_bg.jpg";
const AuthLayout = (props) => {
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
                        {props.title}
                      </h3>
                      <p className="mb-0">{props.subTitle}</p>
                    </div>

                    <div className="card-body">
                      {props.loginErrors && (
                        <div
                          className="alert alert-danger"
                          role="alert"
                          style={{ color: "white" }}
                        >
                          {props.loginErrors}
                        </div>
                      )}
                      <AuthFormLogin
                        userData={props.userData}
                        usersInputs={props.usersInputs}
                        onSubmit={props.onSubmit}
                        validateForm={props.validateForm}
                        isLoading={props.isLoading}
                      />
                    </div>

                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                      {props.type === "login" && (
                        <p className="mb-4 text-sm mx-auto">
                          Don't have an account?
                          <Link
                            to=""
                            className="text-info text-gradient font-weight-bold"
                          >
                            Sign up
                          </Link>
                        </p>
                      )}
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

export default AuthLayout;
