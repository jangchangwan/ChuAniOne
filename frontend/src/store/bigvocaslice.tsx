import http from '../api/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const getList = () => {
  http.get('voca')
    .then((response) =>{
      if (response.status === 200) return response.data
      else {
        console.log(response);
        alert('단어 리스트 조회 실패')
      }
    })
    .catch((error) => {
      console.log(error)
    })
};

export const insertMyVoca = ( id:Number ) => {
  http.post(`voca/${id}`)
  .then((response) =>{
    if (response.status === 201) return response.data
    else {
      console.log(response);
      alert('단어 추가 실패')
    }
  })
  .catch((error) => {
    console.log(error)
  })
}

export const deleteMyVoca = ( id:Number ) => {
  http.delete(`voca/${id}`)
  .then((response) =>{
    if (response.status === 200) return response.data
    else {
      console.log(response);
      alert('단어 삭제 실패')
    }
  })
  .catch((error) => {
    console.log(error)
  })
}

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