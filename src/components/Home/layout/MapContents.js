import { Link } from "react-router-dom";
import DisplayMapBusinesses from "../support/MapBusinesses";
import BusinessMap from "../support/BusinessesMap";
const MapContent = ({ isLoading, errors, homeCategories, businesses }) => {
  return (
    <section className="featured mt-4">
      <div className="container">
        <div className="row">
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
          <div className="col-sm-12 col-md-3">
            <div className="row mx-3">
              {businesses &&
                businesses.map((business) => {
                  return (
                    <DisplayMapBusinesses
                      key={business.id}
                      business={business}
                    />
                  );
                })}
            </div>
          </div>
          <div className="col-sm-12 col-md-9">
            <BusinessMap businesses={businesses} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapContent;
