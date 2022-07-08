import React, { useState } from 'react'
import Modal from 'react-responsive-modal';

function PincodeDetails({ open, handleClose, handleSubmitPincode }) {
    const [pincode, setPincode] = useState("")
    const handleInputChange = (e) => {
        setPincode(e.target.value)
    }
  return (
      <Modal open={open} onClose={handleClose} center>
          <h5>Change your location</h5>
          <br />
          <div className="row">
              <div className="col-12 mb-3">
                  <input type={'number'} className='form-control' onChange={(e) => handleInputChange(e)}/>
              </div>
              <div className="col-12">
                  <button
                      className="btn btn-success"
                      onClick={() => handleSubmitPincode(pincode)}
                  >
                      Submit
                  </button>
              </div>
          </div>
      </Modal>
  )
}

export default PincodeDetails