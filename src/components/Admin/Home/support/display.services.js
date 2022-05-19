const DisplayServices = ({ service }) => {
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
    </tr>
  );
};

export default DisplayServices;
