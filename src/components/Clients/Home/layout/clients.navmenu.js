import dashboardLogo from "../../../../assets/img/lg2.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const ClientsNavMenu = ({ path }) => {
  const [role, setRole] = useState(1);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData?.role) {
      setRole(userData?.role);
    }
  }, []);

  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 ps ps--active-y bg-white "
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <i
          className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        ></i>
        <Link className="navbar-brand m-0" to="/admin/dashboard">
          <img
            src={dashboardLogo}
            className="navbar-brand-img"
            alt="main_logo"
            style={{ display: "block", margin: "auto", width: "100px" }}
          />
        </Link>
      </div>
      <hr className="horizontal dark mt-0" />
      <div
        className="collapse navbar-collapse  w-auto  max-height-vh-100 h-100"
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className={`nav-link ${path === "dashboard" ? "active" : null}`}
              to="/clients/dashboard"
            >
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fa fa-home text-lg opacity-10 "></i>
              </div>
              <span className="nav-link-text ms-1">Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${path === "business" ? "active" : null}`}
              to="/clients/business"
            >
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fa fa-users text-lg opacity-10 "></i>
              </div>
              <span className="nav-link-text ms-1">Business</span>
            </Link>
          </li>
          {role === 1 && (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    path === "services" ? "active" : null
                  }`}
                  to="/clients/services"
                >
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="fa fa-users text-lg opacity-10 "></i>
                  </div>
                  <span className="nav-link-text ms-1">Services</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${path === "staffs" ? "active" : null}`}
                  to="/clients/staffs"
                >
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="fa fa-user-secret text-lg opacity-10 "></i>
                  </div>
                  <span className="nav-link-text ms-1">Staffs</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${path === "form" ? "active" : null}`}
                  to="/clients/customform"
                >
                  <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="fa fa-user-secret text-lg opacity-10 "></i>
                  </div>
                  <span className="nav-link-text ms-1">Custom Form Fields</span>
                </Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link
              className={`nav-link ${path === "codes" ? "active" : null}`}
              to="/clients/codes"
            >
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fa fa-user-secret text-lg opacity-10 "></i>
              </div>
              <span className="nav-link-text ms-1">QR Code</span>
            </Link>
          </li>

          <li className="nav-item mt-3">
            <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
              Tokens
            </h6>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${path === "tokens" ? "active" : null}`}
              to="/clients/tokens"
            >
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fa fa-building text-lg opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Serve Token</span>
            </Link>
          </li>

          {/* <li className="nav-item">
            <Link
              className={`nav-link ${path === "subcategory" ? "active" : null}`}
              to="/clients/subcategory"
            >
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fa fa-building-o text-lg opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Create Token</span>
            </Link>
          </li> */}
        </ul>
      </div>
    </aside>
  );
};

export default ClientsNavMenu;
