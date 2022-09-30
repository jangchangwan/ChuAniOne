import http from '../api/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


// 내 애니 조회
export const getMyAniList = createAsyncThunk(
  'GETMYANILIST',
  async ( arg, {rejectWithValue}) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.get('member/ani')
      if (res.status === 200){
        return res.data
      }
      console.log('err', res)
      return 
    } catch(err:any) {
      return rejectWithValue(err.response)
    }
  }
)

// 찜한 애니 전체조회
export const getChoiceAniList = createAsyncThunk(
  'GETCHOICEANILIST',
  async ( arg, {rejectWithValue}) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.get('member/ani/choice')
      if (res.status === 200){
        return res.data
      }
      
      console.log('err', res)
      return
    } catch(err:any) {
      return rejectWithValue(err.response)
    }
  }
)
// 좋아요한 애니 전체 조회
export const getLikeAniList = createAsyncThunk(
  'GETLIKEANILIST',
  async ( arg, {rejectWithValue}) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.get('member/ani/like')
      if (res.status === 200){
        return res.data
      }
      console.log('err', res)
      return
    } catch(err:any) {
      return rejectWithValue(err.response)
    }
  }
)

// 시청한 애니 전체조회
export const getWatchAniList = createAsyncThunk(
  'GETWATCHANILIST',
  async ( arg, {rejectWithValue}) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.get('member/ani/watch')
      if (res.status === 200){
        return res.data
      }
      console.log('err', res)
      return
    } catch(err:any) {
      return rejectWithValue(err.response)
    }
  }
)

// 내 리뷰 전체조회
export const getMyReview = createAsyncThunk(
  'GETMYREVIEW',
  async ( arg, {rejectWithValue}) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.get('member/review')
      if (res.status === 200){
        return res.data
      }
      console.log('err', res)
      return
    } catch(err:any) {
      return rejectWithValue(err.response)
    }
  }
)

// 내 단어 전체조회
export const getMyvoca = createAsyncThunk(
  'GETMYREVIEW',
  async ( arg, {rejectWithValue}) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.get('member/voca')
      if (res.status === 200){
        console.log(res);
        return res.data
      }
      console.log('err', res)
    } catch(err:any) {
      return rejectWithValue(err.response)
    }
  }
)


export interface myPageReducerType {
}

const initialState:myPageReducerType = {
}

const mypageslice:any = createSlice({
  name: 'mypageslice',
  initialState,
  reducers: {
  },
  extraReducers: {

  },
})

export const {  } = mypageslice.actions
export default mypageslice.reducer