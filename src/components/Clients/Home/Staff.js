import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import ClientsFooter from "./layout/clients.footer";
import ClientsHeader from "./layout/clients.header";
import ClientsNavMenu from "./layout/clients.navmenu";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/client.actions";
import DisplayStaff from "./support/display.staff";
import UnauthorizedModal from "../../Admin/Home/UnauthorizedModal";
import Modal from "react-responsive-modal";
import { toast } from "react-toastify";
const ClientStaff = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [staffId, setStaffId] = useState('');
  const [staffName, setStaffName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(false);
  const dispatch = useDispatch();
  var staffs;
  staffs = useSelector((state) => state.clients.staffs);
  useEffect(() => {
    dispatch(
      Actions.getData(
        ActionTypes.GET_CLIENT_STAFFS,
        "/home/staff",
        setErrors,
        setIsLoading
      )
    );
    return () => {
      dispatch({
        type: ActionTypes.GET_CLIENT_STAFFS,
        payload: [],
      })
    }
  }, [dispatch, window.location]);

  //disable or enable staffs
  const toggleStaff = (checked, id) => {
    dispatch(
      Actions.putData(
        ActionTypes.UPDATE_CLIENT_STAFFS,
        "/home/staff",
        { id, checked },
        setErrors,
        setSuccess,
        setIsLoading
      )
    );
    dispatch(
      Actions.getData(
        ActionTypes.GET_CLIENT_STAFFS,
        "/home/staff",
        setErrors,
        setIsLoading
      )
    );
  };

  useEffect(() => {
    if(errors !== null && errors !== ""){
      toast.error(errors)
    }

    if (success !== null && success !== "") {
      toast.success(success)
    }
  },[errors, success])

  const submitDelete = () => {
    dispatch(
      Actions.deleteData(
        ActionTypes.DELETE_CLIENT_STAFFS,
        `/home/staff/${staffId}`,
        setErrors,
        setSuccess,
        setIsLoading
      )
    );
    setOpenDeleteModal(false)
    setTimeout(()=>{dispatch(
      Actions.getData(
        ActionTypes.GET_CLIENT_STAFFS,
        "/home/staff",
        setErrors,
        setIsLoading
      )
    );}, 500)
  }

  return (
    <>
      <ClientsNavMenu path="staffs" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <ClientsHeader header="Available Staffs" />
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <div className="row">
                    <div className="col-10">
                      <h6>Staffs</h6>
                    </div>
                    <div className="col-2">
                      <Link to="/clients/addstaffs" className="btn btn-primary">
                        Add Staff
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body px-0 pt-0 pb-2">

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
                  <div className="table-responsive p-0 mx-1">
                    <table className="table align-items-center mb-0 ">
                      <thead>
                        <tr>
                          {/* <th className="text-centertext-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                            Available
                          </th> */}
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
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {!isLoading && staffs &&
                          staffs.map((staff) => (
                            <DisplayStaff
                              toggleStaff={toggleStaff}
                              staff={staff}
                              key={staff.id}
                              handleDelete={(id, name) => {
                                setStaffId(id)
                                setStaffName(name)
                                setOpenDeleteModal(true)
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
        </div>

        <ClientsFooter />
      </main>
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)} center>
        <br />
        <h5 className="text-center w-100">Are you sure you want to delete<br/>
          employee: {staffName} ?</h5>
        <br />

        <div className="row d-flex flex-row">
          <div className="col-3 ms-auto">
            <button
              type="submit"
              className="btn btn-danger"
              onClick={() => setOpenDeleteModal(false)}
            >
              No
            </button>
          </div>
          <div className="col-3 me-auto">
            <button
              className="btn btn-success"
              onClick={submitDelete}
            >
              Yes
            </button>
          </div>
          
        </div>

      </Modal>
    </>
  );
};

export default ClientStaff;
