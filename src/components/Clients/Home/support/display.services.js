import { MdBorderColor, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const DisplayServices = ({ service, removeService, openDelete, openEdit }) => {
  return (
    <tr>
      <td>
        <p className="text-xs font-weight-bold mb-0 ms-3">{service.name}</p>
      </td>
      <td>
        <p className="text-xs font-weight-bold mb-0">
          {service.description}
        </p>
      </td>
      <td>
        <p className="text-center text-xs font-weight-bold mb-0">
          {service.prefix}
        </p>
      </td>
      <td>
        <p className="text-center text-xs font-weight-bold mb-0">
          {service.service_time}
        </p>
      </td>
      <td>
        <p className="text-center text-xs font-weight-bold mb-0">
          {service.counts}
        </p>
      </td>
      <td className="align-middle">

        <p className="text-center text-xs font-weight-bold mb-0 text-success">
          <MdBorderColor style={{ cursor: "pointer" }} size={20}
            onClick={() => openEdit(service)}
          />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <MdDelete style={{ cursor: "pointer" }} size={20}
            onClick={() => openDelete(service.id, service.name)}
            className="text-danger" />
        </p>
      </td>
      {/* <td className="text-center">
        <Link to="#" onClick={(e) => removeService(service.id)}>
          <MdDelete style={{ fontSize: "25px", color: "crimson" }} />
        </Link>
      </td> */}
    </tr>
  );
};

export default DisplayServices;


