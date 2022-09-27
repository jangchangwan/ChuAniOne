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