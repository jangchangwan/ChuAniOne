import React, {useState, useEffect} from 'react'

// 하위 컴포넌트
import MyGoalItem from './MyGoalItem'

// redux
import { useDispatch } from 'react-redux'
import { getchallenge } from '../../store/mypageslice'
import store from '../../store'


/** 도전과제 페이지 */
function MyGoal() {
  const dispatch = useDispatch<typeof store.dispatch>()

  // 도전과제 데이터
  const [myChallengeList, setChallengeList] = useState<any>([])

  // 데이터 불러오기
  async function loadChallengeData() {
    const myChallenge = await dispatch(getchallenge())
    setChallengeList(myChallenge.payload)
  }
  
  useEffect(() => {
    loadChallengeData()
  },[])

  return (
    <div>
    {
      myChallengeList ?
      ( myChallengeList.map((item, idx) => (
        <MyGoalItem key={idx} challengeData={item}/>
      ))

      )
      : null
    }
    </div>
  )
}

export default MyGoal
