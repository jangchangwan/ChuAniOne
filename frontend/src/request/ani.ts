import http from '../api/axios'

// 애니메이션 전체 조회
export async function getListAll(): Promise<void> {
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

// 애니메이션 카테고리 조회
export async function getCategoryList( categroy: string ): Promise<void> {
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

// 검색된 애니메이션 조회
export async function getSearchList( search: string ): Promise<void> {
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

// 애니메이션 상세 조회
export async function getAni( id: number ): Promise<void> {
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

// AniDetail: 상세정보 조회
export async function getAniDetail( id: number ): Promise<void> {
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

// AniDetail: 리뷰 조회
export async function getAniReview( id: number ): Promise<void> {
  await http.get(`animation/review/${id}`)
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

// AniDetail: 비슷한 작품 조회
export async function getAniRecomm( id: number ): Promise<void> {
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

// AniDetail: 톡톡 조회
export async function getTalk( id: number ): Promise<void> {
  await http.get(`animation/talk/${id}`)
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
