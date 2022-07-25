import "./support.css";
import "../../../assets/home/fonts/line-icons.css";
import "../../../assets/home/css/responsive.css";
const Filters = ({
  categories,
  getSubcategories,
  subcategories,
  setSubCategoryID,
  setCategoryID,
  filterForm,
  setCity,
  setDist,
  city,
  cityName,
}) => {
  return (
    <div id="hero-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-12 col-xs-12 text-center">
            <div className="contents">
              <h1 className="head-title">
                Welcome to The <span className="year">WiSM</span>
              </h1>
              <p>
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
                consectetur, adipisci velit.
              </p>
              <div className="search-bar">
                <div className="search-inner">
                  <form className="search-form" onSubmit={filterForm}>
                    <div className="form-group inputwithicon">
                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        placeholder="Your City"
                        value={city || cityName?.address?.city || ""}
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                        disabled
                      />
                      <i className="lni-target"></i>
                    </div>
                    <div className="form-group inputwithicon">
                      <div className="select">
                        <select
                          name="categoryID"
                          onChange={(e) => {
                            getSubcategories(e.target.value);
                            setCategoryID(e.target.value);
                          }}
                        >
                          <option value="none">Select Catagory</option>
                          {categories &&
                            categories.map((cat) => (
                              <option value={cat.id} key={cat.id}>
                                {cat.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <i className="lni-menu"></i>
                    </div>
                    <div className="form-group inputwithicon">
                      <div className="select">
                        <select
                          name="subCategoryID"
                          onChange={(e) => {
                            setSubCategoryID(e.target.value);
                          }}
                        >
                          <option value="none">Select Sub-Catagory</option>
                          {subcategories &&
                            subcategories.map((scat) => (
                              <option value={scat.id} key={scat.id}>
                                {scat.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <i className="lni-menu"></i>
                    </div>
                    <div className="form-group inputwithicon">
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
                        </select>
                      </div>
                      <i className="lni-menu"></i>
                    </div>
                    <button className="btn btn-common" type="submit">
                      <i className="lni-search"></i> Search Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
