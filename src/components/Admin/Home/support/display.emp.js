import React, { useState } from "react";
import style from "../../../../components/Admin/admin.module.css";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {
  MdBorderColor,
  MdDelete
}
  from "react-icons/md"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import axios from "axios";
import {URL} from "../../../../api/admin.api"

const DisplayEmployees = ({ staff }) => {

  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteemp, setDeleteemp] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    activated: staff.activated,
    role: staff.role
  });

  const openEdit = () => {

    setEdit(true);
    setUserData(staff)
  }
  const closeEdit = () => {
    setEdit(false);
    setUserData({
      name: "",
      phone: "",
      email: "",
      // username: "",
      // password: "",
      role: null,
      activated: null
    })
  }
  const submitEdit = (event) => {

    event.preventDefault();
    setIsLoading(true);

    if (validator.isNumeric(userData.name) || userData.name === "") {
      InvalidEmployeeError("employee name");
      setIsLoading(false);
    }
    else if (!validator.isNumeric(userData.phone) || (userData.phone).length !== 10 || userData.phone === "") {
      InvalidEmployeeError("employee phone");
      setIsLoading(false);
    }
    else if (!validator.isEmail(userData.email) || userData.email === "") {
      InvalidEmployeeError("employee email");
      setIsLoading(false);
    }
    else if (userData.name.includes(" ") || userData.name.includes("")) {
      setEdit(false);
      axios.patch(`https://api.wism.in/api/admin/home/employee/${staff.id}`, { ...userData }).then(res => {
        toast.success("updated Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 3000)
        // disptach(Actions.getData(ActionTypes.GET_ADMIN_STAFFS, "/home/employees", setErrors, setIsLoading));
      }).catch(error => {
        toast.error("unable to updated");
      })
      // setIsLoading(true);
      // dispatch(
      //   Actions.postData(
      //     ActionTypes.POST_ADMIN_STAFFS,
      //     "/home/employees",
      //     userData,
      //     setErrors,
      //     setSuccess,
      //     setIsLoading
      //   )
      // );

      // if (errors) {
      //   employeeError();
      // }
      // else {
      //   employeeUpdated();
      // }
      // setEdit(false);
      // setUserData({
      //   name: "",
      //   phone: "",
      //   email: "",
      //   // username: "",
      //   // password: "",
      //   role: null,
      //   activated: null
      // })

    }
  }

  const openDelete = () => {

    setDeleteemp(true);
  }
  const closeDelete = () => {
    setDeleteemp(false);
    setUserData({
      name: "",
      phone: "",
      email: "",
      // username: "",
      // password: "",
      role: null,
      activated: null
    })
  }
  const submitDelete = (id) => {
    axios.delete(`${URL}/home/employee/${staff.id}`).then(res => {
      toast.success("deleted Successfully")
      setTimeout(() => {
        window.location.reload();
      }, 3000)
      // disptach(Actions.getData(ActionTypes.GET_ADMIN_STAFFS, "/home/employees", setErrors, setIsLoading));
      setDeleteemp(false);
    }).catch(error => {
      toast.error("unable to delete");
      setDeleteemp(false);
    })
    // console.log("Delete id", staff.id)
    // setDeleteemp(false);
    // setIsLoading(true);
    // dispatch(
    //   Actions.postData(
    //     ActionTypes.POST_ADMIN_STAFFS,
    //     "/home/employees",
    //     { id: staff.id },
    //     setErrors,
    //     setSuccess,
    //     setIsLoading
    //   )
    // );

    // if (errors) {
    //   employeeError();
    // }
    // else {
    //   employeeDeleted();
    // }

    setUserData({
      name: "",
      phone: "",
      email: "",
      // username: "",
      // password: "",
      role: null,
      activated: null
    })
  }
  // notify messages
  const employeeUpdated = () => toast.success('Employee updated successfully');

  const employeeDeleted = () => toast.success('Employee deleted');

  const employeeAdded = () => toast.success('Category added successfully');
  const employeeError = () => toast.error('Error! failed to create category');

  const InvalidEmployeeError = (fieldname) => toast.error(`Error! enter valid ${fieldname}`);

  return (
    <>
      <tr>
        <td>
          <p className=" text-center text-xs font-weight-bold mb-0">
            {staff.name}
          </p>
        </td>
        <td>
          <p className=" text-center text-xs font-weight-bold mb-0">
            {staff.phone}
          </p>
        </td>
        <td>
          <p className=" text-center text-xs font-weight-bold mb-0">
            {staff.email}
          </p>
        </td>
        <td>
          <p className="text-center text-xs font-weight-bold mb-0">
            {staff.role === 1 ? "Owner" : "Staff"}
          </p>
        </td>

        <td>
          <p className="text-center text-xs font-weight-bold mb-0">
            {staff.activated === 1 ? "Active" : "Inactive"}
          </p>
        </td>
        <td>
          <p className="text-center text-xs font-weight-bold mb-0">
            {staff.adate}
          </p>
        </td>
        <td>
          <p className="text-center text-xs font-weight-bold mb-0 text-success">
            <MdBorderColor
              onClick={openEdit}
              size={20}
            />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <MdDelete
              onClick={openDelete}
              size={20}
              className="text-danger"
            />
          </p>
        </td>
      </tr>
      {/* Edit modal */}
      <Modal open={edit} onClose={closeEdit} center>
        <h5>Edit employee</h5>
        <form
          className="mx-4 my-4"
          onSubmit={submitEdit}
        >
          <div className="mb-3">
            <div className="row">
              <div className="col-4">
                <label className={style.label}>Employee Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Employee Name"
                  name="name"
                  value={userData.name || ""}
                  onChange={(e) => {
                    setUserData({ ...userData, name: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="col-4">
                <label className={style.label}>Employee Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Employee Phone Number"
                  name="phone"
                  value={userData.phone || ""}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      phone: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className="col-4">
                <label className={style.label}>Employee Email(optional)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Employee Email"
                  name="email"
                  value={userData.email || ""}
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="row">
              <div className="col-6">
                <label className={style.label}>Role {staff.role}</label>
                {
                  staff.role === 1 ? (
                    <select
                      className="form-control"
                      name="role"
                      onChange={(e) => {
                        setUserData({ ...userData, role: e.target.value });
                      }}
                    >
                      <option value="1" key="1">Owner</option>
                      <option value="2" key="2">Staff</option>
                    </select>
                  ) : (
                    <select
                      className="form-control"
                      name="role"
                      onChange={(e) => {
                        setUserData({ ...userData, role: e.target.value });
                      }}
                    >
                      <option value="2" key="2">Staff</option>
                      <option value="1" key="1">Owner</option>

                    </select>
                  )
                }
              </div>
              <div className="col-6">
                <label className={style.label}>Active</label>

                {
                  staff.activated === 1 ? (
                    <select
                      className="form-control"
                      name="role"
                      onChange={(e) => {
                        setUserData({ ...userData, activated: e.target.value });
                      }}
                    >
                      <option value="1" key="1">Active</option>
                      <option value="2" key="2">Inactive</option>
                    </select>
                  ) : (
                    <select
                      className="form-control"
                      name="role"
                      onChange={(e) => {
                        setUserData({ ...userData, activated: e.target.value });
                      }}
                    >
                      <option value="2" key="2">Inactive</option>
                      <option value="1" key="1">Active</option>
                    </select>
                  )
                }

              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn bg-gradient-info w-50 mt-4 mb-0"
            >
              &nbsp;&nbsp;Update
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit modal */}
      <Modal open={deleteemp} onClose={closeDelete} center>
        <br />
        <h5>Are you sure you want to delete<br />
          employee: {staff.name} ?</h5>
        <br />

        <div className="row">
          <div className="col-6">
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={closeDelete}
            >
              &nbsp;&nbsp;Cancel
            </button>
          </div>
          <div className="col-6">
            <button
              className="btn btn-danger"
              onClick={() => submitDelete(staff.id)}
            >
              &nbsp;&nbsp;Delete
            </button>
          </div>
        </div>

      </Modal>
    </>
  );
};

export default DisplayEmployees;
