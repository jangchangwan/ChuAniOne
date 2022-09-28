import axios from "axios"

const http = axios.create({
  baseURL: "https://j7e104.p.ssafy.io/api/v1/",
  // baseURL: "http://localhost:8080/api/v1/",
  headers: {
    "Content-type" : "application/json",
  },
})


export default http