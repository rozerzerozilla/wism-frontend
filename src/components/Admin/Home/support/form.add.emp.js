import style from "../../admin.module.css";
const FormAddEmp = ({ onSubmit, userData, setUserData, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="mx-4 my-4">
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
                  username: e.target.value,
                  password: e.target.value,
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
            <label className={style.label}>Role</label>
            <select
              className="form-control"
              name="role"
              onChange={(e) => {
                setUserData({ ...userData, role: e.target.value });
              }}
            >
              <option value="">Choose Role</option>
              <option value="1" key="1">
                Owner
              </option>
              <option value="2" key="2">
                Staff
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="btn bg-gradient-info w-50 mt-4 mb-0"
          disabled={isLoading}
        >
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          &nbsp;&nbsp;Add Employee
        </button>
      </div>
    </form>
  );
};

export default FormAddEmp;
