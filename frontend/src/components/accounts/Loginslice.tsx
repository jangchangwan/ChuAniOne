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
      window.localStorage.removeItem('access-Token');
      return '로그아웃'
    } catch (err:any) {
      return rejectWithValue(err.response)
    }
  },
)

const initialState = {
  user: {},
  loading: false,
  error: null,
  updateUserPoint: 0,
}

const loginSlice:any = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = {}
    },
    savePoint: (state) => {
      // data unwrap 하고 싶을때 current 리덕스 툴킷에서 가져와서 쓰면 된다.
    },
  },
  extraReducers: {
    [login.fulfilled.type]: (state:any) => {
      state.loading = false
    },
    [login.rejected.type]: (state:any) => {
      state.isAuthenticated = false
    },
  },
})

export const { resetUser, savePoint } = loginSlice.actions
export default loginSlice.reducer