import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminFooter from "./layout/admin.footer";
import AdminHeader from "./layout/admin.header";
import AdminNavMenu from "./layout/admin.navmenu";
import ActionTypes from "../../../helpers/action.types";
import * as Actions from "../../../redux/actions/admin.actions";
import { toast } from 'react-toastify';
import validator from 'validator';
import style from "../../Admin/admin.module.css"
import { Modal } from 'react-responsive-modal';
import {
  MdBorderColor,
  MdDelete
}
  from "react-icons/md"
import UnauthorizedModal from "./UnauthorizedModal";

const AdminCategories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setcategory] = useState("");
  const [catId, setCatId] = useState(null)
  const [catname, setCatname] = useState("");
  const [edit, setEdit] = useState(false);
  const [deletecat, setDeletecat] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(false);
  const dispatch = useDispatch();
  var categories = [];
  categories = useSelector((state) => {
    return state.admin.categories;
  });

  const openEdit = (id, name) => {
    setEdit(true);
    setCatId(id)
    setCatname(name)
  }
  const submitEdit = (event) => {

    event.preventDefault();
    setIsLoading(true);

    if (!validator.isAlpha(catname.replace(/ /g, ""))) {
      InvalidCategoryError();
      setIsLoading(false);
      return null
    } else if (catname.includes("") || catname.includes(" ")) {
      
      dispatch(
        Actions.patchData(
          ActionTypes.PATCH_CATEGORY,
          `/home/category/${catId}`,
          { category: catname },
          setErrors,
          setSuccess,
          setIsLoading
        )
      );
      if (errors === true) {
        categoryError();
        setEdit(false);
      }
      else {
        categoryUpdated();
        setTimeout(() => {
          window.location.reload()
        }, 2000)

        dispatch(
          Actions.getData(
            ActionTypes.GET_CATEGORIES,
            "/home/categories",
            setErrors,
            setIsLoading
          )
        );
      }
      setCatId(null)
      setCatname("")
      setEdit(false);
    }

  }
  const closeEdit = () => {
    setCatId(null)
    setCatname("")
    setEdit(false);
  }

  const openDelete = (id, name) => {
    setDeletecat(true);
    setCatId(id)
    setCatname(name)
  }
  const closeDelete = () => {
    setDeletecat(false);
    setCatId(null);
    setCatname("");
  }

  const submitDelete = (event) => {
    event.preventDefault();
    // setIsLoading(false);
    setDeletecat(false);
    dispatch(
      Actions.deleteData(
        ActionTypes.DELETE_CATEGORY,
        `/home/category/${catId}`,
        { id: catId },
        setErrors,
        setSuccess,
        setIsLoading
      )
    );

    if (success) {
      
      categoryDeleted();
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
    else {
      
      categoryError();
      }
    setCatId(null)
    setCatname("")
  }

  // notify messages
  const categoryUpdated = () => toast.success('Category updated successfully');

  const categoryDeleted = () => toast.success('Category deleted');

  const categoryAdded = () => toast.success('Category added successfully');
  const categoryError = () => toast.error('Error! failed to create category');
  const InvalidCategoryError = () => toast.error('Category cannot have numbers(0-9) or special characters($%#@&*...)');

  const addCategory = (event) => {
    event.preventDefault();
    setIsLoading(true);
    let duplicateCategory = categories.filter(
      cat => cat.name.toLowerCase() === category.toLowerCase()
    )
    // console.log(category.replace(/ /g, ""))
    if (!validator.isAlpha(category.replace(/ /g, ""))) {
      InvalidCategoryError();
      setIsLoading(false);
      return null
    } else if (duplicateCategory.length > 0) {
      toast.error('Error! the category exists');
      setIsLoading(false);
      return null
    }
    else {
      dispatch(
        Actions.postData(
          ActionTypes.POST_CATEGORIES,
          "/home/categories",
          { name: category },
          setErrors,
          setSuccess,
          setIsLoading
        )
      );
      
      setTimeout(() => {
        dispatch(
          Actions.getData(
            ActionTypes.GET_CATEGORIES,
            "/home/categories",
            setErrors,
            setIsLoading
          )
        );
      }, 3000)

      if (errors) {
        categoryError();
      }
      else {
        categoryAdded();
        setcategory("");
      }

    }
  };

  const sessionLogout = () => {
    localStorage.clear();
    //setAccess(true)
  }

  useEffect(() => {
    dispatch(
      Actions.getData(
        ActionTypes.GET_CATEGORIES,
        "/home/categories",
        setErrors,
        setIsLoading
      )
    );
  }, [dispatch]);

  const handleChangeInput = (e) => {
    setcategory(e.target.value)
  }

  return (
    <>
      <AdminNavMenu path="category" />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <AdminHeader header="Categories" />
        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-4 d-flex w-100">
                  <h6 className="w-50">Add Categories</h6>
                  <form onSubmit={addCategory} className="w-100">
                    <div className="row">
                      <div className="col-9">
                        <input
                          type="text"
                          value={category}
                          placeholder="Category Name"
                          className="form-control"
                          name="name"
                          onChange={handleChangeInput}
                          required
                        />
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
                          Add Category
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                {errors && (errors === "Unauthorized access!" || errors === "Unauthorized") &&
                  <UnauthorizedModal
                    sessionLogout={sessionLogout}
                  />
                }

                <div className="card-body px-0 pt-0 pb-2 mx-0">
                  <table className="table align-items-center mb-0" cellPadding={5}>
                    <thead>
                      <tr>
                        <th className="text-center text-uppercase text-secondary text-sm font-weight-bolder opacity-10">
                          ID
                        </th>
                        <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-10 ps-2">
                          Name
                        </th>
                        <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-10 ps-2">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories &&
                        categories.map((category, index) => {
                          return (
                            <tr key={category.id}>
                              <td className="text-center">{index + 1}</td>
                              <td>{category.name}</td>
                              <td>
                                <p className="text-left text-xs font-weight-bold mb-0 text-success">
                                  <MdBorderColor style={{ cursor: "pointer" }} size={20} onClick={() => openEdit(category.id, category.name)} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  <MdDelete style={{ cursor: "pointer" }} size={20} onClick={(e) => openDelete(category.id, category.name)} className="text-danger" />
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
        <h5>Edit category</h5>
        <form
          className="mx-4 my-4"
          onSubmit={submitEdit}
        >
          <div className="mb-3">
            <div className="row">
              <div className="col-12">
                <label className={style.label}>Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category Name"
                  name="catname"
                  value={catname}
                  onChange={(e) => setCatname(e.target.value)}
                  required
                />
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
      <Modal open={deletecat} onClose={closeDelete} center>
        <br />
        <h5>Are you sure you want to delete <br />category: {catname} ?</h5>

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

export default AdminCategories;
