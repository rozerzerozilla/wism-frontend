import styles from "./auth.module.css";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import Logo from "../../../assets/img/lg2.png";
const AuthHeader = () => {
  return (
    <div className="container z-index-sticky top-0">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg blur blur-rounded top-0 z-index-3 shadow position-absolute start-0 end-0 ">
            <div className="container-fluid">
              <Link
                className="navbar-brand font-weight-bolder ms-lg-0 ms-3 "
                to="/"
              >
                <img
                  src={Logo}
                  className="img-fluid"
                  alt="main_logo"
                  style={{ width: "45px" }}
                />
              </Link>
              <button
                className="navbar-toggler shadow-none ms-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navigation"
                aria-controls="navigation"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon mt-2">
                  <span className="navbar-toggler-bar bar1"></span>
                  <span className="navbar-toggler-bar bar2"></span>
                  <span className="navbar-toggler-bar bar3"></span>
                </span>
              </button>

              <div className="collapse navbar-collapse" id="navigation">
                <ul className={`navbar-nav ${styles["menu-margin-right"]} `}>
                  <li className="nav-item">
                    <Link className="nav-link me-2" to="/clients/register">
                      <i className="fa fa-user-circle-o opacity-6 text-dark me-1"></i>
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link me-2" to="/clients/login">
                      <i className="fa fa-unlock-alt opacity-6 text-dark me-1"></i>
                      Sign In
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
