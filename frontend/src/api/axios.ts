import axios from "axios";

const https = axios.create({
  baseURL: "BackEnd URL",
  params: {
  },
});


export default https;