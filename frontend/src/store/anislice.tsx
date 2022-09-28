import http from '../api/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

/** searchAni **/
// 전체 애니 목록 (페이지네이션)
export const getAniAll = createAsyncThunk(
  'GETANIALL',
  async(page: number, { rejectWithValue }) => {
    try {
      const res = await http.get(`animation/list.do/${page}`)
      if (res.status === 200) return res.data
      else console.log('전체 애니목록 조회 에러', res)
    } catch (err) {
      console.log('전체 애니목록 조회 에러', err)
    }
  }
)

// 애니메이션 정보 조회
export const getAni = createAsyncThunk(
  'GETANI',
  async(id: number, { rejectWithValue }) => {
    try {
      const res = await http.get(`animation/detail.do/${id}`)
      if (res.status === 200) return res.data
      else console.log('애니정보 조회 에러', res)
    } catch(err) {
      console.log('애니정보 조회 에러', err)
    }
  }
)


// 찜 & 좋아요 & 싫어요 조회
export const getTaste = createAsyncThunk(
  'GETTASTE',
  async (id: number, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.get(`animation/about/${id}`)
      if (res.status === 200) return res.data
      else console.log('찜 & 좋아요 & 싫어요 에러', res)

    } catch(err) {
      console.log('찜 & 좋아요 & 싫어요 에러', err)
    }
  }
)

// 좋아요 등록
export const postLike = createAsyncThunk(
  'POSTLIKE',
  async (id: number, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.post(`animation/like/${id}`)

      if (res.status === 200) return true
      else {
        console.log('postLike error', res)
        return false
      }
    } catch(err) {
      console.log('postLike error', err)
      return false
    }
  }
)

// 좋아요 삭제
export const deleteLike = createAsyncThunk(
  'DELETELIKE',
  async (id: number, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.delete(`animation/like/${id}`)
      if (res.status === 200) return true
      else {
        console.log('postLike error', res)
        return false
      }
    } catch(err) {
      console.log('postLike error', err)
      return false
    }
  }
)

// 싫어요 등록
export const postDislike = createAsyncThunk(
  'POSTDISLIKE',
  async (id: number, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
      
      const res = await http.post(`animation/dislike/${id}`)
      if (res.status === 200) return true
      else {
        console.log('post dislike error', res)
        return false
      }
    } catch (err) {
      console.log('post dislike error', err)
      return false
      // return rejectWithValue(err.response)
    }
  }
)


// 싫어요 삭제
export const deleteDislike = createAsyncThunk(
  'DELETEDISLIKE',
  async (id: number, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.delete(`animation/dislike/${id}`)
      if (res.status === 200) return true
      else {
        console.log('delete dislike error', res)
        return false
      }
    } catch (err) {
      console.log('delete dislike error', err)
      return false
      // return rejectWithValue(err.response)
    }
  }
)

// 찜 등록
export const postChoice = createAsyncThunk (
  'POSTCHOICE',
  async (id: number, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.post(`animation/choice/${id}`)
      if (res.status === 200) return true
      else {
        console.log('post choice error', res)
        return false
      }
    } catch (err) {
      console.log('post choice error', err)
      return false
    }
  }
)


// 찜 삭제
export const deleteChoice = createAsyncThunk (
  'DELETECHOICE',
  async (id: number, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.delete(`animation/choice/${id}`)
      if (res.status === 200) return true
      else {
        console.log('delete choice error', res)
        return false
      }
    } catch (err) {
      console.log('delete choice error', err)
      return false
    }
  }
)


// 비슷한 애니메이션 조회
export const getSimilar = createAsyncThunk(
  'GETSIMILAR',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await http.get(`animation/relation.do/${id}`)
      if (res.status === 200) return res.data
      else console.log('비슷한 애니메이션 에러', res)
    } catch (err) {
      console.log('비슷한 애니메이션 에러', err)
    }
  }
)

export interface openChatReducerType {
  error: any,
  anilist: []
}

const initialState:openChatReducerType = {
  error: null,
  anilist: []
}

const anislice:any = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetanilist: (state) => {
      state.anilist = []
    },
  },
  extraReducers: {

  },
})

export const { resetanilist } = anislice.actions
export default anislice.reducer