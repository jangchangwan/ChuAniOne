import http from '../api/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'



/** chat-room **/
// 전체 채팅방 목록 조회
export const getChatAll = createAsyncThunk(
  'GETCHATALL',
  async (page: number) => {
    try {
      const res = await http.get(`room/list.do/${page}`)
      console.log(res)
      if (res.status === 200) return res.data
      else {
        console.log('전체 채팅방 목록 조회 실패', res)
    }
    } catch(err) {
      console.log('전체 채팅방 목록 조회 실패', err)
    }
}
)

// 내 채팅방 목록 조회 :: 구현 후, user_id를 헤더에 보낼 지 결정
export const getMyChat = createAsyncThunk(
  'GETMYCHAT',
  async ( user_id: number ): Promise<void> => {
    await http.get(`chat/list/${user_id}`)
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


// 채팅방 생성
export async function createChat( data: any, setOpenSuccess: any, setOpenFail: any): Promise<void> {
  await http.post(`room/room.do`, data)
    .then((res) => {
      if (res.status === 200) {
        setOpenSuccess(true)
        return res
      }
      else {
        setOpenFail(true)
      }
    })
    .catch((err) => {
      setOpenFail(true)
    })
}


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

const initialState:openChatReducerType = {
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