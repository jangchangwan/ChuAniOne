import http from '../api/axios'


export const getListAll = () => {
  return http.get("animation");
};

export const getCategoryList = ( categroy: string ) => {
  http.get(`animation/${categroy}`)
    .then((response) =>{
      if (response.status === 200) return response
      else {
        console.log(response);
        alert('데이터 전송 실패')
      }
    })
    .catch((error) => {
      console.log(error)
    })
  return http.get(`animation/${categroy}`);
};

export const getSearchList = ( id: Number ) => {
  return http.get(`animation/${id}`)
}

