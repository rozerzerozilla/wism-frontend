import { Link } from "react-router-dom";
import noImage from "../../../assets/img/no.png";
const DisplayBusinesses = ({ business }) => {
  console.log(business);
  return (
    <>
      {business && (
        <div
          className="row "
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            margin: "3px",
          }}
        >
          <div className="col-2">
            <img
              src={`${business.image ? business.image : noImage}`}
              //src={`${noImage}`}
              alt="Business"
              className="img-fluid"
              style={{ marginTop: "25px" }}
            />
          </div>
          <div className="col-7 mt-2">
            <h5>
              <Link
                to={`/business/${business.id}`}
                style={{ lineHeight: "8px" }}
              >
                {business.name}
              </Link>
            </h5>
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

            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <i
                className="lni-information"
                style={{ fontSize: "13px", fontWeight: "bold" }}
              ></i>
              <p style={{ fontSize: "13px", marginLeft: "5px" }}>
                {business.subcats &&
                  business.subcats.map((subc) => (
                    <i key={subc.id}>{subc.name}, &nbsp;</i>
                  ))}
              </p>
            </div>
          </div>
          <div className="col-3 mt-2">
            {business.day && <h6>{business.day}</h6>}
            {business?.open_all_time === true && <>Open All Time</>}
            {!business.open_all_time && (
              <>
                Open From : {business.work_from && business.work_from} <br />
                Open Until : {business.work_to && business.work_to} <br />
                Break From : {business.break_from && business.break_from} <br />
                Break Until : {business.break_to && business.break_to} <br />
              </>
            )}

            {business.distance.status === true && (
              <>
                <b> Distance : {business.distance.distance[0].distance.text}</b>
              </>
            )}
            <br />
            <br />
            <Link
              to={`/business/${business.id}`}
              className="btn btn-common float-right"
              style={{ lineHeight: "8px" }}
            >
              Pick Token
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayBusinesses;
