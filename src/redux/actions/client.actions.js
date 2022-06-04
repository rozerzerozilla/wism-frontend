import { toast } from "react-toastify";
import * as API from "../../api/clients.api";
//import ActionTypes from "../../helpers/action.types";

export const Register =
  (type, url, postData, setErrors, setSuccess, setIsLoading, history) =>
    async (dispatch) => {
      try {
        const { data } = await API.authPostData(url, postData);
        dispatch({ type: type, payload: data });
        setIsLoading(false);
        setSuccess("data created successfully!");
        // if (data && data.verify) {
        //   history.replace(`/clients/verify/${data.phone}`);
        // }
        localStorage.setItem("userData", JSON.stringify(data));
        history.replace(`/clients/dashboard`);
        setErrors(null)
      } catch (error) {
        setSuccess(null)
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

export const Verify =
  (type, url, postData, setErrors, setSuccess, setIsLoading, history) =>
    async (dispatch) => {
      try {
        const { data } = await API.authPostData(url, postData);
        dispatch({ type: type, payload: data });
        setIsLoading(false);
        setSuccess("data created successfully!");
        setErrors(null)
        localStorage.setItem("userData", JSON.stringify(data));
        history.replace(`/clients/dashboard`);
      } catch (error) {
        setSuccess(null)
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

let APIs;
const userData = JSON.parse(localStorage.getItem("userData"));
if (userData && userData.token) {
  APIs = new API.ClientApi(userData.token);
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
        APIs = new API.ClientApi(data.token)
        history.replace(`/clients/dashboard`);

        if (data && data.verify) {
          history.replace(`/clients/verify/${data.phone}`);
          return;
        }
        localStorage.setItem("userData", JSON.stringify(data));
        history.replace(`/clients/dashboard`);
        setErrors(null)
      } catch (error) {
        setSuccess(null)
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

//general calls
export const postData =
  (type, url, postData, setErrors, setSuccess, setIsLoading) =>
    async (dispatch) => {
      console.log("postdata")
      try {
        const { data } = await APIs.postData(postData, url);
        dispatch({ type: type, payload: data });
        setIsLoading(false);
        toast.success("Data saved successfully!")
        setSuccess("data created successfully!");
        setErrors(null)
      } catch (error) {
        setSuccess(null)
        if (error.response) {
          error?.response?.data?.error?.message ? toast.error(error.response.data.error.message) : toast.error('unable to update')
          error?.response?.data?.error?.message ? setErrors(error.response.data.error.message) : setErrors(null)
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

//general calls
export const putData =
  (type, url, postData, setErrors, setSuccess, setIsLoading) =>
    async (dispatch) => {
      try {
        const { data } = await APIs.putData(postData, url);
        dispatch({ type: type, payload: data });
        setIsLoading(false);
        toast.success("Data updated successfully!")
        setSuccess("data updated successfully!");
        setErrors(null)
      } catch (error) {
        setSuccess(null)
        if (error.response) {
          toast.error(error.response?.data?.error?.message);
          setErrors(error.response?.data?.error?.message);
        } else if (error.request) {
          toast.error("Something went wrong, please try again later!")
          setErrors("Something went wrong, please try again later!");
        } else {
          toast.error(error.message);
          setErrors(error.message);
        }
        setIsLoading(false);
      }
    };

export const deleteData =
  (type, url, setErrors, setSuccess, setIsLoading) => async (dispatch) => {
    try {
      const { data } = await APIs.deleteData(url);
      dispatch({ type: type, payload: data });
      setIsLoading(false);
      // toast.success("Deleted successfully!" + data.message)
      setSuccess("Deleted successfully!");
      setErrors(null)
    } catch (error) {
      setSuccess(null)
      if (error.response) {
        toast.error(error.response?.data?.error?.message)
        setErrors(error.response?.data?.error?.message);
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

export const getData =
  (type, url, setErrors, setIsLoading) => async (dispatch) => {
    try {
      const { data } = await APIs.getData(url);
      console.log("data", data)
      dispatch({ type: type, payload: data });
      setIsLoading(false);
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

//get public data
export const getPData =
  (type, url, setErrors, setIsLoading) => async (dispatch) => {
    try {
      const { data } = await APIs.getPData(url);
      dispatch({ type: type, payload: data });
      setIsLoading(false);
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
