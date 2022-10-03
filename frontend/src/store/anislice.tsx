import http from '../api/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

/** Main **/
export const getMain = createAsyncThunk(
  'GETMAIN',
  async (args, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      if (accessToken) http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.get(`animation/main.do`)
      if (res.status === 200) return res.data
      else console.log('메인 조회 에러', res)
    } catch (err) {
      console.log('메인 조회 에러', err)
    }
  }
)

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

interface SearchProps {
  genres: string[],
  keyword: string,
  tags: string[],
  page: number
}

// 애니메이션 검색 & 필터 (페이지네이션)
export const searchAni = createAsyncThunk(
  'SEARCHANI',
  async ( data: SearchProps , { rejectWithValue}) => {
    try {
      const dto: any = {
        genres: data.genres,
        keyword: data.keyword,
        tags: data.tags
      }
      const res = await http.post(`animation/search.do/${data.page}`, dto)
      return res.data
    } catch(err) {
      console.log('검색 에러', err)
    }
  }
)

/** AniDetail **/
// 애니메이션 정보 조회
export const getAni = createAsyncThunk(
  'GETANI',
  async(id: number, { rejectWithValue }) => {
    try {
      const res = await http.get(`animation/detail.do/${id}`)
      if (res.status === 200) return res.data
      else console.log('애니정보 조회 에러', res)
    } catch(err) {
      console.log('애니정보 조회 에러', err)
    }
  }
)


// 찜 & 좋아요 & 싫어요 조회
export const getTaste = createAsyncThunk(
  'GETTASTE',
  async (id: number, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access-Token")

      if (accessToken) {
        http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
  
        const res = await http.get(`animation/about/${id}`)
        if (res.status === 200) return res.data
        else console.log('찜 & 좋아요 & 싫어요 에러', res)
      }

    } catch(err) {
      console.log('찜 & 좋아요 & 싫어요 에러', err)
    }
  }
)

// 좋아요 등록
export const postLike = createAsyncThunk(
  'POSTLIKE',
  async (id: number, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.post(`animation/like/${id}`)

      if (res.status === 200) return true
      else {
        console.log('postLike error', res)
        return false
      }
    } catch(err) {
      console.log('postLike error', err)
      return false
    }
  }
)

// 좋아요 삭제
export const deleteLike = createAsyncThunk(
  'DELETELIKE',
  async (id: number, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.delete(`animation/like/${id}`)
      if (res.status === 200) return true
      else {
        console.log('postLike error', res)
        return false
      }
    } catch(err) {
      console.log('postLike error', err)
      return false
    }
  }
)

// 싫어요 등록
export const postDislike = createAsyncThunk(
  'POSTDISLIKE',
  async (id: number, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.post(`animation/dislike/${id}`)
      if (res.status === 200) return true
      else {
        console.log('post dislike error', res)
        return false
      }
    } catch (err) {
      console.log('post dislike error', err)
      return false
      // return rejectWithValue(err.response)
    }
  }
)


// 싫어요 삭제
export const deleteDislike = createAsyncThunk(
  'DELETEDISLIKE',
  async (id: number, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.delete(`animation/dislike/${id}`)
      if (res.status === 200) return true
      else {
        console.log('delete dislike error', res)
        return false
      }
    } catch (err) {
      console.log('delete dislike error', err)
      return false
      // return rejectWithValue(err.response)
    }
  }
)

// 찜 등록
export const postChoice = createAsyncThunk (
  'POSTCHOICE',
  async (id: number, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.post(`animation/choice/${id}`)
      if (res.status === 200) return true
      else {
        console.log('post choice error', res)
        return false
      }
    } catch (err) {
      console.log('post choice error', err)
      return false
    }
  }
)


// 찜 삭제
export const deleteChoice = createAsyncThunk (
  'DELETECHOICE',
  async (id: number, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.delete(`animation/choice/${id}`)
      if (res.status === 200) return true
      else {
        console.log('delete choice error', res)
        return false
      }
    } catch (err) {
      console.log('delete choice error', err)
      return false
    }
  }
)


