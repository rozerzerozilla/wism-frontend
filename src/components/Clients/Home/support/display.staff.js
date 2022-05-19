import { Link } from "react-router-dom";
import Switch from "react-switch";

const DisplayStaff = ({ toggleStaff, staff }) => {
  const onStaffChange = (checked) => {
    toggleStaff(checked, staff.id);
  };
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
        <Switch
          onChange={onStaffChange}
          checked={staff.activated ? true : false}
        />
        <p className="text-xs font-weight-bold mb-0">
          {staff.activated === 1 ? "Active" : "Inactive"}
        </p>
      </td>
      <td>
        <Link to={`/clients/editstaff/${staff.id}`}>Edit</Link>
      </td>
    </tr>
  );
};

export default DisplayStaff;
