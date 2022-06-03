import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from 'validator';
import AdminFooter from "./layout/admin.footer";
import AdminHeader from "./layout/admin.header";
import AdminNavMenu from "./layout/admin.navmenu";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/admin.actions";
import { toast } from 'react-toastify';
import { Modal } from 'react-responsive-modal';
import {
  MdBorderColor,
  MdDelete
}
  from "react-icons/md"
import UnauthorizedModal from "./UnauthorizedModal";

const AdminSubCategories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [subcategory, setSubCategory] = useState("");
  const [success, setSuccess] = useState(false);
  const [categoryID, setCategoryID] = useState("");
  const [errors, setErrors] = useState(false);

  const [catId, setCatId] = useState(null)
  const [subcatId, setSubcatId] = useState(null)
  const [subcatname, setSubcatname] = useState("");
  const [catname, setCatname] = useState("");
  const [deletesubcat, setDeletesubcat] = useState(false);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();
  var categories = [];
  var subcategories = [];
  categories = useSelector((state) => {
    return state.admin.categories;
  });
  subcategories = useSelector((state) => {
    return state.admin.subcategories;
  });

  const openEdit = (subid, subcat, cat, catid) => {
    setEdit(true);
    setSubcatId(subid)
    setSubcatname(subcat)
    setCatname(cat)
    setCatId(catid)
  }

  const closeEdit = () => {
    setSubcatId(null)
    setSubcatname("")
    setCatname(null)
    setCatId("")
    setEdit(false);
  }

  const openDelete = (subid, subcat) => {
    setDeletesubcat(true);
    setSubcatId(subid)
    setSubcatname(subcat)
    // setCatId(catid)

  }
  const closeDelete = () => {
    setDeletesubcat(false);
    setSubcatId(null)
    setSubcatname("")
  }

  const submitDelete = () => {

    setDeletesubcat(false);
    dispatch(
      Actions.deleteData(
        ActionTypes.DELETE_SUBCATEGORY,
        `/home/subcategory/${subcatId}`,
        { id: subcatId },
        setErrors,
        setSuccess,
        setIsLoading
      )
    );
    // setIsLoading(false);
    if (errors) {
      SubcategoryError("delete");
    }
    else {
      subcategoryDeleted()
      dispatch(
        Actions.getData(
          ActionTypes.GET_SUBCATEGORIES,
          "/home/subcategories",
          setErrors,
          setIsLoading
        )
      );
    }
    // setCatId(null)
    setSubcatId(null)
    setSubcatname("")
  }

  // notify messages
  const subcategoryUpdated = () => toast.success('Subcategory updated successfully');
  const subcategoryDeleted = () => toast.success('Subcategory deleted');
  const SubcategoryError = (action) => toast.error(`Error! failed to ${action} subcategory`);
  // const subcategoryAdded = () => toast.success('Sub category added successfully');
  const InputFieldError = (fieldname) => toast.error(`Error! enter valid ${fieldname}`);

  const addSubCategory = (event) => {
    event.preventDefault();
    if (validator.isNumeric(subcategory)) {
      InputFieldError("subcategory");
    }
    else if (categoryID === "") {
      InputFieldError("category");
    }
    else if (subcategory.includes("") || subcategory.includes(" ")) {
      setIsLoading(true);
      dispatch(
        Actions.postData(
          ActionTypes.POST_SUBCATEGORIES,
          "/home/subcategories",
          { name: subcategory, category_id: categoryID },
          setErrors,
          setSuccess,
          setIsLoading
        )
      );
      setTimeout(() => {
        dispatch(
          Actions.getData(
            ActionTypes.GET_SUBCATEGORIES,
            "/home/subcategories",
            setErrors,
            setIsLoading
          )
        );
        dispatch(
          Actions.getData(
            ActionTypes.GET_CATEGORIES,
            "/home/categories",
            setErrors,
            setIsLoading
          )
        );
      }, 200)
      if (errors === true) {
        SubcategoryError("update")
      }
      // else if (success) {
      // 	subcategoryAdded();
      // }
      setSubCategory("");
    }

  };

  const submitEdit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    dispatch(
      Actions.patchData(
        ActionTypes.PATCH_SUBCATEGORY,
        `/home/subcategory/${subcatId}`,
        { subcategory: subcatname, category_id: catId },
        setErrors,
        setSuccess,
        setIsLoading,
      )
    );
    setTimeout(() => {

      dispatch(
        Actions.getData(
          ActionTypes.GET_SUBCATEGORIES,
          "/home/subcategories",
          setErrors,
          setIsLoading
        )
      );
      dispatch(
        Actions.getData(
          ActionTypes.GET_CATEGORIES,
          "/home/categories",
          setErrors,
          setIsLoading
        )
      );
    }, 200)

    if (errors === true) {
      SubcategoryError("update");
    }
    else {
      // subcategoryUpdated();
    }
    setEdit(false);
    setSubcatId(null)
    setSubcatname("")
    setCatname("")
    setCatId(null)
    // }

  }

  const sessionLogout = () => {
    localStorage.clear();
    //setAccess(true)
  }

  useEffect(() => {
    dispatch(
      Actions.getData(
        ActionTypes.GET_SUBCATEGORIES,
        "/home/subcategories",
        setErrors,
        setIsLoading
      )
    );
    dispatch(
      Actions.getData(
        ActionTypes.GET_CATEGORIES,
        "/home/categories",
        setErrors,
        setIsLoading
      )
    );
  }, [dispatch]);

  return (
    <>
      <AdminNavMenu path="subcategory" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <AdminHeader header="Sub Categories" />
        {errors && (errors === "Unauthorized access!" || errors === "Unauthorized") &&
          <UnauthorizedModal
            sessionLogout={sessionLogout}
          />
        }
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-3 d-flex w-100">
                  <h6 className="w-20">Add Sub Categories</h6>
                  <form onSubmit={addSubCategory} className="w-100">
                    <div className="row mx-4">
                      <div className="col-5">
                        <input
                          type="text"
                          value={subcategory}
                          placeholder="Subcategory Name"
                          className="form-control"
                          name="name"
                          onChange={(e) => setSubCategory(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-4">
                        <select
                          className="form-control"
                          onChange={(e) => {
                            setCategoryID(e.target.value);
                          }}
                        >
                          <option value="">Choose Category</option>
                          {categories &&
                            categories.map((category) => (
                              <option value={category.id} key={category.id}>
                                {category.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="col-3">
                        <button
                          type="submit"
                          className="btn bg-gradient-info mb-0"
                          disabled={isLoading}
                        >
                          {isLoading && (
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          )}
                          Add Sub Category
                        </button>
                      </div>
                    </div>

                  </form>
                </div>
                
                <div className="card-body px-0 pt-0 pb-2 mx-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-7">
                          ID
                        </th>
                        <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                          Name
                        </th>
                        <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {subcategories &&
                        subcategories.map((subcategory, index) => {
                          return (
                            <tr key={subcategory.id}>
                              <td className="text-center">
                                {index + 1}
                              </td>
                              <td>
                                {subcategory.category} - {subcategory.name}
                              </td>
                              <td>
                                <p className="text-left text-xs font-weight-bold mb-0 text-success">
                                  <MdBorderColor style={{ cursor: "pointer" }} size={20}
                                    onClick={() => openEdit(subcategory.id, subcategory.name, subcategory.category, subcategory.category_id)}
                                  />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <MdDelete style={{ cursor: "pointer" }} size={20}
                                    onClick={(e) => openDelete(subcategory.id, subcategory.name)}
                                    className="text-danger" />
                                </p>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>

        <AdminFooter />
      </main>

      {/* Edit modal */}
      <Modal open={edit} onClose={closeEdit} center>
        <h5>Edit subcategory</h5>
        <form
          className="mx-4 my-4"
          onSubmit={submitEdit}
        >
          <div className="mb-3">
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  placeholder="Subcategory Name"
                  className="form-control"
                  name="name"
                  value={subcatname}
                  onChange={(e) => setSubcatname(e.target.value)}
                  required
                />
              </div>
              <div className="col-6">
                <select
                  className="form-control"
                  onChange={(e) => {
                    setCatId(e.target.value);
                  }}
                >
                  <option value={catname} key={catId}>{catname}</option>
                  {categories &&
                    categories.map((category) => (
                      <option value={category.id} key={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-3"></div>
              <div className="col-5">
                <button
                  type="submit"
                  className="btn bg-gradient-info w-100 mt-4 mb-0 mx-auto"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>

      {/* Delete modal */}
      <Modal open={deletesubcat} onClose={closeDelete} center>
        <br />
        <h5>Are you sure you want to delete <br />subcategory: {subcatname} ?</h5>

        <form
          className="mx-4 my-4"
        >
          <div className="row">
            <div className="col-6">
              <button
                type="cancel"
                className="btn btn-secondary"
                onClick={closeDelete}
              >
                &nbsp;&nbsp;Cancel
              </button>
            </div>
            <div className="col-6">
              <button
                type="submit"
                className="btn btn-danger"
                onClick={submitDelete}
              >
                &nbsp;&nbsp;Delete
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AdminSubCategories;
