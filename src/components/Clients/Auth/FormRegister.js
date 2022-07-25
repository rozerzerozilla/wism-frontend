

const FormRegister = ({ userData, setUserData, onSubmit, isLoading, validateOtp, otpSend }) => {



  let form = <>
    <label style={{ color: "white" }}>
      Your Phone Number (OTP will sent to this number)
    </label>
    <div className="mb-3">
      <input
        type="number"
        className="form-control"
        placeholder="Phone"
        name="phone"
        onChange={(e) => {
          setUserData({
            ...userData,
            phone: e.target.value,
          });
        }}
      />
    </div>
  </>
  if (otpSend) {
    form = <>
      <label style={{ color: "white" }}>
        Enter OTP that has been send to your mobile number (Don't Refresh)
      </label>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Enter OTP"
          name="text"
          onChange={(e) => {
            setUserData({
              ...userData,
              otp: e.target.value,
            });
          }}
        />
      </div>
    </>
  } else if (validateOtp) {
    form = <>
      <label style={{ color: "white" }}>Your Name</label>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Your Name"
          name="name"
          onChange={(e) => {
            setUserData({ ...userData, name: e.target.value });
          }}
        />
      </div>
      <label style={{ color: "white" }}>Your Password</label>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Your Password"
          name="password"
          onChange={(e) => {
            setUserData({ ...userData, password: e.target.value });
          }}
        />
      </div>
    </>
  } else {

  }

  return (
    <form onSubmit={onSubmit}>
      {/* {form} */}
      <label style={{ color: "white" }}>Your Name</label>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Your Name"
          name="name"
          onChange={(e) => {
            setUserData({ ...userData, name: e.target.value });
          }}
        />
      </div>
      <label style={{ color: "white" }}>Your Phone</label>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Your Name"
          name="name"
          onChange={(e) => {
            setUserData({ ...userData, phone: e.target.value });
          }}
        />
      </div>
      <label style={{ color: "white" }}>Your Password</label>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Your Password"
          name="password"
          onChange={(e) => {
            setUserData({ ...userData, password: e.target.value });
          }}
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="btn bg-gradient-info w-100 mt-4 mb-0"
          disabled={isLoading}
        >
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          &nbsp; &nbsp; Register
          {/* &nbsp;&nbsp;{otpSend ? 'Verify' : validateOtp ? 'Register' : "Send OTP"} */}
        </button>
      </div>
    </form>
  );
};

export default FormRegister;
