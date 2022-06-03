import { Link } from "react-router-dom";
import businessImage from "../../../../assets/img/business.jpg";
import { useState, useEffect } from "react";
import { BsFillCircleFill } from "react-icons/bs";
const DisplayBusiness = ({ details }) => {
  const [role, setRole] = useState(1);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setRole(userData.role);
  }, []);

  return (
    <>
      <div className="container-fluid mx-1 my-3 mt-5">
        <div className="blur shadow-blur mx-4 mt-n6 overflow-hidden">
          <div className="row gx-4">
            <div className="col-2">
              <div className="avatar avatar-xl position-relative">
                <img
                  src={details.image || businessImage}
                  alt="profile_image"
                  className="w-100 border-radius-lg shadow-sm"
                />
              </div>
            </div>

            <div className="col-8 my-auto">
              <div className="h-100">
                <h5 className="mb-1">{details.bname}&nbsp;&nbsp;
                  {details.status && (
                    <span><BsFillCircleFill style={{ color: "green" }} /></span>
                  )}
                  {!details.status && (
                    <span><BsFillCircleFill style={{ color: "orange" }} /></span>
                  )}
                </h5>
                <p
                  className="mb-0 font-weight-bold text-sm"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span> {details.telephone} </span>
                  <span> {details.website}</span>
                  <span> {details.info}</span>
                </p>
                <p
                  className="mb-0 font-weight-bold text-sm"
                  style={{ display: "flex" }}
                >
                  {details.category} (
                  {details.subcats &&
                    details.subcats.map((scat) => {
                      return <span key={scat.id}>{scat.name},&nbsp; </span>;
                    })}
                  )
                </p>
              </div>
            </div>
            <div className="col-2">
              {role === 1 && (
                <Link to={`/clients/editbusiness`} className="btn btn-primary">
                  Edit
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12 col-xl-6">
            <div className="h-100">
              <div className="card-header pb-0 p-3">
                <h6 className="mb-0">Address</h6>
              </div>
              <div className="card-body p-3">
                <ul className="list-group">
                  <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                    <strong className="text-dark">Address1:</strong> &nbsp;
                    {details.address1}
                  </li>
                  <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                    <strong className="text-dark">Address2:</strong> &nbsp;
                    {details.address2}
                  </li>
                  <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                    <strong className="text-dark">Street:</strong> &nbsp;
                    {details.street}
                  </li>
                  <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                    <strong className="text-dark">City:</strong> &nbsp;
                    {details.city}
                  </li>
                  <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                    <strong className="text-dark">State:</strong> &nbsp;
                    {details.state}
                  </li>
                  <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                    <strong className="text-dark">Postal Code:</strong> &nbsp;
                    {details.postalcode}
                  </li>
                  <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                    <strong className="text-dark">Lattitude:</strong> &nbsp;
                    {details.lat}
                  </li>
                  <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                    <strong className="text-dark">Langitude:</strong> &nbsp;
                    {details.lng}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-xl-6">
            <div className="h-100">
              <div className="card-header pb-0 p-3">
                <h6 className="mb-0">Timing</h6>
              </div>
              <div className="card-body p-3">
                {details.open_all_time && (
                  <div className="row">
                    <h5>Opens All the Time</h5>
                  </div>
                )}

                {!details.open_all_time && (
                  <>
                    <div className="row">
                      <div className="col-4">Day</div>
                      <div className="col-4">Working Hours</div>
                      <div className="col-4">Break Time</div>
                    </div>
                    {details.timings?.map((timing, index) => {
                      return (
                        <div className="row mt-2" key={index}>
                          <div className="col-4">
                            <b> {timing.day}</b>
                          </div>
                          <div className="col-4">
                            {timing.work_from} - {timing.work_to}
                          </div>
                          <div className="col-4">
                            {timing.break_from} - {timing.break_to}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-6 mt-3">
            <div className="h-100">
              <div className="card-header pb-0 p-3">
                <h6 className="mb-0">Holidays</h6>
              </div>
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-12">{details.holidays}</div>
                  <div className="mt-2"></div>
                  <div className="col-6">
                    Work From : {details.holiday_work_from}
                  </div>
                  <div className="col-6">
                    Work To : {details.holiday_work_to}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayBusiness;
