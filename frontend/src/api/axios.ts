import axios from "axios";

const http = axios.create({
  baseURL: "http://j7e104.p.ssafy.io/api/v1/",
  headers: {
    "Content-type" : "application/json",
  },
});


export default http;