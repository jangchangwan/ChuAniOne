import http from '../api/axios'

export const getList = () => {
  return http.get("room/");
};
