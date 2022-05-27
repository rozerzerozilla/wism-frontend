

const FormRegister = ({ userData, setUserData, onSubmit, isLoading, validateOtp }) => {



  let form = <></>
  if (validateOtp) {
    form = <></>
  }

  return (
    <form onSubmit={onSubmit}>
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
              password: e.target.value,
            });
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
          &nbsp;&nbsp;Register
        </button>
      </div>
    </form>
  );
};

export default FormRegister;
