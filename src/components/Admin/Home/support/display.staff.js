import { MdBorderColor, MdDelete } from "react-icons/md";

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
      <td>
        <div className="text-center text-xs font-weight-bold mb-0">
          <MdBorderColor size={20} color="teal" style={{cursor:"pointer"}}/>
          &nbsp;&nbsp;<MdDelete size={20} color="red" style={{cursor:"pointer"}}/>
        </div>
      </td>
    </tr>
  );
};

export default DisplayStaff;
