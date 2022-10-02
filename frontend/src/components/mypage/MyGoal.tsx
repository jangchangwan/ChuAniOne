import React, {useState, useEffect} from 'react'
import MyGoalItem from './MyGoalItem';
import { useDispatch } from 'react-redux'
import { getchallenge } from '../../store/mypageslice'
import store from '../../store'

function MyGoal() {
  const dispatch = useDispatch<typeof store.dispatch>()

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
  );
}

export default MyGoal;
