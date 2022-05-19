const DisplayServices = ({ service, removeService }) => {
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
      <td className="align-middle">
        <button
          className="btn btn-danger"
          onClick={(e) => removeService(service.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default DisplayServices;
