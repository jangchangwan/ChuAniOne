import axios from "axios";

const http = axios.create({
  baseURL: "http://spring-boot/api/v1/",
  headers: {
    "Content-type" : "application/json",
  },
});


export default http;