// 리뷰 전체 조회
export const getReviewAll = createAsyncThunk (
  'GETREVIEWALL',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await http.get(`review/list.do/${id}`)
      if (res.status === 200) return res.data
      else console.log('리뷰 전체 조회 에러', res)
    } catch(err) {
      console.log('리뷰 전체 조회 에러', err)
    }
  }
)



// 내 리뷰 조회
export const getMyReview = createAsyncThunk (
  'GETMYREVIEW',
  async (id: number, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
      
      const res = await http.get(`review/my/${id}`)

      if (res.status === 200) return res.data
      else console.log('내 리뷰 조회 에러', res)
    } catch(err) {
      console.log('내 리뷰 조회 에러', err)
    }
  }
)

interface Review {
  id: number,
  content: string,
  rating: number
}

// 리뷰 작성
export const postReview = createAsyncThunk (
  'POSTREVIEW',
  async (data: Review, { rejectWithValue }) => {
    try {

      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
      
      const res = await http.post(`review/insert/${data.id}`, {
        content: data.content,
        rating: data.rating
      })

      if (res.status === 200) return res.data
      else console.log('리뷰 작성 에러', res)
    } catch(err) {
      console.log('리뷰 작성 에러', err)
    }
  }
)

// 리뷰 수정
export const patchReview = createAsyncThunk (
  'POSTREVIEW',
  async (data: Review, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.patch(`review/update/${data.id}`, {
        content: data.content,
        rating: data.rating
      })

      if (res.status === 200) return res.data
      else console.log('리뷰 수정 에러', res)
    } catch(err) {
      console.log('리뷰 수정 에러', err)
    }
  }
)

// 리뷰 삭제
export const deleteReview = createAsyncThunk (
  'DELETEREVIEW',
  async (id: number, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
      
      const res = await http.delete(`review/delete/${id}`)

      if (res.status === 200) return res.data
      else console.log('리뷰 삭제 에러', res)
    } catch(err) {
      console.log('리뷰 삭제 에러', err)
    }
  }
)






// 비슷한 애니메이션 조회
export const getSimilar = createAsyncThunk(
  'GETSIMILAR',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await http.get(`animation/relation.do/${id}`)
      if (res.status === 200) return res.data
      else console.log('비슷한 애니메이션 에러', res)
    } catch (err) {
      console.log('비슷한 애니메이션 에러', err)
    }
  }
)

// 톡톡 조회
export const getTalk = createAsyncThunk(
  'GETTALK',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await http.get(`talk/list.do/${id}`)

      if (res.status === 200) return res.data
      else {
        console.log('톡톡 불러오기 에러', res)
        return false
      }
    } catch(err) {
      console.log('톡톡 불러오기 에러', err)
    }
  }
)

interface WriteProps {
  content: string,
  image: string,
  id: number,
}

// 톡톡 작성
export const createTalk = createAsyncThunk(
  'CREATETALK',
  async (data: WriteProps, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.post(`talk/insert/${data.id}`, {
        content: data.content,
        image: data.image,
      })

      if (res.status === 200) return true
      else {
        console.log('톡톡 작성 에러', res)
        return false
      }
    } catch(err) {
      console.log('톡톡 작성 에러', err)
    }
  }
)

interface DeleteProps {
  id: number,
  tid: number,
}

// 톡톡 삭제
export const deleteTalk = createAsyncThunk(
  'DELETETALK',
  async (data: DeleteProps, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access-Token")
      http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

      const res = await http.delete(`talk/delete/${data.id}/${data.tid}`)
      if (res.status === 200) return true
      else {
        console.log('톡톡 삭제 에러', res)
        return false
      }
    } catch(err) {
      console.log('톡톡 삭제 에러', err)
    }
  }
)


export interface openChatReducerType {
}

const initialState:openChatReducerType = {
}

const anislice:any = createSlice({
  name: 'ani',
  initialState,
  reducers: {
  },
  extraReducers: {

  },
})

export const {  } = anislice.actions
export default anislice.reducer