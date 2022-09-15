import http from '../api/axios'

/** chat-room **/
// 전체 채팅방 목록 조회
export async function getChatAll(): Promise<void> {
  await http.get(`chat/list`)
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

// 내 채팅방 목록 조회 :: 구현 후, user_id를 헤더에 보낼 지 결정
export async function getMyChat( user_id: number ): Promise<void> {
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


// 채팅방 생성
export async function createChat( data: any ): Promise<void> {
  await http.post(`chat/room`, data)
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


// 채팅방 하나 조회
export async function getChatInfo( chat_no: number ): Promise<void> {
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


// 채팅방 삭제
export async function deleteChat( chat_no: number ): Promise<void> {
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


// 채팅방 수정
export async function updateChat( chat_no: number ): Promise<void> {
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
