import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '../api/axios'



// 로그인
export const login = createAsyncThunk(
  'LOGIN',
  async (userData:any, { rejectWithValue }) => {
    try {
      const res = await http.post('member/login.do', userData)
      const accessToken = res.data.accessToken
      const refreshToken = res.data.refreshToken
      window.localStorage.setItem('access-Token', accessToken);
      window.localStorage.setItem('refresh-Token', refreshToken);
      return res
    } catch (err:any) {
      return rejectWithValue(err.response) //err안에 response로 담겨있음
    }
  },
)


// 로그아웃
export const logout = createAsyncThunk(
  'LOGOUT',
  async (arg, { rejectWithValue }) => {
    try {
      // const res = await http.post('member/logout.do')
      window.localStorage.removeItem('access-Token');
      window.localStorage.removeItem('refresh-Token');
      return
    } catch (err:any) {
      return rejectWithValue(err.response)
    }
  },
)


// 회원가입
export const signup = createAsyncThunk(
  'SIGNUP',
  async (userData:any, { rejectWithValue }) => {
    try {
      const res = await http.post('member/signup.do', userData)
      return res
    } catch (err:any) {
      return rejectWithValue(err.response)
    }
  }
)

// 닉네임 중복 확인
export const nicknameCheck = createAsyncThunk(
  'NICKNAMECHECK',
  async (nickname:string, {rejectWithValue}) => {
    try{
      const res = await http.get(`member/check.do/${nickname}`,)
      return res
    } catch(err:any) {
      return rejectWithValue(err.response)
    }
  }
)

// 회원정보 받아오기
export const myinfo = createAsyncThunk(
  'MYINFO',
  async (arg, {rejectWithValue}) => {
    try{
      const accessToken =localStorage.getItem("access-Token");
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const res = await http.get('member/myinfo')

      if (res.status === 200){
        return res
      } else {
        console.log('실패',res)
      }
      

    } catch(err:any) {
      return rejectWithValue(err.response)
    }
    
  }
)
export interface loginReducerType {
  userId:string,
  isLogin: boolean,
  error: any,
}

const initialState:loginReducerType = {
  userId: '',
  isLogin: false,
  error: null,
}

const loginSlice:any = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.userId = ''
    },
    loginUser: (state) => {
      state.isLogin = true
    },
    logoutUser: (state) => {
      state.isLogin = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.isLogin = true
      })
      .addCase(login.rejected, (state) => {
        state.isLogin = true
      })
      .addCase(myinfo.fulfilled, (state, { payload }) =>{
        if (payload) {
          console.log(payload.data.memberId);
          state.userId = payload.data.memberId
        }
      })
  },
})

export const { resetUser, loginUser, logoutUser } = loginSlice.actions
export default loginSlice.reducer