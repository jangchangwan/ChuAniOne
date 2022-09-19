import http from '../api/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

/** chat-room **/
// 전체 채팅방 목록 조회
export const getChatAll = createAsyncThunk(
  'GETCHATALL',
  async (page: number, { rejectWithValue }) => {
    try { 
      const res = await http.get(`room/list.do/${page}`)
      return res.data
    } catch(err) {
      console.log('전체 채팅방 목록 조회 실패', err)
    }
})


// 채팅방 생성
export const createChat = createAsyncThunk(
  'CREATECHAT',
  async (data: any) => {
    try {
      const res = await http.post(`room/room.do`, data)
      return res.data
    } catch (err) {
      console.log('방 생성 에러', err)
    }
  }
)

interface getMyList {
  userId: number,
  page: number,
}


// 내 채팅방 목록 조회 :: 구현 후, user_id를 헤더에 보낼 지 결정
export const getMyChat = createAsyncThunk(
  'GETMYCHAT',
  async ( data: getMyList ) => {
    try {
      const res = await http.get(`room/list.do/join/${data.userId}/page/${data.page}`)
      return res
    } catch (err) {
      console.log('내 채팅방 목록 에러', err)
    }
    
  }
)



// 채팅방 하나 조회
export const getChatInfo = createAsyncThunk(
  'GETCHATINFO',
  async ( chat_no: number ): Promise<void> => {
    await http.get(`chat/room/${chat_no}`)
      .then((res) => {
        if (res.status === 200) return res
        else {
          console.log(res)
          alert('데이터 전송 실패')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
)



// 채팅방 삭제
export const deleteChat = createAsyncThunk(
  'DELETECHAT',
  async ( chat_no: number ): Promise<void> => {
    await http.delete(`chat/room/${chat_no}`)
      .then((res) => {
        if (res.status === 200) return res
        else {
          console.log(res)
          alert('데이터 전송 실패')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
)
  


// 채팅방 수정
export const updateChat = createAsyncThunk(
  'UPDATECHAT',
  async ( chat_no: number ): Promise<void> => {
    await http.patch(`chat/room/${chat_no}`)
      .then((res) => {
        if (res.status === 200) return res
        else {
          console.log(res)
          alert('데이터 전송 실패')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
)


// 채팅방 검색 결과
export async function searchChat( keyword: string ): Promise<void> {
  await http.patch(`chat/search/${keyword}`)
    .then((res) => {
      if (res.status === 200) return res
      else {
        console.log(res)
        alert('데이터 전송 실패')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}


export interface openChatReducerType {
  users: [],
  error: any,
  rooms: []
}

const initialState: openChatReducerType = {
  users: [],
  error: null,
  rooms: []
}

const openchatSlice:any = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.users = []
      state.rooms = []
    },
  },
  extraReducers: {
  },
})

export const { resetUsers } = openchatSlice.actions
export default openchatSlice.reducer