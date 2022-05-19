const DisplayStaff = ({ staff }) => {
  return (
    <tr>
      <td>
        <p className="text-center text-xs font-weight-bold mb-0">
          {staff.adate}
        </p>
      </td>
      <td>
        <p className=" text-center text-xs font-weight-bold mb-0">
          {staff.name}
        </p>
      </td>
      <td>
        <p className="text-center text-xs font-weight-bold mb-0">
          {staff.role === 1 ? "Owner" : "Staff"}
        </p>
      </td>
      <td>
        <p className="text-center text-xs font-weight-bold mb-0">
          {staff.phone}
        </p>
      </td>
      <td>
        <p className="text-center text-xs font-weight-bold mb-0">
          {staff.email}
        </p>
      </td>
      <td>
        <p className="text-center text-xs font-weight-bold mb-0">
          {staff.activated === 1 ? "Active" : "Inactive"}
        </p>
      </td>
    </tr>
  );
};

export default DisplayStaff;
