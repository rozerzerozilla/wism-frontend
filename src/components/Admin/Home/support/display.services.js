import { MdBorderColor, MdDelete } from "react-icons/md";

const DisplayServices = ({ service, handleOpenEditModal, handleOpenDeleteModal}) => {
  return (
    <tr>
      <td>
        <p className="text-xs font-weight-bold mb-0">{service.name}</p>
      </td>
      <td>
        <p className="text-center text-xs font-weight-bold mb-0">
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
      <td>
        <div className="text-center text-xs font-weight-bold mb-0">
          <MdBorderColor size={20} color="teal" style={{ cursor: "pointer" }}
            onClick={() => handleOpenEditModal(service, service.id)} />
          &nbsp;&nbsp;
          <MdDelete size={20} color="red" style={{ cursor: "pointer" }}
            onClick={() => handleOpenDeleteModal(service.id)}
          />
        </div>
      </td>
    </tr>
  );
};

export default DisplayServices;
