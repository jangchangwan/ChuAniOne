import http from '../api/axios'



export const LoginCheck = (userDto:any) => {
  http.post('login.do', userDto).then((res) => {
    console.log(res.status);
    if (res.status === 200){
    }
  })

};
