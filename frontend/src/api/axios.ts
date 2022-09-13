import axios from "axios";

const https = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type" : "application/json",
  },
  params: {
  },
});


export default https;