import { useState } from "react";

//import { Link } from "react-router-dom";
const FormLogin = ({ userData, setUserData, onSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <form onSubmit={onSubmit}>
      <label style={{ color: "white" }}>Your Username</label>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Your Username"
          name="username"
          required
          onChange={(e) => {
            setUserData({ ...userData, username: e.target.value });
          }}
        />
      </div>

      <label style={{ color: "white" }}>Your Password</label>
      <div className="mb-3">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control"
          placeholder="Your Password"
          name="password"
          required
          onChange={(e) => {
            setUserData({ ...userData, password: e.target.value });
          }}
        />
        <div className="mt-1"></div>
        <input type="checkbox" className="form-control-checkbox" onChange={() => setShowPassword(prevState => !prevState)} />
        <span className="text-white">&nbsp;Show password!</span>
      </div>
      {/* <div className="row">
        <div className="col-6"></div>
        <div className="col-6">
          <Link to="/clients/forgot">Forgot Password?</Link>
        </div>
      </div> */}
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
          &nbsp;&nbsp;Login
        </button>
      </div>
    </form>
  );
};

export default FormLogin;
