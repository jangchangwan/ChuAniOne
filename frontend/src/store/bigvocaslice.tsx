import http from '../api/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const getVocaList = createAsyncThunk(
  'GETVOCALIST',
  async (page:number, {rejectWithValue}) => {
    try {
      const accessToken =localStorage.getItem("access-Token");
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const res = await http.get('voca', {params : {page: page}})
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
      const accessToken =localStorage.getItem("access-Token");
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const res = await http.post(`voca/check/${id}`)
      console.log(res);
      
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
      const accessToken =localStorage.getItem("access-Token");
      console.log(id);
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const res = await http.delete(`voca/delete/${id}`)
      console.log(res);
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