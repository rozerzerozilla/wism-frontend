import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import * as Actions from "../../../../redux/actions/admin.actions";
import ActionTypes from "../../../../helpers/action.types";
import { Modal } from 'react-responsive-modal';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

function DeleteModal({openModal, handleClose, data, serviceId, id}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(false);
  const [isLodaing, setIsLoading] = useState(false);

  const submitDelete = (e) => {
    e.preventDefault();
    dispatch(
      Actions.deleteData(
          ActionTypes.DELETE_ADMIN_SERVICE,
          `/home/services/${serviceId}`,
          setErrors,
          setSuccess,
          setIsLoading
      )
    );
  }

 
  useEffect(()=>{
    if(errors){
      toast.error(errors)
    }
    if(success){
      // toast.success(success);
      handleClose();
      // history.push(`/admin/business/${id}`);
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    }
  },[errors, success])
  return (
    <Modal open={openModal} onClose={handleClose} center>
        <br />
        <h5>Are you sure you want to delete <br />services: {data.name} ?</h5>

        <form
          className="mx-4 my-4"
        >
          <div className="row">
            <div className="col-6">
              <button
                type="cancel"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                &nbsp;&nbsp;Cancel
              </button>
            </div>
            <div className="col-6">
              <button
                type="submit"
                className="btn btn-danger"
                onClick={submitDelete}
              >
                &nbsp;&nbsp;Delete
              </button>
            </div>
          </div>
        </form>
      </Modal>
  )
}

export default DeleteModal