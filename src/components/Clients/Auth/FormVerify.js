const FormVerify = ({ userData, setUserData, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit}>
      <label>Please enter OTP</label>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="OTP"
          name="otp"
          required
          onChange={(e) => {
            setUserData({ ...userData, otp: e.target.value });
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
          &nbsp;&nbsp;Verify
        </button>
      </div>
    </form>
  );
};

export default FormVerify;
