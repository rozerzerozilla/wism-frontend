const FormCustomFields = ({
  onSubmit,
  userData,
  setUserData,
  isLoading,
  customFormFields,
  removeField,
}) => {
  return (
    <div className="mx-3">
      <div className="table-responsive p-0 mx-1">
        <table className="table align-items-center mb-0 ">
          <thead>
            <tr>
              <th className=" text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Name
              </th>
              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Type
              </th>
              <th className=" text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Is Required
              </th>
              <th className=" text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Values
              </th>
              <th className=" text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                Default Value
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customFormFields &&
              customFormFields.map((fields) => (
                <tr key={fields.id}>
                  <td>
                    <p className="text-xs font-weight-bold mb-0">
                      {fields.name}
                    </p>
                  </td>
                  <td>
                    <p className=" text-xs font-weight-bold mb-0">
                      {fields.type}
                    </p>
                  </td>
                  <td>
                    <p className=" text-xs font-weight-bold mb-0">
                      {fields.is_required ? "Required" : "Optional"}
                    </p>
                  </td>
                  <td>
                    <p className="text-xs font-weight-bold mb-0">
                      {fields.given_values}
                    </p>
                  </td>
                  <td>
                    <p className=" text-xs font-weight-bold mb-0">
                      {fields.def_values}
                    </p>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => removeField(fields.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <hr />
      <div className="mt-5"></div>
      <form onSubmit={onSubmit} className="mx-4 my-4">
        <div className="mb-3">
          <div className="row">
            <div className="col-4">
              <label>Field/Display Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Display Name"
                name="name"
                required
                value={userData.name || ""}
                onChange={(e) => {
                  setUserData({ ...userData, name: e.target.value });
                }}
              />
            </div>
            <div className="col-4">
              <label>Field Type</label>
              <select
                className="form-control"
                name="type"
                onChange={(e) => {
                  setUserData({ ...userData, type: e.target.value });
                }}
              >
                <option value="">Choose Type</option>
                <option value="Text" key="1">
                  Text
                </option>
                <option value="Date" key="2">
                  Date
                </option>
                <option value="Dropdown" key="3">
                  Dropdown
                </option>
              </select>
            </div>
            <div className="col-4">
              <label>Is It Required?</label>
              <select
                className="form-control"
                name="is_required"
                onChange={(e) => {
                  setUserData({ ...userData, is_required: e.target.value });
                }}
              >
                <option value="0" key="1">
                  No
                </option>
                <option value="1" key="2">
                  Yes
                </option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label>Values</label>
              <input
                type="text"
                className="form-control"
                placeholder="Valaues(for dropdown enter values seperated by commas)"
                name="given_values"
                value={userData.given_values || ""}
                onChange={(e) => {
                  setUserData({ ...userData, given_values: e.target.value });
                }}
              />
            </div>
            <div className="col-6">
              <label>Default Value</label>
              <input
                type="text"
                className="form-control"
                placeholder="Default Value"
                name="def_values"
                value={userData.def_values || ""}
                onChange={(e) => {
                  setUserData({ ...userData, def_values: e.target.value });
                }}
              />
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
            &nbsp;&nbsp;Add Custom Form Field
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormCustomFields;
