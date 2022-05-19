import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
document.body.classList.add("bg-gray-100");

const AdminHeader = ({ header }) => {
  const history = useHistory();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userName = userData && userData.name ? userData.name : "Admin";
  const onLogout = () => {
    localStorage.clear();
    window.location.reload(true);
    history.replace("/admin/login");
  };
  return (
    <nav
      className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl blur shadow-blur mt-4 left-auto top-1 z-index-sticky"
      id="navbarBlur"
      navbar-scroll="true"
    >
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <h6 className="font-weight-bolder mb-0">{header}</h6>
        </nav>
        <div
          className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
          id="navbar"
        >
          <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
          <ul className="navbar-nav  justify-content-end">
            {/* <li className="nav-item d-flex align-items-center">
              <Link className="nav-link text-body font-weight-bold px-0" to="#">
                <i className="fa fa-user me-sm-1"></i>
                <span className="d-sm-inline d-none">Hello, {userName}!</span>
              </Link>
            </li> */}
            <li className="nav-item dropdown pe-2 d-flex align-items-center">
              <Link
                to="#"
                className="nav-link text-body p-0"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-user me-sm-1"></i>
                <span className="d-sm-inline d-none">Hello, {userName}!</span>
              </Link>
              <ul
                className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4"
                aria-labelledby="dropdownMenuButton"
              >
                <li className="mb-2">
                  <Link
                    className="dropdown-item border-radius-md"
                    to="/admin/profile"
                  >
                    <div className="d-flex py-1">
                      <div className="d-flex flex-column justify-content-center">
                        Profile
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="mb-2" onClick={onLogout}>
                  <Link to="#" className="dropdown-item border-radius-md">
                    <div className="d-flex py-1">
                      <div className="d-flex flex-column justify-content-center">
                        Logout
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
              <Link
                to="#"
                className="nav-link text-body p-0"
                id="iconNavbarSidenav"
              >
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                </div>
              </Link>
            </li>
            &nbsp;&nbsp;
            <li className="nav-item dropdown pe-2 d-flex align-items-center">
              <Link
                to="#"
                className="nav-link text-body p-0"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-cog cursor-pointer"></i>
              </Link>
              <ul
                className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4"
                aria-labelledby="dropdownMenuButton"
              >
                <li className="mb-2">
                  <Link
                    className="dropdown-item border-radius-md"
                    to="/admin/profile"
                  >
                    <div className="d-flex py-1">
                      <div className="d-flex flex-column justify-content-center">
                        Profile
                      </div>
                    </div>
                  </Link>
                </li>
                <li className="mb-2" onClick={onLogout}>
                  <Link to="#" className="dropdown-item border-radius-md">
                    <div className="d-flex py-1">
                      <div className="d-flex flex-column justify-content-center">
                        Logout
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
