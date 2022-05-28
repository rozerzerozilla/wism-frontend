import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import style from "../../Clients/clients.module.css";
import ClientsFooter from "./layout/clients.footer";
import ClientsHeader from "./layout/clients.header";
import ClientsNavMenu from "./layout/clients.navmenu";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/client.actions";
import DisplayServices from "./support/display.services";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { toast } from "react-toastify";
import UnauthorizedModal from "../../Admin/Home/UnauthorizedModal";

const ClientService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deleteservice, setDeleteservice] = useState(false)
  const [serviceId, setServiceId] = useState(null)
  const [serviceName, setServiceName] = useState("")
  const [editservice, setEditservice] = useState(false)

  const [service, setService] = useState({
    name: "",
    description: "",
    prefix: "",
    service_time: "",
    staffs: ""
  });

  const dispatch = useDispatch();
  var services;
  services = useSelector((state) => state.clients.services);

  useEffect(() => {
    dispatch(
      Actions.getData(
        ActionTypes.GET_CLIENT_SERVICE,
        "/home/services",
        setErrors,
        setIsLoading
      )
    );
  }, [dispatch]);

  // Delete service functions

  const removeService = () => {
    dispatch(
      Actions.deleteData(
        ActionTypes.DELETE_SERVICE,
        `/home/services/${serviceId}`,
        setErrors,
        setSuccess,
        setIsLoading
      )
    );
    setDeleteservice(false);
    setServiceId(null)
    setServiceName("")
  };

  const openDelete = (id, name) => {
    setDeleteservice(true);
    setServiceId(id)
    setServiceName(name)
  }

  const closeDelete = () => {
    setDeleteservice(false);
    setServiceId(null)
    setServiceName("")
  }

  // Update service functions

  const openEdit = (serviceData) => {
    setEditservice(true);
    setService(serviceData)
  }

  const closeEdit = () => {
    setEditservice(false);
    setService({});
  }

  const updateService = () => {
    // const validInputs = validateForm();

    // if (!validInputs) return null;
    // setIsLoading(true);
    if (service.service_time === "" || service.service_time < 10) {
      toast.error("Please enter valid service time")
    }
    else if (service.staffs === "" || service.staffs < 1) {
      toast.error("Please enter valid staff number")
    }
    // else save
    else {
      dispatch(
        Actions.putData(
          ActionTypes.UPDATE_SERVICE,
          `/home/services/${service.id}`,
          service,
          setErrors,
          setSuccess,
          setIsLoading
        )
      );
      setTimeout(() => {
        dispatch(
          Actions.getData(
            ActionTypes.GET_CLIENT_SERVICE,
            "/home/services",
            setErrors,
            setIsLoading
          )
        );
      }, 200)
      setEditservice(false);
      setService({});
    }
  };



  return (
    <>
      <ClientsNavMenu path="services" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <ClientsHeader header="Services" />
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <div className="row">
                    <div className="col-9">
                      <h6>Services</h6>
                    </div>
                    <div className="col-3">
                      <Link
                        to="/clients/addservices"
                        className="btn btn-primary"
                      >
                        Add Service
                      </Link>
                    </div>
                  </div>
                </div>
                {errors && (errors !== "Unauthorized access!" && errors !== "Unauthorized") && (
                  <div className="d-flex  text-center w-100">
                    <p className="mx-auto text-danger text-center text-capitalize text-secondary text-md font-weight-bolder opacity-10">
                      {errors}
                    </p>
                  </div>
                )}

                {errors && (errors === "Unauthorized access!" || errors === "Unauthorized") &&
                  <UnauthorizedModal />
                }
                {isLoading && (
                  <div className="text-center my-5">
                    <div className="spinner-border text-danger" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
                <div className="card-body px-0 pt-0 pb-2">
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
                        {services &&
                          services.map((service) => (
                            <DisplayServices
                              service={service}
                              key={service.id}
                              removeService={removeService}
                              openDelete={openDelete}
                              openEdit={openEdit}
                            />
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ClientsFooter />
      </main>

      {/* Delete modal */}
      <Modal open={deleteservice} onClose={closeDelete} center>
        <br />
        <h5>Are you sure you want to delete <br />service: {serviceName} ?</h5>

        <form
          className="mx-4 my-4"
        >
          <div className="row">
            <div className="col-6">
              <button
                type="cancel"
                className="btn btn-danger"
                onClick={closeDelete}
              >
                No
              </button>
            </div>
            <div className="col-6">
              <button
                type="submit"
                className="btn btn-success"
                onClick={removeService}
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Edit modal */}
      <Modal open={editservice}
        onClose={closeEdit}
        center>
        <h5>Edit service</h5>
        <form
          // onSubmit={onSubmit}
          className="mx-4 my-4">
          <div className="mb-3">
            <div className="row">
              <div className="col-6">
                <label className={style.label}>Service Name <span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Service Name(24 chars max)"
                  name="name"
                  value={service.name || ""}
                  onChange={(e) => {
                    setService({ ...service, name: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="col-6">
                <label className={style.label}>Token Prefix <span style={{ color: "red" }}>*</span></label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Token Prefix(1 char alphabet)"
                  name="prefix"
                  value={service.prefix || ""}
                  onChange={(e) => {
                    setService({ ...service, prefix: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="col-6">
                <label className={style.label}>Default Service Time <span style={{ color: "red" }}>*</span></label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Default Service Time(in mins)"
                  name="service_time"
                  value={service.service_time || ""}
                  onChange={(e) => {
                    setService({ ...service, service_time: e.target.value });
                  }}
                  min={10}
                  max={1000}
                  required
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div className="row">
              <div className="col-12">
                <label className={style.label}>Description <span style={{ color: "red" }}>*</span></label>
                <textarea
                  placeholder="Service Description(60 chars max)"
                  name="description"
                  className="form-control"
                  onChange={(e) => {
                    setService({ ...service, description: e.target.value });
                  }}
                  value={service.description || ""}
                  required
                ></textarea>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div className="row">
              <div className="col-3"></div>
              <div className="col-6">
                <button
                  type="submit"
                  className="btn bg-gradient-info w-100 mt-4 mb-0 mx-auto"
                  onClick={updateService}
                >
                  Update
                </button>
              </div>
              <div className="col-3"></div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ClientService;
