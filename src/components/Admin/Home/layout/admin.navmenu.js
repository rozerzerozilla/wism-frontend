import dashboardLogo from "../../../../assets/img/lg2.png";
import { Link } from "react-router-dom";
const AdminNavMenu = ({ path }) => {
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
            className="navbar-brand-img h-100"
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
              to="/admin/dashboard"
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
              to="/admin/business"
            >
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fa fa-users text-lg opacity-10 "></i>
              </div>
              <span className="nav-link-text ms-1">Business</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${path === "staffs" ? "active" : null}`}
              to="/admin/employees"
            >
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fa fa-user-secret text-lg opacity-10 "></i>
              </div>
              <span className="nav-link-text ms-1">Employees</span>
            </Link>
          </li>
          <li className="nav-item mt-3">
            <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
              Category
            </h6>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${path === "category" ? "active" : null}`}
              to="/admin/categories"
            >
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fa fa-building text-lg opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Categories</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className={`nav-link ${path === "subcategory" ? "active" : null}`}
              to="/admin/subcategories"
            >
              <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="fa fa-building-o text-lg opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Sub Categories</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminNavMenu;
