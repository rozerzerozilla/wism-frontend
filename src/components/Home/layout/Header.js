import { Link } from "react-router-dom";
import styles from "../home.module.css";
import "font-awesome/css/font-awesome.min.css";
import {FiMapPin} from "react-icons/fi"
import Logo from "../../../assets/img/lg2.png";
const HomeHeader = ({
  categories,
  subcategories,
  cityName,
  getSubcategories,
  setCategoryID,
  filterForm,
  setSubCategoryID,
  setCity,
  setDist,
  city,
  setInputBusiness,
  filterForm2,
  setPincodeModal,
}) => {
  return (
    <>
      <div className="container z-index-sticky top-0">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-lg blur blur-rounded top-0 z-index-3 shadow position-absolute start-0 end-0">
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

                {/* filter sections  */}
                <div className="collapse navbar-collapse" id="navigation">
                  <div
                    id="hero-area"
                    style={{
                      flexGrow: 1,
                      marginLeft: "10px",
                      marginRight: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  >
                    <div className="container-fuild">
                      <div className="row justify-content-center">
                        <div className="search-bar">
                          <div className="search-inner">
                            <form className="search-form" onSubmit={filterForm}>
                              <div className="form-group align-items-center d-flex align-content-center">
                                {/* <div className="text-left text-black text-sm font-weight-bold" style={{position:"absolute", top:0,left:0}}>Change Your City</div> */}
                                <input
                                  type="text"
                                  name="city"
                                  className="form-control"
                                  placeholder="Change Your City"
                                  value={city || cityName?.address?.city || ""}
                                  onChange={(e) => {
                                    setCity(e.target.value);
                                  }}
                                  disabled
                                />
                                <div>
                                  <FiMapPin
                                    onClick={(e) => setPincodeModal(true)}
                                    style={{ backgroundColor: "#f1f1f1", color: "#000" }}
                                  />
                                </div>
                              </div>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="city"
                                  className="form-control"
                                  placeholder="Business or Service"
                                  onChange={(e) => {
                                    setInputBusiness(e.target.value);
                                  }}
                                />
                              </div>
                              <div className="form-group">
                                <div className="select">
                                  <select
                                    name="categoryID"
                                    onChange={(e) => {
                                      getSubcategories(e.target.value);
                                      setCategoryID(e.target.value);
                                    }}
                                  >
                                    <option value="none">Category</option>
                                    {categories &&
                                      categories.map((cat) => (
                                        <option value={cat.id} key={cat.id}>
                                          {cat.name}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                {/* <i className="lni-menu"></i> */}
                              </div>
                              <div className="form-group ">
                                <div className="select">
                                  <select
                                    name="subCategoryID"
                                    onChange={(e) => {
                                      setSubCategoryID(e.target.value);
                                    }}
                                  >
                                    <option value="none">Sub Categories</option>
                                    {subcategories &&
                                      subcategories.map((scat) => (
                                        <option value={scat.id} key={scat.id}>
                                          {scat.name}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                              </div>
                              <div className="form-group ">
                                <div className="select">
                                  <select
                                    name="dist"
                                    onChange={(e) => {
                                      setDist(e.target.value);
                                    }}
                                  >
                                    <option value="5">5KM</option>
                                    <option value="10">10KM</option>
                                    <option value="25">25KM</option>
                                    <option value="50">50KM</option>
                                    <option value="100">100KM</option>
                                    <option value="200">200KM</option>
                                  </select>
                                </div>
                              </div>
                              <button className="btn btn-common" type="submit">
                                Search
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* filter sections  */}

                  {/* navigation sections  */}

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

                {/* navigation sections  */}
              </div>
            </nav>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default HomeHeader;
