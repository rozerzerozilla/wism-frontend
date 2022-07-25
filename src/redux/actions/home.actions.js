import * as API from "../../api/home.api";
export const postData =
  (type, url, postData, setErrors, setSuccess, setIsLoading) =>
  async (dispatch) => {
    try {
      const { data } = await API.postData(postData, url);
      dispatch({ type: type, payload: data });
      setIsLoading(false);
      setSuccess("data created successfully!");
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

export const getData =
  (type, url, setErrors, setIsLoading) => async (dispatch) => {
    try {
      const { data } = await API.getData(url);
      console.log(data)
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
