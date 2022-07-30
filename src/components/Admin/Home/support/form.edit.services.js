import React, { useEffect } from "react"
import validator from "validator";
import Modal from 'react-responsive-modal'
import { toast } from 'react-toastify';
import { patchData, getData } from '../../../../redux/actions/admin.actions';
import { useDispatch } from "react-redux";
import ActionTypes from "../../../../helpers/action.types";
import { useHistory } from "react-router-dom";


function EditServices({ openModal, handleClose, serviceId, services, id }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const[errors,setErrors] = React.useState(null);
    const[success,setSuccess] = React.useState(null);
    const[isLoading,setIsLoading] = React.useState(false);
            
    const [serviceData, setServiceData] = React.useState({
        name: "",
        prefix: "",
        service_time: "",
        description:"",
    });
    React.useEffect(() => {
        if (services !== null) {
            setServiceData({
                name: services.name,
                prefix: services.prefix,
                service_time: services.service_time,
                description: services.description,
            })
        }
    }, [services]);

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (!validator.isAlpha(serviceData.name) && serviceData.name.length < 3) {
            toast.error("service name should more than 3 charater without numbers and special characters")
        }
        if (!validator.isAlpha(serviceData.prefix)) {
            toast.error("Add only alphabets, it can't be blank")
        }
        // if (!validator.isNumeric(serviceData.service_time)) {
        //     toast.error("The value should be number")
        // }

        if (validator.isAlpha(serviceData.name) && serviceData.name.length < 3 && validator.isAlpha(serviceData.prefix))
        {
            
        }
        dispatch(
            patchData(
                ActionTypes.UPDATE_ADMIN_SERVICE,
                `/home/services/${serviceId}`,
                { ...serviceData },
                setErrors,
                setSuccess,
                setIsLoading
            )
        );
        // history.push(`/admin/business/${id}`);
        setTimeout(()=>{ 

            window.location.reload()
        },2000);

    }

    useEffect(() => {
        if (success) {
            handleClose()
        }
    }, [success])
    
  return (
      <Modal open={openModal} onClose={handleClose} center>
          <h5>Edit Services</h5>
          <form
              className="mx-3 my-3"
              onSubmit={submitHandler}
          >
              <div className="mb-3">
                  <div className="row">
                      <div className="col-12">
                          <label >Service Name *</label>
                          <input
                              type="text"
                              className="form-control"
                              placeholder="Category Name"
                              name="catname"
                              value={serviceData.name}
                              onChange={(e) => setServiceData(prevState => ({
                                  ...prevState,
                                  name:e.target.value
                              }))}
                              required
                          />
                      </div>
                      <div className="col-12">
                          <label >Prefix *</label>
                          <input
                              type="text"
                              className="form-control"
                              placeholder="Category Name"
                              name="prefix"
                              value={serviceData.prefix}
                              onChange={(e) => setServiceData(prevState => ({
                                  ...prevState,
                                  prefix: e.target.value
                              }))}
                              required
                          />
                      </div>
                      <div className="col-12">
                          <label >Service Time *</label>
                          <input
                              type="text"
                              className="form-control"
                              placeholder="Service Time"
                              name="service_time"
                              value={serviceData.service_time}
                              onChange={(e) => setServiceData(prevState => ({
                                  ...prevState,
                                  service_time: e.target.value
                              }))}
                              required
                          />
                      </div>
                      <div className="col-12">
                          <label >Description</label>
                          <input
                              type="text"
                              className="form-control"
                              placeholder="Description"
                              name="description"
                              value={serviceData.description}
                              onChange={(e) => setServiceData(prevState => ({
                                  ...prevState,
                                  description: e.target.value
                              }))}
                          />
                      </div>
                      <div className="col-5">
                          <button
                              type="submit"
                              className="btn bg-gradient-info w-100 mt-4 mb-0 mx-auto"
                          >
                              Update
                          </button>
                      </div>
                  </div>
              </div>
          </form>
      </Modal>
  )
}

export default EditServices