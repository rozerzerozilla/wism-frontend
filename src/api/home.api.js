import axios from "axios";
// export const URL = "http://localhost:5500/api/public";
export const URL = "https://api.wism.in/api/public";

//generic functions
export const postData = (postdata, url) => {
  return axios.post(URL + url, postdata);
};

//update the data
export const putData = (postdata, url) => {
  return axios.put(URL + url, postdata);
};

export const getData = (url) => {
  return axios.get(URL + url);
};
