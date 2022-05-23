import axios from "axios";
const URL = "http://localhost:5500/api/clients";
const PURL = "http://localhost:5500/api/public";

// const URL = "https://api.wism.in/api/clients";
// const PURL = "https://api.wism.in/api/public";

const userData = JSON.parse(localStorage.getItem("userData"));
// if (userData && userData.token) {
//   axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
// }

//only use for authentication
export const authPostData = (url, postData) => {
  return axios.post(URL + url, postData);
};

export class ClientApi {
  token = '';
  constructor(token) {
    this.token = token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  //generic functions
  postData = (postdata, url) => {
    return axios.post(URL + url, postdata);
  };

  //update the data
  putData = (postdata, url) => {
    return axios.put(URL + url, postdata);
  };

  deleteData = (url) => {
    return axios.delete(URL + url);
  };

  getData = (url) => {
    return axios.get(URL + url);
  };

  //public data
  getPData = (url) => {
    return axios.get(PURL + url);
  };

}


