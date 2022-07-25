import { MdBorderColor, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const DisplayStaff = ({ staff, id, handleStaffDelete }) => {
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
          <Link to={`/admin/business/emp/${id}/${staff.id}`}><MdBorderColor size={20} color="teal" style={{cursor:"pointer"}}/></Link>
          &nbsp;&nbsp;{staff.role === 2 && <MdDelete size={20} color="red" style={{cursor:"pointer"}} 
          onClick={(e)=>handleStaffDelete({name: staff.name, id:staff.id})}
          />}
        </div>
      </td>
    </tr>
  );
};

export default DisplayStaff;
