import http from '../api/axios'


/** ani api **/ 
// AniSearch: 애니메이션 전체 조회
export async function getAniList(): Promise<void> {
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
export async function getFilteredAni( categroy: string ): Promise<void> {
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
export async function getSearchAni( search: string ): Promise<void> {
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

// AniDetail: 비슷한 작품 조회
export async function getAniRelation( id: number ): Promise<void> {
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


/** review api **/
// 애니메이션 리뷰 조회
export async function getAniReview( id: number ): Promise<void> {
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

// 리뷰 생성
export async function createAniReview( ): Promise<void> {
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

// 리뷰 삭제
export async function deleteAniReview( id: number ): Promise<void> {
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

// 리뷰 수정
export async function updateAniReview( id: number ): Promise<void> {
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


/** talk api **/
// 애니메이션 톡톡 조회
export async function getAniTalk( id: number ): Promise<void> {
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

// 톡톡 생성
export async function createAniTalk( ): Promise<void> {
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

// 톡톡 삭제
export async function deleteAniTalk( id: number ): Promise<void> {
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