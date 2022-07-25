import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const FormCustomFields = ({
  customFormFields,
  removeField,
}) => {
  return (
    <div className="mx-3">
      <div className="table-responsive p-0 mx-1">
        <table className="table align-items-center mb-0 ">
          <thead>
            <tr>
              <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                Name
              </th>
              <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                Type
              </th>
              <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                Is Required
              </th>
              <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                Values
              </th>
              <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                Default Value
              </th>
              <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {customFormFields &&
              customFormFields.map((fields) => (
                <tr key={fields.id}>
                  <td>
                    <p className="text-center text-sm font-weight-bold mb-0">
                      {fields.name}
                    </p>
                  </td>
                  <td>
                    <p className="text-center text-sm font-weight-bold mb-0">
                      {fields.type}
                    </p>
                  </td>
                  <td>
                    <p className="text-center text-sm font-weight-bold mb-0">
                      {fields.is_required ? "Required" : "Optional"}
                    </p>
                  </td>
                  <td>
                    <p className="text-center text-sm font-weight-bold mb-0">
                      {fields.given_values}
                    </p>
                  </td>
                  <td>
                    <p className="text-center text-sm font-weight-bold mb-0">
                      {fields.def_values}
                    </p>
                  </td>
                  <td className="text-center">
                    <Link to="#" onClick={(e) => removeField(fields.id)}>
                      <MdDelete style={{ fontSize: "25px", color: "crimson" }} />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default FormCustomFields;
