import { Link } from "react-router-dom";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import DisplayBusinesses from "../support/Business";

const HomeContent = ({
  isLoading,
  errors,
  homeCategories,
  leftad,
  rightad,
  leftadlink,
  rightadlink,
  businesses,
  homeSubCategories,
  subCat,
  location,
}) => {
  return (
    <section className="featured mt-4">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-2">
            <LeftBar
              subcats={homeSubCategories}
              subCat={subCat}
              leftad={leftad}
              leftadlink={leftadlink}
              location={location}
            />
          </div>
          <div className="col-sm-12 col-md-8">
            {errors && (
              <div
                className="alert alert-danger mx-5"
                role="alert"
                style={{ color: "white" }}
              >
                {errors}
              </div>
            )}
            {isLoading && (
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <div className="row mx-3">
              {businesses &&
                businesses.map((business) => {
                  return (
                    <DisplayBusinesses key={business.id} business={business} />
                  );
                })}
              {homeCategories &&
                homeCategories.map((hc) => {
                  return (
                    <>
                      {Object.keys(hc).map((key, index) => {
                        return (
                          <>
                            <div className="col-sm-12 col-md-4">
                              <ul key={index}>
                                <h5>{key}</h5>
                                {homeCategories[0][key] &&
                                  homeCategories[0][key].map((sub) => (
                                    <li
                                      style={{
                                        listStyle: "none",
                                        marginLeft: "25px",
                                      }}
                                    >
                                      <Link
                                        to={`/search?subcat=${sub.id}&lat=${location.lat}&lng=${location.lng}`}
                                      >
                                        {sub.name}
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </>
                        );
                      })}
                    </>
                  );
                })}
            </div>
          </div>
          <div className="col-sm-12 col-md-2">
            <RightBar rightad={rightad} rightadlink={rightadlink} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContent;
