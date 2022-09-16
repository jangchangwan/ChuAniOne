import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  headers: {
    "Content-type" : "application/json",
  },
});


export default http;