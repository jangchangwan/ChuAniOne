import http from '../api/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { isCatchClause } from 'typescript'


export const getVocaList = createAsyncThunk(
  'GETVOCALIST',
  async (arg, {rejectWithValue}) => {
    try {
      const res = await http.get('voca/list.do')
      return res
    } catch(error:any) {
      return rejectWithValue(error.response)
    }
  }
)

export const insertMyVoca = createAsyncThunk(
  'INSERTMYVOCA',
  async (id:number, {rejectWithValue}) => {
    try {
      const res = await http.post(`voca/check/${id}`)
      return res
    } catch (err:any) {
      return rejectWithValue(err.response)
    }
  }
)

export const deleteMyVoca = createAsyncThunk(
  'DELETEMYVOCA',
  async (id:number, {rejectWithValue}) => {
    try {
      const res = await http.post(`voca/delete/${id}`)
      return res
    } catch (err:any) {
      return rejectWithValue(err.response)
    }
  }
)


export interface openChatReducerType {
  words: [],
  error: any,
}

const initialState:openChatReducerType = {
  words: [],
  error: null,
}

const bigvocaslice:any = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.words = []
    },
  },
  extraReducers: {

  },
})

export const { resetUsers } = bigvocaslice.actions
export default bigvocaslice.reducer