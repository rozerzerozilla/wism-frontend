import style from "../../clients.module.css";
const FormAddServices = ({ onSubmit, userData, setUserData, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="mx-4 my-4">
      <div className="mb-3">
        <div className="row">
          <div className="col-4">
            <label className={style.label}>Service Name <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="Service Name(24 chars max)"
              name="name"
              value={userData.name || ""}
              onChange={(e) => {
                setUserData({ ...userData, name: e.target.value });
              }}
              required
            />
          </div>
          <div className="col-4">
            <label className={style.label}>Token Prefix <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="Token Prefix(1 char alphabet)"
              name="prefix"
              value={userData.prefix || ""}
              onChange={(e) => {
                setUserData({ ...userData, prefix: e.target.value });
              }}
              required
            />
          </div>
          <div className="col-4">
            <label className={style.label}>Default Service Time <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="Default Service Time(in mins)"
              name="service_time"
              value={userData.service_time || ""}
              onChange={(e) => {
                setUserData({ ...userData, service_time: e.target.value });
              }}
              required
            />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="row">
          <div className="col-12">
            <label className={style.label}>Description </label>
            <textarea
              placeholder="Service Description(60 chars max)"
              name="description"
              className="form-control"
              onChange={(e) => {
                setUserData({ ...userData, description: e.target.value });
              }}
            >
              {userData.description || ""}
            </textarea>
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
          &nbsp;&nbsp;Add Service
        </button>
      </div>
    </form>
  );
};

export default FormAddServices;
