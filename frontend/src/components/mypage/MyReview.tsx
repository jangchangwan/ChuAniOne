import React, {useState, useEffect} from 'react'

// 하위 컴포넌트
import MyReviewItem from './MyReviewItem'

// redux
import { useDispatch } from 'react-redux'
import { getMyReview } from '../../store/mypageslice'
import store from '../../store'


/** 마이 리뷰 Component */
function MyReview() {
  const dispatch = useDispatch<typeof store.dispatch>()
  // 내 리뷰 리스트
  const [myReviewList, setMyReviewList] = useState<any>([])

    // 데이터 불러오기
    async function loadReviewData() {
      const MyReview = await dispatch(getMyReview())
      setMyReviewList(MyReview.payload)
    }
  
    useEffect(() => {
      loadReviewData()
    },[])

  return (
    <div>
      {
        myReviewList ?
        ( myReviewList.map((item, idx) => (
          <MyReviewItem key={idx} reviewData={item}/>
        ))

        )
        : null
      }
        
    </div>
  )
}

export default MyReview
