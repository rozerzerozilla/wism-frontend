import { Link } from "react-router-dom";
import businessImage from "../../../../assets/img/business.jpg";
import DisplayServices from "./display.services";
import DisplayStaff from "./display.staff";
import { BsFillCircleFill } from "react-icons/bs";
import React from "react";
import EditServices from "./form.edit.services";
import DeleteServices from "./form.delete.services";
import DeleteStaff from "./form.delete.staff";

const DisplayBusiness = ({ details, id }) => {
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openDeleteStaffModal, setOpenDeleteStaffModal] = React.useState(false);
  const [staffId, setStaffID] = React.useState("");
  const [serviceId, setServiceID] = React.useState("");
  const [service, setServices] = React.useState(null);
  // console.log(details)

  const handleOpenEditModal = (data, id) => {
    setServices(data)
    setOpenEditModal(true);
    setServiceID(id);
  }
  const handleOpenDeleteModal = (id) => {
    setOpenDeleteModal(true);
    setServiceID(id);
  }

  const [data, setData] = React.useState({})
  return (
    <>
      <div className="container-fluid mx-1 my-3 mt-5">
        <div className="row gx-4">
          <div className="col-1">
            <div className="avatar avatar-xl position-relative">
              <img
                src={details.image || businessImage}
                alt="profile_image"
                width={"100%"}
                height={"100%"}
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
                  <span><BsFillCircleFill style={{ color:"orange" }}/></span>
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
          <div className="col-3">
            <div className="row">
              <div className="col-12">
                <Link
                  style={{width:"100%"}}
                  to={`/admin/editbusiness/${id}`}
                  className="btn btn-primary"
                >
                  Edit Business
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12 col-xl-6">
            <div className="card h-100">
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
            <div className="card h-100">
              <div className="card-header pb-0 p-3">
                <h6 className="mb-0">Timing</h6>
              </div>
              <div className="card-body p-3">
                {details.open_all_time === 1 && (
                  <div className="row">
                    <h5>Opens All the Time</h5>
                  </div>
                )}

                {details.open_all_time === 0 && (
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
            <div className="card h-100">
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

      <div className="col-12 mt-3" id="services">
        <div className="card h-100">
          <div className=" ps-3 pb-0 pe-3 pt-3 d-flex justify-content-between w-100">
            <h6 className="mb-0">Services</h6>
            <Link
              to={`/admin/business/service/${id}`}
              className="btn btn-primary"
            >
              Add Services
            </Link>
          </div>
          <div className="card-body p-3">
            <div className="row">
              <div className="table-responsive p-0 mx-1">
                <table className="table align-items-center mb-0 ">
                  <thead>
                    <tr>
                      <th className="text-centertext-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                        Name
                      </th>
                      <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10 ps-2">
                        Description
                      </th>
                      <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                        Prefix
                      </th>
                      <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                        Service Time
                      </th>
                      <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                        Staffs
                      </th>
                      <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.services &&
                      details.services.map((service) => (
                        <DisplayServices
                          service={service}
                          key={service.id}
                          handleOpenEditModal={handleOpenEditModal}
                          handleOpenDeleteModal={handleOpenDeleteModal}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 mt-3">
        <div className="card h-100">
          <div className=" ps-3 pb-0 pe-3 pt-3 d-flex justify-content-between w-100">
            <h6 className="mb-0">Staff</h6>
            <Link
              to={`/admin/business/emp/${id}`}
              className="btn btn-primary"
            >
              Add Staff
            </Link>
          </div>
          <div className="card-body p-3">
            <div className="row">
              <div className="table-responsive p-0 mx-1">
                <table className="table align-items-center mb-0 ">
                  <thead>
                    <tr>
                      <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10 ps-2">
                        Added
                      </th>
                      <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                        Name
                      </th>
                      <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                        Role
                      </th>
                      <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                        Phone
                      </th>
                      <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                        Email
                      </th>
                      <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                        Status
                      </th>
                      <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.users &&
                      details.users.map((staff) => (
                        <DisplayStaff 
                          staff={staff} key={staff.id}  id={id}
                          handleStaffDelete={(data)=>{
                            setOpenDeleteStaffModal(true)
                            setStaffID(data.id)
                            setData(data)
                          }}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditServices
        serviceId={serviceId}
        services={service}
        openModal={openEditModal}
        handleClose={() => setOpenEditModal(false)}
      />
      <DeleteServices
        openModal={openDeleteModal}
        handleClose={()=>setOpenDeleteModal(false)}
        serviceId={serviceId}
        id={id}
        data={{name:""}}
      />
      <DeleteStaff
        openModal={openDeleteStaffModal}
        handleClose={()=>setOpenDeleteStaffModal(false)}
        staffId={staffId}
        id={id}
        data={data}
      />
    </>
  );
};

export default DisplayBusiness;
