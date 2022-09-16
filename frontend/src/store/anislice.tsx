import http from '../api/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

/** ani api **/ 
// AniSearch: 애니메이션 전체 조회
export const getAniList = createAsyncThunk(
  'GETANILIST',
  async (): Promise<void> => {
    await http.get("animation")
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


// 애니메이션 카테고리 조회
export const getFilteredAni = createAsyncThunk(
  'GETFILTEREDANI',
  async ( categroy: string ): Promise<void> => {
    await http.get(`animation/${categroy}`)
      .then((response) =>{
        if (response.status === 200) return response
        else {
          console.log(response)
          alert('데이터 전송 실패')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
)


// 검색된 애니메이션 조회
export const getSearchAni = createAsyncThunk(
  'GETSEARCHANI',
  async ( search: string ): Promise<void> => {
    await http.get(`animation/`, { params: { search }})
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


// 애니메이션 상세 조회
export const getAni = createAsyncThunk(
  'GETANI',
  async ( id: number ): Promise<void> => {
    await http.get(`animation/${id}`)
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


// AniDetail: 상세정보 조회
export const getAniDetail = createAsyncThunk(
  'GETANIDETAIL',
  async ( id: number ): Promise<void> => {
    await http.get(`animation/detail/${id}`)
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


// AniDetail: 비슷한 작품 조회
export const getAniRelation = createAsyncThunk(
  'GETANIRELATION',
  async ( id: number ): Promise<void> => {
    await http.get(`animation/relation/${id}`)
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



/** review api **/
// 애니메이션 리뷰 조회
export const getAniReview = createAsyncThunk(
  'GETANIREVIEW',
  async ( id: number ): Promise<void> => {
    await http.get(`review/${id}`)
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


// 리뷰 생성
export const createAniReview = createAsyncThunk(
  'CREATEANIREVIEW',
  async ( ): Promise<void> => {
    await http.post(`review`)
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


// 리뷰 삭제
export const deleteAniReview = createAsyncThunk(
  "DELETEANIREVIEW",
  async ( id: number ): Promise<void> => {
    await http.delete(`review/${id}`)
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


// 리뷰 수정
export const updateAniReview = createAsyncThunk(
  'UPDATEANIREVIEW',
  async ( id: number ): Promise<void> => {
    await http.patch(`review/${id}`)
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



/** talk api **/
// 애니메이션 톡톡 조회
export const getAniTalk = createAsyncThunk(
  'GETANITALK',
  async ( id: number ): Promise<void> => {
    await http.get(`talk/${id}`)
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


// 톡톡 생성
export const createAniTalk = createAsyncThunk(
  'CREATEANITALK',
  async ( ): Promise<void> => {
    await http.post(`talk`)
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


// 톡톡 삭제
export const deleteAniTalk = createAsyncThunk(
  'DELETEANITALK',
  async ( id: number ): Promise<void> => {
    await http.delete(`talk/${id}`)
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