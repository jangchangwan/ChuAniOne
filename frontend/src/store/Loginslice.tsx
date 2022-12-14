import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import http from '../api/axios'



/** 로그인 */
export const login = createAsyncThunk(
  'LOGIN',
  async (userData:any, { rejectWithValue }) => {
    try {
      const res = await http.post('member/login.do', userData)
      const accessToken = res.data.accessToken
      const refreshToken = res.data.refreshToken
      window.localStorage.setItem('access-Token', accessToken)
      window.localStorage.setItem('refresh-Token', refreshToken)
      return res
    } catch (err:any) {
      return rejectWithValue(err.response)
    }
  },
)


/** 로그아웃 */
export const logout = createAsyncThunk(
  'LOGOUT',
  async (arg, { rejectWithValue }) => {
    try {
      window.localStorage.removeItem('access-Token')
      window.localStorage.removeItem('refresh-Token')
      return
    } catch (err:any) {
      return rejectWithValue(err.response)
    }
  },
)

/** 회원가입 */
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

/** 닉네임 중복 확인 */
export const nicknameCheck = createAsyncThunk(
  'NICKNAMECHECK',
  async (nickname:string, {rejectWithValue}) => {
    try{
      const res = await http.get(`member/check.do/nickname/${nickname}`,)
      return res
    } catch(err:any) {
      return rejectWithValue(err.response)
    }
  }
)

/** 이메일 중복 확인 */
export const emailCheck = createAsyncThunk(
  'EMAILCHECK',
  async (email:string, {rejectWithValue}) => {
    try{
      const res = await http.get(`member/check.do/email/${email}`)
      return res
    } catch(err:any) {
      return rejectWithValue(err.response)
    }
  }
)

/** 회원정보 받아오기 */
export const myinfo = createAsyncThunk(
  'MYINFO',
  async (arg, {rejectWithValue}) => {
    try{
      const accessToken =localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
      const res = await http.get('member/myinfo')
      return res
    } catch(err:any) {
      return rejectWithValue(err.response)
    }
  }
)

/** 회원 정보 변경  */
export const changeUserInfo = createAsyncThunk(
  'CHANGEUSERINFO',
  async (userDto:any, {rejectWithValue}) => {
    try {
      if ( userDto ) {
        const memberDto = {
          introduction: userDto.introduction,
          nickname: userDto.nickname,
          password: userDto.password,
          profile: userDto.profile,
        } 
        const profileImg = userDto.profile
        const accessToken =localStorage.getItem("access-Token")
        http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
        const res = await http.patch(`member/update/${userDto.id}`, memberDto, profileImg)
        if (res.status === 200) return res
      }
    } catch (err:any) {
      return rejectWithValue(err.response)
    }
  }
)

/** 비밀번호 찾기 */
export const findPWD = createAsyncThunk(
  'FINDPWD',
  async (userDto:any, {rejectWithValue}) => {
    try{
      const res = await http.patch('member/findPw.do', userDto)
      return res
    } catch(err:any){
      return rejectWithValue(err.response)
    }
  }
)

/** accessToken 재발급  */
export const refreshToken = createAsyncThunk(
  'REFRESHTOKEN',
  async (TokenDto:any, {rejectWithValue}) => {
    try{
      const newTokenDto = {
        accessToken :  `Bearer ${TokenDto.accessToken}`,
        refreshToken : `Bearer ${TokenDto.refreshToken}`
      }
      const res = await http.post('member/refresh.do', newTokenDto)
      return res
    } catch(err:any){
      return rejectWithValue(err.response)
    }
  }
)


export interface loginReducerType {
  userId: number,
  isLogin: boolean,
  error: any,
  profileImg: string,
}

const initialState:loginReducerType = {
  userId: 0,
  isLogin: false,
  error: null,
  profileImg: '',
}

const loginSlice:any = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.userId = 0
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
        state.isLogin = false
      })
      .addCase(myinfo.fulfilled, (state, { payload }) =>{
        if (payload) {
          state.userId = payload.data.member.memberId
        }
      })
  },
})

export const { resetUser, loginUser, logoutUser } = loginSlice.actions
export default loginSlice.reducer