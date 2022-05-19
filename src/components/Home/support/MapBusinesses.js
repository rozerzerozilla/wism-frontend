import { Link } from "react-router-dom";
const DisplayMapBusinesses = ({ business }) => {
  return (
    <div
      className="row"
      style={{ border: "1px solid #ccc", borderRadius: "4px", margin: "3px" }}
    >
      <div className="col-12">
        <h5>{business.name}</h5>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <i
            className="lni-map-marker"
            style={{ fontSize: "16px", fontWeight: "bold" }}
          ></i>
          <p style={{ fontSize: "13px" }}>
            {business.address1}, {business.address2},{business.street},
            {business.city}, {business.state}
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <i
            className="lni-phone"
            style={{ fontSize: "16px", fontWeight: "bold" }}
          ></i>
          <p style={{ fontSize: "13px", marginLeft: "5px" }}>
            {business.telephone}
          </p>
        </div>

        <Link
          to={`/business/${business.id}`}
          className="btn btn-common float-right"
          style={{ lineHeight: "8px" }}
        >
          Pick Token
        </Link>
      </div>
    </div>
  );
};

export default DisplayMapBusinesses;
