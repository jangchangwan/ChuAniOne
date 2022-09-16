import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '../../api/axios'



// 로그인
export const login = createAsyncThunk(
  'LOGIN',
  async (userData:any, { rejectWithValue }) => {
    try {
      const res = await http.post('member/login.do', userData)
      const {
        data: { accessToken },
      } = res
      window.localStorage.setItem('access-Token', accessToken);
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
export interface loginReducerType {
  user:string,
  isLogin: boolean,
  error: any,
}

const initialState:loginReducerType = {
  user: '',
  isLogin: false,
  error: null,
}

const loginSlice:any = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = ''
    },
    loginUser: (state) => {
      state.isLogin = true
    },
    logoutUser: (state) => {
      state.isLogin = false
    }
  },
  extraReducers: {
    // fulfilled 성공했을때 동작
    // rejected 실패했을때 동작
    [login.fulfilled.type]: (state:any) => {
      state.isLogin = true
    },
    [login.rejected.type]: (state:any) => {
      state.isLogin = false
    },
    [logout.fulfilled.type]: (state:any)=> {
      state.isLogin = false
    },
    [logout.rejected.type]: (state:any) => {
      state.isLogin = true
    }
  },
})

export const { resetUser, loginUser, logoutUser } = loginSlice.actions
export default loginSlice.reducer