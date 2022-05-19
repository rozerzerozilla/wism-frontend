import style from "../../admin.module.css";
const FormAddStaff = ({
  onSubmit,
  userData,
  setUserData,
  isLoading,
  services,
}) => {
  return (
    <form onSubmit={onSubmit} className="mx-4 my-4">
      <div className="mb-3">
        <div className="row">
          <div className="col-4">
            <label className={style.label}>Staff Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Staff Name"
              name="name"
              value={userData.name || ""}
              onChange={(e) => {
                setUserData({ ...userData, name: e.target.value });
              }}
              required
            />
          </div>
          <div className="col-4">
            <label className={style.label}>Staff Phone Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Staff Phone Number"
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
            <label className={style.label}>Staff Email(optional)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Staff Email"
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
              name="categoryID"
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

          <div className="col-6">
            <label className={style.label}>Staff Break Time</label>
            <input
              type="text"
              className="form-control"
              placeholder="Staff Break Time(ex: 10:45-11:00,15:00-15:15)"
              name="break_time"
              value={userData.break_time || ""}
              onChange={(e) => {
                setUserData({ ...userData, break_time: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label className={style.label}>Services</label>
            {services &&
              services.map((service) => {
                return (
                  <div className="form-check" key={service.id}>
                    <input
                      className="form-check-input"
                      name="services[]"
                      type="checkbox"
                      value={service.id}
                      onChange={(e) => {
                        setUserData({
                          ...userData,
                          services: [...userData.services, e.target.value],
                        });
                      }}
                    />
                    <label className="form-check-label">{service.name}</label>
                  </div>
                );
              })}
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
          &nbsp;&nbsp;Add Staff
        </button>
      </div>
    </form>
  );
};

export default FormAddStaff;
