import { Link } from "react-router-dom";
import BankImage from "../../../assets/img/bank.png";
const BusinessLists = ({ businesses, title, isLoading, errors }) => {
  return (
    <section className="featured mt-3" style={{ backgroundColor: "white" }}>
      <div className="container">
        <h1 className="section-title">{title}</h1>
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
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        )}
        <div className="row">
          {businesses &&
            businesses.map((business) => (
              <div
                className="col-xs-6 col-sm-6 col-md-3 col-lg-3"
                key={business.id}
              >
                <div className="featured-box">
                  <figure>
                    {/* <div className="icon">
                      <span className="bg-green">
                        <i className="lni-heart"></i>
                      </span>
                      <span>
                        <i className="lni-bookmark"></i>
                      </span>
                    </div> */}
                    <Link to={`/business/${business.id}`}>
                      <img
                        className="img-fluid"
                        src={business.image ? business.image : BankImage}
                        alt=""
                      />
                    </Link>
                  </figure>
                  <div className="feature-content" style={{ width: "100%" }}>
                    <div className="product">
                      <Link to="#">{business.category} </Link>
                    </div>
                    <h4>
                      <Link to={`/business/${business.id}`}>
                        {business.name}
                      </Link>
                    </h4>
                    <div className="meta-tag">
                      <span>
                        <Link to="#">
                          <i className="lni-map-marker"></i> {business.city},{" "}
                          {business.state}
                        </Link>
                      </span>
                    </div>
                    <p className="dsc">{business.info}</p>
                    <div className="listing-bottom">
                      <Link
                        to={`/business/${business.id}`}
                        className="btn btn-common float-right"
                      >
                        Pick Token
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessLists;
