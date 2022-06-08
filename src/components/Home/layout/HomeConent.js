import { Link } from "react-router-dom";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import DisplayBusinesses from "../support/Business";
import { toast } from "react-toastify";
import React from "react";

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
  dist,
}) => {
  React.useEffect(() => {
    if (errors !== null && errors !== ""){
      toast.error(errors)
    }
  }, [errors])
  console.log(dist)
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
            
            {isLoading && (
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            <div className="row mx-3">
              {businesses?.length <= 0 ? <h5>No services found near by area with the {dist}KM selected range</h5> :
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
