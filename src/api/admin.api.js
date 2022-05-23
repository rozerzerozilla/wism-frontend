import axios from "axios";
const URL = "http://localhost:5500/api/admin";
const PURL = "http://localhost:5500/api/public";

// const URL = "https://api.wism.in/api/admin";
// const PURL = "https://api.wism.in/api/public";

const userData = JSON.parse(localStorage.getItem("userData"));
// if (userData && userData.token) {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
// }

//only use for authentication
export const authPostData = (url, postData) => {
  return axios.post(URL + url, postData);
};

export class AdminApi {
  token = '';
  constructor(token) {
    this.token = token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  postData = (postdata, url) => {
    return axios.post(URL + url, postdata);
  };

  putData = (postdata, url) => {
    return axios.put(URL + url, postdata);
  };

  patchData = (postdata, url) => {
    return axios.patch(URL + url, postdata);
  };

  deleteData = (url) => {
    return axios.delete(URL + url);
  };

  getData = (url) => {
    return axios.get(URL + url);
  };

  getPData = (url) => {
    console.log("GET", axios.get(PURL + url))
    return axios.get(PURL + url);
  };

}

//generic functions
export const postData = (postdata, url) => {
  if (userData && userData.token) {
    return axios.post(URL + url, postdata);
  }
};

//update the data
export const putData = (postdata, url) => {
  if (userData && userData.token) {
    return axios.put(URL + url, postdata);
  }
};

//update2 the data
export const patchData = (postdata, url) => {
  if (userData && userData.token) {
    return axios.patch(URL + url, postdata);
  }
};

//update2 the data
export const deleteData = (url) => {
  if (userData && userData.token) {
    return axios.delete(URL + url);
  }
};

export const getData = (url) => {
  if (userData && userData.token) {
    return axios.get(URL + url);
  }
};

//public data
export const getPData = (url) => {
  if (userData && userData.token) {
    console.log("GET", axios.get(PURL + url))
    return axios.get(PURL + url);
  }
};
