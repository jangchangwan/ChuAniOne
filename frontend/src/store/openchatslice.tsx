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
  async ( roomId: number ): Promise<void> => {
    await http.get(`room/room.do/${roomId}`)
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

interface ChatRoom {
  id: number,
  name: string,
  tag1: string,
  tag2: string,
  tag3: string,
  memberId: number,
  nickname: string,
  count: number,
  max: number,
}

export interface openChatReducerType {
  chatting: boolean,
  chatRoom: null | Partial<ChatRoom>,
}

const initialState: openChatReducerType = {
  chatting: false,
  chatRoom: null,
}

const openchatSlice: any = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setChattingOpen: (state, action) => {
      state.chatting = true
      state.chatRoom = action.payload
    },
    setChattingClose: (state) => {
      state.chatting = false
      state.chatRoom = null
    },
  },
  extraReducers: {
  },
})

export const { setChattingOpen, setChattingClose } = openchatSlice.actions
export default openchatSlice.reducer