import { toast } from "react-toastify";
import * as API from "../../api/admin.api";
//import ActionTypes from "../../helpers/action.types";


let APIs;
const userData = JSON.parse(localStorage.getItem("userData"));
if (userData && userData.token) {
  APIs = new API.AdminApi(userData.token);
}
export const Login =
  (type, url, postData, setErrors, setSuccess, setIsLoading, history) =>
    async (dispatch) => {
      try {
        const { data } = await API.authPostData(url, postData);
        dispatch({ type: type, payload: data });
        setIsLoading(false);
        setSuccess("data created successfully!");
        localStorage.setItem("userData", JSON.stringify(data));
        APIs = new API.AdminApi(data.token)
        history.replace(`/admin/dashboard`);
      } catch (error) {
        if (error.response) {
          setErrors(error?.response?.data?.error?.message);
        } else if (error.request) {
          setErrors("Something went wrong, please try again later!");
        } else {
          setErrors(error.message);
        }
        setIsLoading(false);
      }
    };

//general calls
export const authPostData =
  (type, url, postData, setErrors, setSuccess, setIsLoading) =>
    async (dispatch) => {
      try {
        const { data } = await API.authPostData(url, postData);
        dispatch({ type: type, payload: data });
        //setIsLoading(false);
        console.log("data created successfully")
        setSuccess("data created successfully!");
      } catch (error) {
        console.log("error", error)
        setErrors(error.response.data.error.message);

        if (error.response.data.error.message) {
          toast.error(error.response.data.error.message)
          setErrors(error.response.data.error.message);
        } else if (error.request) {
          toast.error("Something went wrong, please try again later!")
          setErrors("Something went wrong, please try again later!");
        } else {
          toast.error(error.message)
          setErrors(error.message);
        }
        setIsLoading(false);
      }
    };

export const postData =
  (type, url, postData, setErrors, setSuccess, setIsLoading) =>
    async (dispatch) => {
      console.log(type, url, postData, setErrors, setSuccess, setIsLoading);
      try {
        const { data } = await APIs.postData(postData, url);
        dispatch({ type: type, payload: data });
        setIsLoading(false);
        console.log("data created successfully");
        setSuccess("data created successfully!");
      } catch (error) {
        console.log("error", error);
        setErrors(error.response.data.error.message);
        if (error.response.data.error.message) {
          toast.error(error.response.data.error.message)
          setErrors(error.response.data.error.message);
        } else if (error.request) {
          toast.error("Something went wrong, please try again later!")
          setErrors("Something went wrong, please try again later!");
        } else {
          toast.error(error.message)
          setErrors(error.message);
        }
        setIsLoading(false);
      }
    };

export const putData =
  (type, url, postData, setErrors, setSuccess, setIsLoading) =>
    async (dispatch) => {
      try {
        const { data } = await APIs.putData(postData, url);
        dispatch({ type: type, payload: data });
        setIsLoading(false);
        setSuccess("data updated successfully!");
      } catch (error) {
        if (error.response) {
          setErrors(error.response.data.error.message);
        } else if (error.request) {
          setErrors("Something went wrong, please try again later!");
        } else {
          setErrors(error.message);
        }
        setIsLoading(false);
      }
    };

export const patchData =
  (type, url, postData, setErrors, setSuccess, setIsLoading) =>
    async (dispatch) => {
      try {
        const { data } = await APIs.patchData(postData, url);
        dispatch({ type: type, payload: data });
        setIsLoading(false);
        setSuccess("data updated successfully!");
      } catch (error) {
        if (error.response) {
          setErrors(error.response.data.error.message);
        } else if (error.request) {
          setErrors("Something went wrong, please try again later!");
        } else {
          setErrors(error.message);
        }
        setIsLoading(false);
      }
    };


export const deleteData = (type, url, setErrors, setSuccess, setIsLoading) => async (dispatch) => {
  try {
    const { data } = await APIs.deleteData(url);
    dispatch({ type: type, payload: data });
    setIsLoading(false);
    //toast.success("data deleted successfully!")
    setSuccess("data delete successfully!");
  } catch (error) {
    //toast.error(error.response.data.error.message)
    if (error.response) {
      setErrors(error.response.data.error.message);
    } else if (error.request) {
      setErrors("Something went wrong, please try again later!");
    } else {
      setErrors(error.message);
    }
    setIsLoading(false);
  }
};

export const getData = (type, url, setErrors, setIsLoading) => async (dispatch) => {
  try {
    const { data } = await APIs.getData(url);
    // console.log('for business edit', data)
    dispatch({ type: type, payload: data, loading: false });
    setIsLoading(false);
  } catch (error) {
    console.log("Login error", error?.response?.data?.error?.message)
    // toast.error(error.response.data.error.message, "Access is denied")
    // setTimeout(() => {
    //   sessionLogout();
    // }, 2000)
    if (error.response) {
      setErrors(error.response.data.error.message);
    } else if (error.request) {
      setErrors("Something went wrong, please try again later!");
    } else {
      setErrors(error.message);
    }
    setIsLoading(false);
  }
};

//get public data
export const getPData =
  (type, url, setErrors, setIsLoading) => async (dispatch) => {
    try {
      const { data } = await APIs.getPData(url);
      dispatch({ type: type, payload: data });
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.error.message);
      } else if (error.request) {
        setErrors("Something went wrong, please try again later!");
      } else {
        setErrors(error.message);
      }
      setIsLoading(false);
    }
  };
