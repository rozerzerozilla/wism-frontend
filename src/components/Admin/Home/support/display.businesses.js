import businessImage from "../../../../assets/img/business.jpg";
import { Link } from "react-router-dom";
import Switch from "react-switch";
import { FiEdit} from "react-icons/fi";
const DisplayBusinesses = ({ client, toggleBusiness }) => {
  const onBusinessChange = (checked) => {
    toggleBusiness(checked, client.id);
  };
  return (
    <tr>
      <td>
        <div className="d-flex px-2">
          <img
            src={client.image ? client.image : businessImage}
            className="avatar avatar-sm me-3"
            alt={`${client.name} profile`}
          />
          <div>
            <div className="text-sm text-secondary mb-0">{client.name}</div>
            <div className="text-sm text-secondary mb-0"> {client.telephone}</div>
          </div>
        </div>
      </td>
      <td className="text-center text-secondary text-sm">
        <div className="align-middle text-center text-sm">{client.category}</div>
      </td>

      {/* <td className="align-middle text-center text-sm">
        <Link to={`/admin/business/${client.id}`}>View</Link>
      </td> */}
      <td className="align-middle text-center text-sm">
        <Switch
          onChange={onBusinessChange}
          checked={client.status ? true : false}
          uncheckedIcon={false}
          checkedIcon={false}
        />
      </td>
      {/* <td className="align-middle text-center text-sm">
        <span className="badge badge-sm bg-gradient-info">
          {client.status ? "Active" : "Inactive"}
        </span>
      </td> */}
      <td>
        <div className="text-center text-secondary text-sm">
          <Link to={`/admin/business/${client.id}`}>
            <FiEdit style={{fontSize:"25px"}}/>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default DisplayBusinesses;
