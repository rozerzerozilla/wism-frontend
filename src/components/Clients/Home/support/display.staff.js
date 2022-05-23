import { MdBorderColor, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Switch from "react-switch";

const DisplayStaff = ({ toggleStaff, staff, handleDelete }) => {
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
      <td className="text-center">
        <Switch
          onChange={onStaffChange}
          uncheckedIcon={false}
          checkedIcon={false}
          checked={staff.activated ? true : false}
        />
        {/* <p className="text-xs font-weight-bold mb-0">
          {staff.activated === 1 ? "Active" : "Inactive"}
        </p> */}
      </td>
      <td className="text-center d-flex justify-content-center">
        <Link to={`/clients/editstaff/${staff.id}`}>
          <MdBorderColor style={{ fontSize: "25px", color:"green" }} />
        </Link>
        &nbsp;&nbsp;
        <Link to="#" onClick={() => handleDelete(staff.id, staff.name)}>
          <MdDelete style={{ fontSize: "25px", color: "crimson" }} />
        </Link>
      </td>
    </tr>
  );
};

export default DisplayStaff;
