import http from '../api/axios'


export const doLogin = () => {
  return http.get("member");
};
