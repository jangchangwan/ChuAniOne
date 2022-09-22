import http from '../api/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

/** chat-room **/
// 전체 채팅방 목록 조회
export const getChatAll = createAsyncThunk(
  'GETCHATALL',
  async (page: number, { rejectWithValue }) => {
    try { 
      const res = await http.get(`room/list.do/${page}`)
      console.log(res)
      return res.data
    } catch(err) {
      console.log('전체 채팅방 목록 조회 실패', err)
    }
})

interface searchProps {
  keyword: string,
  page: number
}

// 채팅방 검색 결과
export const searchChat = createAsyncThunk(
  'SEARCHCHAT',
  async ( data: searchProps ) => {
    console.log(data)
    try {
      const res = await http.get(`room/search.do/${data.keyword}/page/${data.page}`)
      return res.data
    } catch (err) {
      console.log('채팅방 검색 에러', err)
    }
  }
)


// 내 채팅방 목록 조회 :: 구현 후, user_id를 헤더에 보낼 지 결정
export const getMyChat = createAsyncThunk(
  'GETMYCHAT',
  async ( page: number ) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.get(`room/list/join/${page}`)
      return res
    } catch (err) {
      console.log('내 채팅방 목록 에러', err)
    }
    
  }
)


// 채팅방 하나 조회
export const getChatInfo = createAsyncThunk(
  'GETCHATINFO',
  async ( roomId: number ) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.get(`room/room.do/${roomId}`)
      return res.data
    } catch (err) {
      console.log('채팅방 정보 조회 에러', err)
    }
  }
)

// 채팅 다 불러오기
export const getChatList = createAsyncThunk(
  'GETCHATLIST',
  async ( roomId: number ) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.get(`room/chatlist/${roomId}`)

      if (res.status === 200) return res.data
      else console.log('채팅 불러오기 에러', res)

    } catch (err) {
      console.log('채팅 불러오기 에러', err)
    }
  }
)

// 채팅방 생성
export const createChat = createAsyncThunk(
  'CREATECHAT',
  async (data: any) => {
    try {
      const res = await http.post(`room/room`, data)
      return res.data
    } catch (err) {
      console.log('방 생성 에러', err)
    }
  }
)


// 채팅방 삭제
export const deleteChat = createAsyncThunk(
  'DELETECHAT',
  async ( roomId: number ) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
      
      const res = await http.delete(`room/room/${roomId}`)
      return res
    } catch (err) {
      console.log('채팅방 삭제 에러', err)
    }
  }
)


// 채팅방 수정
export const updateChat = createAsyncThunk(
  'UPDATECHAT',
  async ( data: Partial<ChatRoom> ) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
      
      const res = await http.patch(`room/room/${data.id}`, {
        max: data.max,
        memberId: data.userId,
        name: data.name,
        tag1: data.tag1,
        tag2: data.tag2,
        tag3: data.tag3,
      })
      return res
    } catch (err) {
      console.log('채팅방 수정 에러', err)
    }
  }
)

// 채팅방 입장
export const enterRoom = createAsyncThunk(
  'ENTERROOM',
  async ( roomId: number ) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.post(`room/join/${roomId}`)
      if (res.status === 200) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.log('채팅방 입장 에러', err)
      return false
    }
  }
)

// 채팅방 퇴장
export const leaveRoom = createAsyncThunk(
  'LEAVEROOM',
  async ( roomId: number ) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.delete(`room/join/${roomId}`)
      return res
    } catch (err) {
      console.log('채팅방 퇴장 에러', err)
    }
  }
)



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

  // 채팅방 수정 시에 사용 (추후 삭제)
  userId: number,
}

export interface openChatReducerType {
  // chatting: boolean,
  // chatRoom: null | Partial<ChatRoom>,
}

const initialState: openChatReducerType = {
  // chatting: false,
  // chatRoom: null,
} 

const openchatSlice: any = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // setChattingOpen: (state, action) => {
    //   console.log(action.payload)
    //   state.chatting = true
    //   state.chatRoom = action.payload
    // },
    // setChattingClose: (state) => {
    //   state.chatting = false
    //   state.chatRoom = null
    // },
  },
  extraReducers: {
  },
})

// export const { setChattingOpen, setChattingClose } = openchatSlice.actions
export default openchatSlice.reducer