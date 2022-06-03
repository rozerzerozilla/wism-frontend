import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import AdminFooter from "./layout/admin.footer";
import AdminHeader from "./layout/admin.header";
import AdminNavMenu from "./layout/admin.navmenu";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/admin.actions";
import DisplayBusiness from "./support/display.business";
import { toast } from "react-toastify";
const AdminBusiness = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const dispatch = useDispatch();
  var business;
  business = useSelector((state) => state.admin.business);
  const history = useHistory();
  useEffect(() => {
    dispatch(
      Actions.getData(
        ActionTypes.ADMIN_GET_BUSINESS,
        `/home/business/${id}?view=1`,
        setErrors,
        setIsLoading
      )
    );
  }, [dispatch, history, id]);

  return (
    <>
      <AdminNavMenu path="business" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <AdminHeader header="Business Details" />
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="mb-4">
                <div className="px-0 pt-0 pb-2">
                  <br />
                  {errors && toast.error(`${errors}`)}
                  {isLoading && (
                    <div className="text-center my-5">
                      <div className="spinner-border text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  )}

                  <DisplayBusiness details={business} id={id} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <AdminFooter />
      </main>
    </>
  );
};

export default AdminBusiness;
